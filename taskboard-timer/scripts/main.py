from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import logging
from logging.handlers import RotatingFileHandler

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"], "allow_headers": ["Content-Type", "Authorization"]}})


# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///taskboard.db'  # Defines the database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disables modification notifications

db = SQLAlchemy(app)  # Initializes the database connection

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
        projects = Project.query.all()
        projects_data = [{'id': project.id, 'name': project.name} for project in projects]
        return jsonify(projects_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/add_project', methods=['POST'])
def add_project():
    data = request.get_json()
    project_name = data['name']

    new_project = Project(name=project_name)

    db.session.add(new_project)
    db.session.commit()

    message = f'New Project ({project_name}) added successfully!'

    return jsonify({"message": message}), 201

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)

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