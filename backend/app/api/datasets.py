from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from ..db import get_db
from ..dependencies import get_current_user
from ..models import Dataset
import pandas as pd
from io import BytesIO
import json
from sqlalchemy import insert

router = APIRouter()

@router.post("/upload")
async def upload_dataset(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user),
):
    contents = await file.read()
    try:
        df = pd.read_csv(BytesIO(contents))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid CSV file")

    columns = list(df.columns)
    row_count = len(df)
    sample = df.head(5).to_dict(orient="records")

    # Simpan metadata ke DB
    stmt = insert(Dataset).values(
        filename=file.filename,
        owner_id=current_user.id,
        row_count=row_count,
        columns=json.dumps(columns),
    )
    await db.execute(stmt)
    await db.commit()

    return {
        "filename": file.filename,
        "columns": columns,
        "row_count": row_count,
        "sample": sample,
    }
