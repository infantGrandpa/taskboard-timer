from scripts.routes.database import db
from sqlalchemy.inspection import inspect
import enum
from sqlalchemy import Enum

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=True)
    client = db.Column(db.String(120), nullable=True)
    start_date = db.Column(db.Date, nullable=True)
    end_date = db.Column(db.Date, nullable=True)
    tasks = db.relationship('Task', backref='project',
                            lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
    
class Sprint(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(
        'project.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    start_date = db.Column(db.Date, nullable=True)
    end_date = db.Column(db.Date, nullable=True)
    total_hours = db.Column(db.Float, nullable=False)
    completed_hours = db.Column(db.Float, default=0.0, nullable=False)

    tasks = db.relationship("SprintTask", back_populates="sprint", cascade="all, delete, delete-orphan")

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}
    

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey(
        'project.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    estimated_hours = db.Column(db.Float, nullable=False)
    hours_worked = db.Column(db.Float, default=0.0, nullable=False)

    sprints = db.relationship("SprintTask", back_populates="task", cascade="all, delete, delete-orphan")

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}


class Priority(enum.Enum):
    WONT_HAVE = 0
    COULD_HAVE = 1
    SHOULD_HAVE = 2
    MUST_HAVE = 3

class Status(enum.Enum):
    TODO = 0
    IN_PROGRESS = 1
    REVIEW = 2
    COMPLETE = 3


class SprintTask(db.Model):
    __tablename__ = 'sprint_task'
    sprint_id = db.Column(db.Integer, db.ForeignKey('sprint.id'), primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), primary_key=True)
    priority = db.Column(Enum(Priority))
    status = db.Column(Enum(Status))

    task = db.relationship("Task", back_populates="sprints")
    sprint = db.relationship("Sprint", back_populates="tasks")