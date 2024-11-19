from sqlalchemy.orm import Session
from . import models
from .schemas import UserCreate

def create_user(db: Session, user: UserCreate):
    db_user = models.User(username=user.username, password=user.password, gender=user.gender)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

