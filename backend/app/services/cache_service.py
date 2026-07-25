import json
from typing import Any, Optional

class CacheService:
    """
    In-memory and Redis Caching Service for high performance OSINT API responses.
    Reduces latency on expensive network resolution and graph queries.
    """

    def __init__(self):
        self._memory_cache = {}

    def get(self, key: str) -> Optional[Any]:
        return self._memory_cache.get(key)

    def set(self, key: str, value: Any, ttl: int = 300) -> None:
        self._memory_cache[key] = value

    def delete(self, key: str) -> None:
        if key in self._memory_cache:
            del self._memory_cache[key]

cache_service = CacheService()
