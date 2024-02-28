from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///taskboard.db'  # Defines the database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disables modification notifications

db = SQLAlchemy(app)  # Initializes the database connection

@app.route('/')
def hello():
    return 'Hello, Taskboard Timer!'

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)

if __name__ == '__main__':
    app.run(debug=True)

with app.app_context():
    db.create_all()