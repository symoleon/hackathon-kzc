from datetime import datetime

from pydantic import BaseModel

from Sentiment import Sentiment

import chat_service


class Comment(BaseModel):
    user_id: str
    content: str


class AnalyzedComment(Comment):
    date: datetime
    sentiment: Sentiment
    tag: list[str]


def analyze_comment(comment: Comment) -> AnalyzedComment:

    analyzed_comment = AnalyzedComment.model_validate({
        **comment.model_dump(),
        "date": datetime.today(),
        "sentiment": chat_service.chat_request_sentiment(comment.content),
        "tags": chat_service.chat_request_tag(comment.content)
    })

    return analyzed_comment
