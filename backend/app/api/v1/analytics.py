from fastapi import APIRouter
from typing import Dict, Any, List

router = APIRouter(prefix="/analytics", tags=["Analytics & Risk Benchmarking"])

@router.get("/summary", response_model=Dict[str, Any])
async def get_analytics_summary():
    return {
        "risk_trends": [
            {"month": "Jan 2026", "avg_score": 35.2},
            {"month": "Feb 2026", "avg_score": 34.0},
            {"month": "Mar 2026", "avg_score": 33.1},
            {"month": "Apr 2026", "avg_score": 31.8},
            {"month": "May 2026", "avg_score": 30.5},
            {"month": "Jun 2026", "avg_score": 28.5}
        ],
        "industry_benchmarks": [
            {"industry": "Financial Services", "avg_risk": 26.5, "percentile_75": 38.0},
            {"industry": "Defense & Cyber SaaS", "avg_risk": 64.2, "percentile_75": 78.5},
            {"industry": "Healthcare & Biotech", "avg_risk": 42.0, "percentile_75": 55.0},
            {"industry": "E-Commerce & Retail", "avg_risk": 38.4, "percentile_75": 49.0}
        ],
        "tech_distribution": [
            {"name": "Nginx", "count": 14},
            {"name": "React", "count": 12},
            {"name": "Cloudflare WAF", "count": 15},
            {"name": "WordPress", "count": 5},
            {"name": "Apache", "count": 4}
        ],
        "geographic_distribution": [
            {"country": "United States", "count": 12},
            {"country": "United Kingdom", "count": 4},
            {"country": "Germany", "count": 2}
        ]
    }
