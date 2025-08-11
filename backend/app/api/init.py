from fastapi import APIRouter
from . import auth, datasets

router = APIRouter()
router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(datasets.router, prefix="/datasets", tags=["datasets"])
