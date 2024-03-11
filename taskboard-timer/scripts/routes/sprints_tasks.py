from flask import Blueprint, jsonify, request, current_app
from sqlalchemy.inspection import inspect
from database import db
import enum
from sqlalchemy import Enum

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