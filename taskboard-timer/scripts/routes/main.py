from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import logging
from logging.handlers import RotatingFileHandler
from flask_migrate import Migrate
from project_routes import project_blueprint
from task_routes import task_blueprint
from database import db

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS", "DELETE", "PUT"], "allow_headers": ["Content-Type", "Authorization"]}})

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///taskboard.db'  # Defines the database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disables modification notifications

db.init_app(app) # Initializes the database connection

migrate = Migrate(app, db)

app.register_blueprint(project_blueprint)
app.register_blueprint(task_blueprint)

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