from openai import OpenAI
from Sentiment import Sentiment
import os
from dotenv import load_dotenv



load_dotenv()

def chat_request_tag(comment:str):
    openai = OpenAI(api_key=os.getenv("OPENAI_KEY"))
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Proszę Wypisać które tagi pasują do podanego komentarza: JEDZIENIE - WYPOSAŻENIE - OBSŁUGA - ATMOSFERA - MENU - CENA. tagi wypisz po przecinku bez spacji"},
            {"role": "user", "content": comment},
        ],
        temperature=0,
    )
    tag_tab = []
    tag = response.choices[0].message.content
    match tag:
        case tag.find("JEDZIENIE"):
            tag_tab.append("JEDZENIE")
        case tag.find("WYPOSAŻENIE"):
            tag_tab.append("WYPOSAŻENIE")
        case tag.find("OBSŁUGA"):
            tag_tab.append("OBSŁUGA")
        case tag.find("ATMOSFERA"):
            tag_tab.append("ATMOSFERA")
        case tag.find("MENU"):
            tag_tab.append("MENU")
        case tag.find("CENA"):
            tag_tab.append("CENA")
        
    return tag_tab
        

        
def chat_request_sentiment(comment:str):
    openai = OpenAI(api_key=os.getenv("OPENAI_KEY"))
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
    
def chat_request_analysis(comment:str):
    openai = OpenAI(api_key=os.getenv("OPENAI_KEY"))
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


