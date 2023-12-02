from openai import OpenAI
from Sentiment import Sentiment
import os
from dotenv import load_dotenv
from Tag import Tag


load_dotenv()

def chat_request_tag(comment:str):
    
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Proszę podać jedną frazę opisującą komentarz dotyczący restauracji, wykorzystując jeden z poniższych tagów: JEDZIENIE - WYPOSAŻENIE - OBSŁUGA - ATMOSFERA - MENU - CENA  Jeśli żaden z powyższych tagów nie jest odpowiedni, proszę użyć tagu INNE. "},
            {"role": "user", "content": comment},
        ],
        temperature=0,
    )
    tag = response.choices[0].message.content
    match tag:
        case "JEDZENIE":
            return Tag.FOOD
        case "WYPOSAŻENIE":
            return Tag.INTERIOR
        case "OBSŁUGA":
            return Tag.SERVISE
        case "ATMOSFERA":
            return Tag.ATMOSPHERE
        case "MENU":
            return Tag.MENU
        case "CENA":
            return Tag.COST
        

        
def chat_request_sentiment(comment:str):
    
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Proszę zanalizować czy komentarz dotyczący restauracji jest pozytywny, negatywny, neutralny, czy jest nieistotny"},
            {"role": "user", "content": comment},
        ],
        temperature=0,
    )
    value = response.choices[0].message.content
    print(value)
    match value:
        case "pozytywny":
            return Sentiment.GOOD
        case "negatywny":
            return Sentiment.BAD
        case "neutralny":
            return Sentiment.NEUTRAL
        case "nieistotny": 
            return Sentiment.IRRELEVANT
    
    #data = response.id

openai = OpenAI(api_key=os.getenv("OPENAI_KEY"))
#data = chat_request("lubie placki")
data = chat_request_sentiment("jedzenie było obżydliwe, zdecydowanie z a drogog")
#print (data)