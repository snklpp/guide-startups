from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from models import Domain, Idea
from data import DOMAINS_DATA, IDEAS_DATA

app = FastAPI(title="AI Startup Ideas Explorer API")

# CORS Setup
origins = [
    "http://localhost:5173", # Vite default
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Startup Ideas Explorer API"}

@app.get("/api/domains", response_model=List[Domain])
def get_domains():
    for domain in DOMAINS_DATA:
        domain.ideas = [idea for idea in IDEAS_DATA if idea.domain_id == domain.id]
    return DOMAINS_DATA

@app.get("/api/domains/{domain_id}", response_model=Domain)
def get_domain(domain_id: str):
    for domain in DOMAINS_DATA:
        if domain.id == domain_id:
            return domain
    raise HTTPException(status_code=404, detail="Domain not found")

@app.get("/api/ideas", response_model=List[Idea])
def get_ideas(
    domain_id: Optional[str] = None,
    pain_min: Optional[int] = None,
    weeks_max: Optional[int] = None
):
    results = IDEAS_DATA
    if domain_id:
        results = [i for i in results if i.domain_id == domain_id]
    if pain_min:
        results = [i for i in results if i.pain_severity >= pain_min]
    if weeks_max:
        results = [i for i in results if i.time_to_mvp_weeks <= weeks_max]
    return results

@app.get("/api/ideas/{idea_id}", response_model=Idea)
def get_idea(idea_id: str):
    for idea in IDEAS_DATA:
        if idea.id == idea_id:
            return idea
    raise HTTPException(status_code=404, detail="Idea not found")

# Chat Implementation
from groq import Groq
from duckduckgo_search import DDGS
import os

# Initialize Groq Client
# Use environment variable for security
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
if not GROQ_API_KEY:
    print("WARNING: GROQ_API_KEY environment variable not set!")
client = Groq(api_key=GROQ_API_KEY)

class ChatRequest(BaseModel):
    session_id: str
    message: str
    idea_context: Optional[dict] = None
    search_enabled: bool = True

# Simple in-memory history: {session_id: [messages]}
# This is not scalable for production but works for this demo
CHAT_SESSIONS = {}

# Web Search Function
def perform_web_search(query: str, max_results: int = 4) -> List[dict]:
    """Search the web using DuckDuckGo and return relevant results."""
    try:
        with DDGS() as ddgs:
            results = []
            for r in ddgs.text(query, max_results=max_results):
                results.append({
                    "title": r.get("title", ""),
                    "url": r.get("href", ""),
                    "snippet": r.get("body", "")
                })
            return results
    except Exception as e:
        print(f"Search Error: {e}")
        return []

def should_search_web(message: str) -> bool:
    """Determine if a query should trigger web search."""
    search_keywords = [
        "market", "trend", "competitor", "pricing", "price", "cost", 
        "latest", "current", "recent", "news", "update", "analysis",
        "comparison", "alternative", "similar", "example", "case study",
        "statistics", "data", "research", "study", "report"
    ]
    message_lower = message.lower()
    return any(keyword in message_lower for keyword in search_keywords)

@app.post("/api/chat")
def chat_with_ai(request: ChatRequest):
    session_id = request.session_id
    user_msg = request.message
    
    # Initialize session if not exists
    if session_id not in CHAT_SESSIONS:
        CHAT_SESSIONS[session_id] = [
            {"role": "system", "content": """You are a specialized AI Startup Consultant. You are helpful, concise, and focused on helping the user refine their startup idea. 

Format your responses using markdown for clarity:
- Use **bold** for emphasis on key points
- Use bullet points or numbered lists for multiple items
- Use headings (##) for sections when appropriate
- Keep paragraphs short and scannable
- Use code blocks for technical details if needed

Always answer in the context of the Indian market if applicable. Keep answers punchy and well-structured.

When web search results are provided, integrate them naturally into your response and cite sources where relevant."""}
        ]
        # Add context if provided (only once at start or if updated)
        if request.idea_context:
            context_str = f"Current Idea Context:\\nTitle: {request.idea_context.get('title')}\\nProblem: {request.idea_context.get('problem')}\\nTarget: {request.idea_context.get('target_customer')}\\nTech: {request.idea_context.get('tech_stack')}"
            CHAT_SESSIONS[session_id].append({"role": "system", "content": context_str})

    # Perform web search if enabled and query needs it
    search_results = []
    searched = False
    if request.search_enabled and should_search_web(user_msg):
        search_results = perform_web_search(user_msg)
        searched = True
        
        # Add search results as context if found
        if search_results:
            search_context = "\\n\\n--- Web Search Results ---\\n"
            for i, result in enumerate(search_results, 1):
                search_context += f"\\n[{i}] {result['title']}\\n{result['snippet']}\\nSource: {result['url']}\\n"
            search_context += "\\n--- End of Search Results ---\\n\\n"
            
            # Add search context as a system message (temporary, won't persist)
            temp_messages = CHAT_SESSIONS[session_id].copy()
            temp_messages.append({"role": "system", "content": search_context})
        else:
            temp_messages = CHAT_SESSIONS[session_id].copy()
    else:
        temp_messages = CHAT_SESSIONS[session_id].copy()

    # Add user message
    CHAT_SESSIONS[session_id].append({"role": "user", "content": user_msg})
    temp_messages.append({"role": "user", "content": user_msg})
    
    # Call Groq
    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=temp_messages,
            temperature=0.7,
            max_tokens=800,
        )
        ai_response = completion.choices[0].message.content
        
        # Add AI response to history
        CHAT_SESSIONS[session_id].append({"role": "assistant", "content": ai_response})
        
        return {
            "response": ai_response,
            "sources": search_results if searched else [],
            "searched": searched
        }
    except Exception as e:
        print(f"Groq Error: {e}")
        # Return a fallback or error
        return {
            "response": "I'm having trouble connecting to my brain right now. Please try again.",
            "sources": [],
            "searched": False
        }
