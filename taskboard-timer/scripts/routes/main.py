from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import logging
from logging.handlers import RotatingFileHandler
from flask_migrate import Migrate
from datetime import datetime
from sqlalchemy.inspection import inspect

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS", "DELETE", "PUT"], "allow_headers": ["Content-Type", "Authorization"]}})

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///taskboard.db'  # Defines the database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disables modification notifications

db = SQLAlchemy(app)  # Initializes the database connection

migrate = Migrate(app, db)

@app.route('/')
def print_all_projects():
    try:
        projects = Project.query.all()
        projects_str = '<h1>Hello, Taskboard Timer!</h1>'
        projects_str += '<p>Here are the projects in the database:</p>'
        projects_str += '<table><th>ID</th><th>Project Name<th>'
        for project in projects:
            projects_str += f'<tr><td>{project.id}</td><td>{project.name}</td></tr>'
        projects_str += '</table>'
        return projects_str
    except Exception as e:
        return f'<p>Error querying database: {e}</p>'

@app.route('/api/projects')
def get_projects():
    try:
        project_id = request.args.get('id')  # Get 'id' query parameter, if provided

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


@app.route('/api/add_project', methods=['POST'])
def add_project():
    data = request.get_json()

    start_date_str, _ = data['start_date'].split('T')
    end_date_str, _ = data['end_date'].split('T')

    start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
    end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()

    new_project = Project(name=data['name'], description=data['description'], client=data['client'], start_date=start_date, end_date=end_date)

    db.session.add(new_project)
    db.session.commit()

    message = f'New Project ({new_project.name}) added successfully!'

    return jsonify({"message": message}), 201

@app.route('/api/project/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    project = Project.query.get(project_id)
    if not project:
        return jsonify({"error": "Project not found"}), 404

    # Will need to also delete sprints and tasks tied to this project
    db.session.delete(project)
    db.session.commit()
    return jsonify({"message": "Project deleted successfully"}), 200
    
        

@app.route('/api/project/<int:project_id>', methods=['PUT'])
def edit_project(project_id):
    project = Project.query.get(project_id)
    if not project:
        return jsonify({"error": "Project not found"}), 404

    data = request.get_json()

    if 'start_date' in data:
        start_date_str, _ = data['start_date'].split('T')
        project.start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
    if 'end_date' in data:
        end_date_str, _ = data['end_date'].split('T')
        project.end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()

    # Update other project attributes
    project.name = data.get('name', project.name)  # This keeps the current name if none is provided
    project.description = data.get('description', project.description)
    project.client = data.get('client', project.client)

    db.session.commit()

    message = f'Project ({project.name}) updated successfully!'
    return jsonify({"message": message}), 200

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    client = db.Column(db.String(120), nullable=True)
    start_date = db.Column(db.Date, nullable=True)
    end_date = db.Column(db.Date, nullable=True)
    
    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}

if __name__ == '__main__':
    app.run(debug=False)

with app.app_context():
    db.create_all()

if not app.debug:
    file_handler = RotatingFileHandler('flask_app.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('Flask application startup')