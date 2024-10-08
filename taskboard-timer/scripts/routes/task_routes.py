from flask import Blueprint, jsonify, request
from scripts.routes.database import db
from scripts.models.models import Task

task_blueprint = Blueprint('task', __name__)

@task_blueprint.route('/api/tasks')
def get_tasks():
    try:
        project_id = request.args.get('project_id')
        if project_id:
            tasks = Task.query.filter_by(project_id=project_id)
        else:
            tasks = Task.query.all()

        tasks_data = [task.to_dict() for task in tasks]
        return jsonify(tasks_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@task_blueprint.route('/api/add_task', methods=['POST'])
def add_task():
    data = request.get_json()

    new_task = Task(project_id=data['project_id'], name=data['name'],
                    estimated_hours=data['estimated_hours'], hours_worked=data['hours_worked'])

    db.session.add(new_task)
    db.session.commit()

    message = f'New Task ({new_task.name}) added successfully!'

    return jsonify({"message": message}), 201


@task_blueprint.route('/api/task/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully"}), 200


@task_blueprint.route('/api/task/<int:task_id>', methods=['PUT'])
def edit_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": f'Task {task_id} not found'}), 404

    data = request.get_json()

    # We don't allow editing of project_id right now; I don't forsee any reason to.
    # I don't expect duplicating projects will be added and I think it will just be
    # safer to not allow it for the time being.

    # task.project_id = data.get('project_id', task.project_id)
    task.name = data.get('name', task.name)
    task.estimated_hours = data.get('estimated_hours', task.estimated_hours)
    task.hours_worked = data.get('hours_worked', task.hours_worked)

    db.session.commit()

    message = f'Task ({task.name}) on Project {task.project_id} updated successfully!'
    return jsonify({"message": message}), 200
