from fastapi import APIRouter, UploadFile, File, Depends
from fastapi.responses import JSONResponse
from ..auth import verify_admin
import os, uuid, shutil

router = APIRouter(prefix="/uploads", tags=["uploads"])

UPLOAD_DIR = "/app/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED = {"image/jpeg", "image/png", "image/webp"}


@router.post("/", dependencies=[Depends(verify_admin)])
async def upload_image(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED:
        return JSONResponse(status_code=400, content={"detail": "Doar JPG, PNG, WEBP."})

    ext = file.filename.rsplit(".", 1)[-1].lower()
    filename = f"{uuid.uuid4().hex}.{ext}"
    path = os.path.join(UPLOAD_DIR, filename)

    with open(path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    return {"url": f"/uploads/{filename}"}
