from fastapi import FastAPI
from Comments import Comment, AnalyzedComment, analyze_comment
import json
import sqlite3
from chat_service import chat_request_analysis
from fastapi.middleware.cors import CORSMiddleware

con = sqlite3.connect("comments.db")
cur = con.cursor()
# cur.execute("CREATE TABLE comment(username, content, post_date, sentiment, tags)")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# def send_comment_to_db(comment : AnalyzedComment):
#     with open("comments.json", "a") as file:
#         file.write(comment.model_dump_json())

def send_comment_to_db(comment: AnalyzedComment):
    con = sqlite3.connect("comments.db")
    cur = con.cursor()
    cur.execute(
        f"insert into comment(username, content, post_date, sentiment, tags) values (?, ?, ?, ?, ?)", (comment.user_id, comment.content, comment.date, comment.sentiment, str(comment.tags)))
    con.commit()
    con.close()


@app.post("/customer/comment")
def comment(comment: Comment):
    analyzed_comment = analyze_comment(comment)
    send_comment_to_db(analyzed_comment)

@app.get("/customer/comment")
def see_comments():
    con = sqlite3.connect("comments.db")
    cur = con.cursor()
    res = cur.execute("select username, content, post_date from comment")
    comments = res.fetchall()
    con.close()
    return comments


@app.get("/admin/comment")
def see_comments():
    con = sqlite3.connect("comments.db")
    cur = con.cursor()
    res = cur.execute("select * from comment")
    comments = res.fetchall()
    con.close()
    return comments

@app.get("/admin/analyze")
def analyze():
    con = sqlite3.connect("comments.db")
    cur = con.cursor()
    res = cur.execute("select username, content, post_date, sentiment, tags from comment order by sentiment")
    comments = res.fetchall()
    con.close()
    return chat_request_analysis(json.dumps(comments))