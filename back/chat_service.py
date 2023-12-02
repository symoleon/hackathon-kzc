from openai import OpenAI
from Sentiment import Sentiment
import os
from dotenv import load_dotenv



load_dotenv()

def chat_request_tag(comment:str):
    
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Proszę podać jedną frazę opisującą komentarz dotyczący restauracji, wykorzystując jeden z poniższych tagów: JEDZIENIE - WYPOSAŻENIE - OBSŁUGA - ATMOSFERA - MENU - CENA  Jeśli żaden z powyższych tagów nie jest odpowiedni, proszę użyć tagu NONE. "},
            {"role": "user", "content": comment},
        ],
        temperature=0,
    )
    tag = response.choices[0].message.content
    return tag
        

        
def chat_request_sentiment(comment:str):
    
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Proszę zanalizować czy komentarz dotyczący restauracji jest pozytywny, negatywny, neutralny, czy jest nieistotny, odpowiedź jedną z fraz"},
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
    
def chat_request_analisis(comment:str):
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "do zanalizowanych danych dodaj komentarz dla każdego miesiąca będący podsumowaniem zmian od ostatniego miesiąca , np.  pogorszył się stan jedzenia , na koniec dodaj opis tendencji w formie jednego zdania dla każdego z tagów"},
            {"role": "user", "content": comment},
        ],
        temperature=1,
    )
    value = response.choices[0].message.content
    return value
openai = OpenAI(api_key=os.getenv("OPENAI_KEY"))
