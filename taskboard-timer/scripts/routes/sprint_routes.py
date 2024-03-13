from flask import Blueprint, jsonify, request
from scripts.routes.database import db
from scripts.utilities.date_handler import strip_time_from_datetime
from scripts.models.models import Sprint, Task, SprintTask

sprint_blueprint = Blueprint('sprint', __name__)

@sprint_blueprint.route('/api/sprints')
def get_sprints():
    try:
        project_id = request.args.get('project_id')
        if (project_id):
            sprints = Sprint.query.filter_by(project_id=project_id)
        else:
            sprints = Sprint.query.all()

        sprints_data = [sprint.to_dict() for sprint in sprints]
        return jsonify(sprints_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


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
    return jsonify({"message": message, "id": new_sprint.id}), 201

@sprint_blueprint.route('/api/add_tasks_to_sprint', methods=['POST'])
def add_tasks_to_sprint():
    data = request.get_json()
    sprint_id = data.get('sprint_id')
    tasks_info = data.get('tasks_info')

    task_list = []

    for this_task_info in tasks_info:
        task_id = this_task_info['task_id']
        priority = this_task_info['priority']
        status = this_task_info['status']

        # Check if sprint and task exist
        task = Task.query.get(task_id)
        if not task:
            return jsonify({'message': f'Task {task_id} does not exist.'}), 400

        sprint = Sprint.query.get(sprint_id)
        if not sprint:
            return jsonify({'message': f'Sprint {sprint_id} does not exist.'}), 400
        
        sprint_task = SprintTask(sprint_id=sprint_id, task_id=task_id, priority=priority, status=status)
        db.session.add(sprint_task)

        task_list.append(task_id)

    db.session.commit()
    return jsonify({'message': f'Tasks ({task_list}) have been added to Sprint {sprint_id}.'}), 200