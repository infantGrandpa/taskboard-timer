from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///taskboard.db'  # Defines the database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disables modification notifications

db = SQLAlchemy(app)  # Initializes the database connection

@app.route('/')
def hello():
    return 'Hello, Taskboard Timer!'

@app.route('/add_project', methods=['POST'])
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
    app.run(debug=True)

with app.app_context():
    db.create_all()