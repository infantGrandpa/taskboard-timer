from flask import Blueprint, jsonify, request
from scripts.routes.database import db
from scripts.utilities.date_handler import strip_time_from_datetime
from scripts.models.models import Sprint, Task, SprintTask, Priority, Status, get_priority_from_string, get_status_from_string
from scripts.utilities.response_middleware import RequestStatus

sprint_blueprint = Blueprint('sprint', __name__)

@sprint_blueprint.route('/api/sprints')
def get_sprints():
    try:
        sprint_query = Sprint.query

        #Apply all filters
        project_id = request.args.get('project_id')
        if (project_id):
            sprint_query = sprint_query.filter_by(project_id=project_id)

        sprint_id = request.args.get('id')
        if (sprint_id):
            sprint_query = sprint_query.filter_by(id=sprint_id)
        
        #Fetch data
        sprints = sprint_query.all()

        sprints_data = [sprint.to_dict() for sprint in sprints]
        return jsonify(sprints_data)
    except Exception as e:
        return jsonify({"status": RequestStatus.ERROR, "message": str(e)}), 500


@sprint_blueprint.route('/api/add_sprint', methods=['POST'])
def add_sprint():
    data = request.get_json()

    start_date = strip_time_from_datetime(data['start_date'])
    end_date = strip_time_from_datetime(data['end_date'])

    new_sprint = Sprint(project_id=data['project_id'], name=data['name'], total_hours=data['total_hours'],
                        completed_hours=data['completed_hours'], start_date=start_date, end_date=end_date)

    db.session.add(new_sprint)
    db.session.commit()

    message = f'New Sprint ({new_sprint.name}) added successfully!'
    return jsonify({"status": RequestStatus.SUCCESS, "message": message, "id": new_sprint.id}), 201

@sprint_blueprint.route('/api/sprint/<int:sprint_id>', methods=['DELETE'])
def delete_sprint(sprint_id):
    sprint = Sprint.query.get(sprint_id)
    if not sprint:
        return jsonify({"status": RequestStatus.ERROR, "message": f'Sprint {sprint_id} not found'}), 404
    
    db.session.delete(sprint)
    db.session.commit()
    return jsonify({"status": RequestStatus.SUCCESS, "message": f'Sprint {sprint_id} deleted successfully!'}), 200


@sprint_blueprint.route('/api/sprint/<int:sprint_id>', methods=['PUT'])
def edit_sprint(sprint_id):
    sprint = Sprint.query.get(sprint_id)
    if not sprint:
        return jsonify({"status": RequestStatus.ERROR, "message": f'Sprint {sprint_id} not found'}), 404
    
    data = request.get_json()

    sprint.name = data.get('name', sprint.name)
    sprint.total_hours = data.get('total_hours', sprint.total_hours)
    sprint.completed_hours = data.get('completed_hours', sprint.completed_hours)

    if 'start_date' in data and data['start_date']:
        sprint.start_date = strip_time_from_datetime(data['start_date'])
    if 'end_date' in data and data['end_date']:
        sprint.end_date = strip_time_from_datetime(data['end_date'])

    db.session.commit()

    message = f'Sprint {sprint.name} ({sprint.id}) on Project {sprint.project_id} updated successfully!'
    return jsonify({"status": RequestStatus.SUCCESS, "message": message}), 200




@sprint_blueprint.route('/api/add_tasks_to_sprint', methods=['POST'])
def add_tasks_to_sprint():
    data = request.get_json()
    sprint_id = data.get('sprint_id')
    tasks_info = data.get('tasks_info')

    task_list = []

    if not tasks_info:
        return jsonify({"status": RequestStatus.ERROR, "message": "Provided task info array is empty.", 'data': data}), 400


    for this_task_info in tasks_info:
        task_id = this_task_info['task_id']
        priority_value = this_task_info.get('priority', 0)
        status_value = this_task_info.get('status', 0)

        priority = Priority(priority_value)
        status = Status(status_value)

        # Check if sprint and task exist
        task = Task.query.get(task_id)
        if not task:
            return jsonify({'status': RequestStatus.ERROR,
                            'message': f'Task {task_id} does not exist.',
                            'data': None}), 400

        sprint = Sprint.query.get(sprint_id)
        if not sprint:
            return jsonify({'status': RequestStatus.ERROR, 'message': f'Sprint {sprint_id} does not exist.'}), 400
        
        sprint_task = SprintTask(sprint_id=sprint_id, task_id=task_id, priority=priority, status=status)
        db.session.add(sprint_task)

        task_list.append(task_id)

    db.session.commit()
    return jsonify({'status': RequestStatus.SUCCESS, 'message': f'Tasks ({task_list}) have been added to Sprint {sprint_id}.'}), 200


@sprint_blueprint.route('/api/tasks_in_sprint')
def get_tasks_in_sprint():
    try: 
        # Extract sprint_id from request args
        sprint_id = request.args.get('sprint_id')
        if not sprint_id:
            return jsonify({"status": RequestStatus.ERROR, "message": "sprint_id parameter is required."}), 400

        # Fetch sprint to ensure it exists
        sprint = Sprint.query.get(sprint_id)
        if not sprint:
            return jsonify({"status": RequestStatus.ERROR, "message": f'Sprint {sprint_id} does not exist.'}), 404

        # Query SprintTask for tasks in this sprint, join with Task for details
        tasks_in_sprint = SprintTask.query.filter_by(sprint_id=sprint_id).join(Task, SprintTask.task_id == Task.id).all()

        if not tasks_in_sprint:
            return jsonify({"status": RequestStatus.WARNING, "message": f'No tasks assigned to sprint {sprint_id}.'}), 200

        # Convert tasks to a dict format for JSON response
        sprint_task_data = [{
            'sprint_id': this_sprint_task.sprint_id,
            'task_id': this_sprint_task.task_id, 
            'priority': this_sprint_task.priority.name, 
            'status': this_sprint_task.status.name, 
            'task_details': this_sprint_task.task.to_dict()} 
            for this_sprint_task in tasks_in_sprint]

        return jsonify(sprint_task_data)
    except Exception as e:
        return jsonify({"status": RequestStatus.ERROR, "message": str(e)}), 500

@sprint_blueprint.route('/api/edit_sprint_task', methods=['POST'])
def edit_tasks_in_sprint():
    data = request.get_json()
    sprint_id = data.get('sprint_id')
    task_id = data.get('task_id')
    new_priority_value = data.get('priority')
    new_status_value = data.get('status')

    if new_priority_value is None:
        return jsonify({"status": RequestStatus.ERROR, "message": "Priority not provided."}), 400
    
    if new_status_value is None:
        return jsonify({"status": RequestStatus.ERROR, "message": "Status not provided."}), 400

    # Get Priority
    try:
        new_priority = get_priority_from_string(new_priority_value)
    except ValueError:
        return jsonify({'status': RequestStatus.ERROR, 'message': f'Provided priority {new_priority_value} is invalid.'}), 400
    
    # Get Status
    try:
        new_status = get_status_from_string(new_status_value)
    except ValueError:
        return jsonify({'status': RequestStatus.ERROR, 'message': f'Provided status {new_status_value} is invalid.'}), 400
    
    # Fetch the SprintTask to update
    sprint_task = SprintTask.query.filter_by(sprint_id=sprint_id, task_id=task_id).first()

    if sprint_task:
        sprint_task.priority = new_priority
        sprint_task.status = new_status
        db.session.commit()
        return jsonify({'status': RequestStatus.SUCCESS, 'message': f'SprintTask updated successfully.'}), 200
    else:
        return jsonify({'status': RequestStatus.ERROR, 'message': 'SprintTask not found.'}), 404