from pydantic import BaseModel
from typing import List, Optional

class Financials(BaseModel):
    revenue_month_1: Optional[float] = None
    revenue_month_6: Optional[float] = None
    revenue_month_12: Optional[float] = None
    burn_rate: Optional[float] = None
    break_even_month: Optional[int] = None

class Idea(BaseModel):
    id: str
    title: str
    problem: str
    target_customer: str
    ai_use_case: str
    mvp_scope: List[str]
    tech_stack: List[str]
    moat: str
    pricing_model: str
    go_to_market: List[str]
    risks: List[str]
    founder_advantage: str
    why_ai: Optional[str] = None
    domain_id: str
    # Metadata for filtering/sorting
    pain_severity: int # 1-10
    time_to_mvp_weeks: int
    market_size_score: int # 1-10
    complexity_score: int # 1-10

class Domain(BaseModel):
    id: str
    name: str
    description: str
    idea_count: int
    ideas: List[Idea] = []
