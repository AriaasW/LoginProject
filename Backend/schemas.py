from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str
    gender: str

class LoginRequest(BaseModel):
    username: str
    password: str

class DeleteUser(BaseModel):
    username: str