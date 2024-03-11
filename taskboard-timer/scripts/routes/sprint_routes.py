from flask import Blueprint, jsonify, request, current_app
from sqlalchemy.inspection import inspect
from database import db
from date_handler import strip_time_from_datetime

sprint_blueprint = Blueprint('sprint', __name__)


class Sprint(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(
        'project.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    start_date = db.Column(db.Date, nullable=True)
    end_date = db.Column(db.Date, nullable=True)
    total_hours = db.Column(db.Float, nullable=False)
    completed_hours = db.Column(db.Float, default=0.0, nullable=False)

    tasks = db.relationship("SprintTask", back_populates="sprint")

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}


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
    return jsonify({"message": message}), 201
