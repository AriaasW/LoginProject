from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session


from .database import engine, Base, SessionLocal, get_db
from .models import User
from . import crud, schemas



app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)


@app.post("/users/")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)


@app.post("/login/")
def login_check(request: schemas.LoginRequest, db: Session = Depends(get_db)):
    searched = db.query(User).filter(User.username == request.username).first()

    if searched and searched.password == request.password:
        return {"message": "Login Successful"}
    else:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
@app.post("/delete/")
def delete_user(request: schemas.DeleteUser, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == request.username).first()

    if user and user.username == request.username:
        db.delete(user)
        db.commit()

    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Username not found in database"
        )