from fastapi import Header, HTTPException
import os

ADMIN_SECRET = os.getenv("ADMIN_SECRET", "skyflow-admin-2026")


def verify_admin(x_admin_secret: str = Header(...)):
    if x_admin_secret != ADMIN_SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")
