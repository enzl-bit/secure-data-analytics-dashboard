from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert
from ..db import get_db
from ..models import User
from ..core_security import get_password_hash, verify_password, create_access_token

router = APIRouter()

class RegisterIn(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"

@router.post("/register")
async def register(payload: RegisterIn, db: AsyncSession = Depends(get_db)):
    q = select(User).where(User.email == payload.email)
    res = await db.execute(q)
    user = res.scalars().first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = get_password_hash(payload.password)
    stmt = insert(User).values(username=payload.username, email=payload.email, hashed_password=hashed)
    await db.execute(stmt)
    await db.commit()
    return {"msg": "User registered"}

@router.post("/login", response_model=TokenOut)
async def login(payload: LoginIn, db: AsyncSession = Depends(get_db)):
    q = select(User).where(User.email == payload.email)
    res = await db.execute(q)
    user = res.scalars().first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(subject=user.id)
    return {"access_token": token}
