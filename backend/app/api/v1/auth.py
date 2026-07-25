from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.schemas.schemas import UserRegister, UserLogin, TokenResponse, UserProfile
from app.core.security import create_access_token, create_refresh_token, get_password_hash, verify_password, verify_access_token

router = APIRouter(prefix="/auth", tags=["Authentication & Identity"])

class SSOLoginRequest(BaseModel):
    provider: str  # azure_ad, okta, google_workspace, saml2
    id_token: Optional[str] = None
    redirect_uri: Optional[str] = "http://localhost:5173/auth/callback"

DEMO_USERS = {
    "analyst@corplens.ai": {
        "id": "usr-001",
        "email": "analyst@corplens.ai",
        "hashed_password": get_password_hash("Password123!"),
        "full_name": "Sarah Jenkins",
        "role": "Analyst",
        "tenant_id": "tenant-enterprise-001",
        "organization_name": "CorpLens Security Inc."
    }
}

@router.post("/register", response_model=TokenResponse)
async def register_user(payload: UserRegister):
    if payload.email in DEMO_USERS:
        raise HTTPException(status_code=400, detail="Email is already registered")
    
    hashed_pwd = get_password_hash(payload.password)
    user_id = f"usr-{len(DEMO_USERS) + 1:03d}"
    tenant_id = "tenant-enterprise-001"
    
    user_obj = {
        "id": user_id,
        "email": payload.email,
        "hashed_password": hashed_pwd,
        "full_name": payload.full_name,
        "role": "Analyst",
        "tenant_id": tenant_id,
        "organization_name": payload.organization_name
    }
    DEMO_USERS[payload.email] = user_obj

    token = create_access_token(subject=user_id, tenant_id=tenant_id, role="Analyst")
    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": user_id,
        "tenant_id": tenant_id,
        "role": "Analyst",
        "full_name": payload.full_name
    }

@router.post("/login", response_model=TokenResponse)
async def login_user(payload: UserLogin):
    user = DEMO_USERS.get(payload.email)
    if not user or not verify_password(payload.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password credentials")
    
    token = create_access_token(subject=user["id"], tenant_id=user["tenant_id"], role=user["role"])
    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": user["id"],
        "tenant_id": user["tenant_id"],
        "role": user["role"],
        "full_name": user["full_name"]
    }

@router.post("/sso/saml")
async def saml_sso_initiate(payload: SSOLoginRequest):
    """Initiate SAML 2.0 / OIDC Enterprise Single Sign-On flow."""
    return {
        "status": "REDIRECT_TO_IDP",
        "provider": payload.provider,
        "idp_url": f"https://sso.corplens.ai/idp/saml2/sso?tenant=tenant-enterprise-001&provider={payload.provider}",
        "session_state": "saml_state_nonce_8a91f"
    }

@router.post("/refresh")
async def refresh_auth_token(refresh_token: str):
    """Issue a new access token using a valid 7-day refresh token."""
    payload = verify_access_token(refresh_token)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")
    
    new_access_token = create_access_token(
        subject=payload["sub"],
        tenant_id=payload["tenant_id"],
        role="Analyst"
    )
    return {"access_token": new_access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserProfile)
async def get_current_user_profile():
    user = DEMO_USERS["analyst@corplens.ai"]
    return {
        "id": user["id"],
        "email": user["email"],
        "full_name": user["full_name"],
        "role": user["role"],
        "tenant_id": user["tenant_id"],
        "organization_name": user["organization_name"]
    }
