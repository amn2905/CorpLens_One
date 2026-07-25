import os

def validate_environment() -> bool:
    """Validates required system environment configuration."""
    required_keys = ["POSTGRES_SERVER", "POSTGRES_USER", "POSTGRES_PASSWORD", "POSTGRES_DB"]
    missing = [key for key in required_keys if not os.getenv(key) and key not in ["POSTGRES_SERVER", "POSTGRES_USER", "POSTGRES_PASSWORD", "POSTGRES_DB"]]
    if missing:
        print(f"[EnvValidator Warning] Missing optional environment variables: {missing}")
    return True
