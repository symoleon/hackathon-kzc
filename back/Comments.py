from datetime import datetime

from pydantic import BaseModel

from Sentiment import Sentiment


class Comment(BaseModel):
    user_id: str
    content: str
    product: str


class AnalyzedComment(Comment):
    date: datetime
    sentiment: Sentiment
    tags: []
