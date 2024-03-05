from flask import Blueprint
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
    

@task_blueprint.route('/')
def print_all_tasks():
    try:
        tasks = Task.query.all()
        tasks_str = '<p>Here are the tasks in the database:</p>'
        tasks_str += '<table><th>ID</th><th>Task Name<th>'
        for task in tasks:
            tasks_str += f'<tr><td>{task.id}</td><td>{task.name}</td></tr>'
        tasks_str += '</table>'
        return tasks_str
    except Exception as e:
        return f'<p>Error querying database: {e}</p>'