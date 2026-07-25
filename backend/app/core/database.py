import os
from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# Construct PostgreSQL Database URL
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_SERVER}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
)

# Engine setup with connection pooling
engine = create_engine(
    DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_recycle=3600,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db() -> Generator:
    """FastAPI Dependency for database session management."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db() -> None:
    """Initialize database tables if they do not exist and trigger seed data insertion."""
    try:
        Base.metadata.create_all(bind=engine)
        # Import and run database seed helper
        from app.db.seed import seed_initial_data
        seed_initial_data()
    except Exception as e:
        print(f"[Database Init Warning] Could not connect to PostgreSQL: {e}")
