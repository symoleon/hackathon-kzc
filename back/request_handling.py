from fastapi import FastAPI
from Comments import Comment, AnalyzedComment, analyze_comment
import json
import sqlite3

con = sqlite3.connect("comments.db")
cur = con.cursor()
# cur.execute("CREATE TABLE comment(username, content, post_date, sentiment, tags)")

app = FastAPI()


# def send_comment_to_db(comment : AnalyzedComment):
#     with open("comments.json", "a") as file:
#         file.write(comment.model_dump_json())

def send_comment_to_db(comment: AnalyzedComment):
    cur.execute(
        f"insert into comment values({comment.user_id}, {comment.content}, {comment.date}, {comment.sentiment}, {comment.tag})")
    con.commit()


@app.get("/customer/comment")
def see_comments():
    res = cur.execute("select username, content, post_date from comment")
    return json.dumps(res.fetchall())

@app.post("/customer/comment")
def comment(comment: Comment):
    analyzed_comment = analyze_comment(comment)
    send_comment_to_db(analyzed_comment)


# @app.get("/admin/analyze")
# def analyze():
