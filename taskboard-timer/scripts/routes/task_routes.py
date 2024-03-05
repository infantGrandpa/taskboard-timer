from flask import Blueprint, jsonify, request
from sqlalchemy.inspection import inspect
from database import db

task_blueprint = Blueprint('task', __name__)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    estimated_hours = db.Column(db.Float, nullable=False)
    hours_worked = db.Column(db.Float, default=0.0, nullable=False)
    
    
    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
    
    
@task_blueprint.route('/api/add_task', methods=['POST'])
def add_task():
    data = request.get_json()

    new_task = Task(project_id=data['project_id'], name=data['name'], estimated_hours = data['estimated_hours'], hours_worked = data['hours_worked'])

    db.session.add(new_task)
    db.session.commit()

    message = f'New Project ({new_task.name}) added successfully!'

    return jsonify({"message": message}), 201