from flask import Blueprint, jsonify, request
from scripts.routes.database import db
from scripts.utilities.date_handler import strip_time_from_datetime
from scripts.models.models import Project

project_blueprint = Blueprint('project', __name__)

@project_blueprint.route('/api/projects')
def get_projects():
    try:
        # Get 'id' query parameter, if provided
        project_id = request.args.get('id')

        if project_id:
            # Assuming 'id' is the primary key, adjust as needed
            project = Project.query.filter_by(id=project_id).first()
            if project:
                return jsonify(project.to_dict())
            else:
                return jsonify({"error": "Project not found"}), 404
        else:
            projects = Project.query.all()
            projects_data = [project.to_dict() for project in projects]
            return jsonify(projects_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@project_blueprint.route('/api/add_project', methods=['POST'])
def add_project():
    data = request.get_json()

    start_date = strip_time_from_datetime(data['start_date'])
    end_date = strip_time_from_datetime(data['end_date'])

    new_project = Project(name=data['name'], description=data['description'],
                          client=data['client'], start_date=start_date, end_date=end_date)

    db.session.add(new_project)
    db.session.commit()

    message = f'New Project ({new_project.name}) added successfully!'

    return jsonify({"message": message, "id": new_project.id}), 201


@project_blueprint.route('/api/project/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    project = Project.query.get(project_id)
    if not project:
        return jsonify({"error": "Project not found"}), 404

    # Will need to also delete sprints and tasks tied to this project
    db.session.delete(project)
    db.session.commit()
    return jsonify({"message": "Project deleted successfully"}), 200


@project_blueprint.route('/api/project/<int:project_id>', methods=['PUT'])
def edit_project(project_id):
    project = Project.query.get(project_id)
    if not project:
        return jsonify({"error": "Project not found"}), 404

    data = request.get_json()

    if 'start_date' in data:
        project.start_date = strip_time_from_datetime(data['start_date'])
    if 'end_date' in data:
        project.end_date = strip_time_from_datetime(data['end_date'])

    # Update other project attributes
    # This keeps the current name if none is provided
    project.name = data.get('name', project.name)
    project.description = data.get('description', project.description)
    project.client = data.get('client', project.client)

    db.session.commit()

    message = f'Project ({project.name}) updated successfully!'
    return jsonify({"message": message}), 200
