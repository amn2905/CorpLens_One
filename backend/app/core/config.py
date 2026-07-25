import os
from typing import List

try:
    from pydantic_settings import BaseSettings
    class Settings(BaseSettings):
        PROJECT_NAME: str = "CorpLens AI"
        VERSION: str = "1.0.0"
        API_V1_STR: str = "/api/v1"
        SECRET_KEY: str = "corplens-super-secret-jwt-key-production-change-me"
        ALGORITHM: str = "HS256"
        ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
        DEFAULT_TENANT_ID: str = "tenant-enterprise-001"
        POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
        POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
        POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "postgrespassword")
        POSTGRES_DB: str = os.getenv("POSTGRES_DB", "corplens_db")
        POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
        BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"]

        class Config:
            case_sensitive = True

    settings = Settings()
except ImportError:
    class Settings:
        PROJECT_NAME: str = os.getenv("PROJECT_NAME", "CorpLens AI")
        VERSION: str = os.getenv("VERSION", "1.0.0")
        API_V1_STR: str = os.getenv("API_V1_STR", "/api/v1")
        SECRET_KEY: str = os.getenv("SECRET_KEY", "corplens-super-secret-jwt-key-production-change-me")
        ALGORITHM: str = "HS256"
        ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
        DEFAULT_TENANT_ID: str = "tenant-enterprise-001"
        POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
        POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
        POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "postgrespassword")
        POSTGRES_DB: str = os.getenv("POSTGRES_DB", "corplens_db")
        POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
        BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"]

    settings = Settings()
