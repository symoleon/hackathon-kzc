from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from Sentiment import Sentiment

# import chat_service

app = FastAPI()

class Comment(BaseModel):
    user_id: str
    content: str

class Analized_comment:
    user_id: str
    content: str
    date: datetime
    sentiment: Sentiment
    tags: []

    def __init__(self):
        self.date = datetime.today()


