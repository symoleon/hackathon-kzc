from openai import OpenAI
from Sentiment import Sentiment



def chat_request_tag(comment:str):
    openai = OpenAI(api_key="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")
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Proszę podać jedną frazę opisującą komentarz dotyczący restauracji, wykorzystując jeden z poniższych tagów:- Smaczne jedzenie- Ekskluzywne wyposażenie- Źle przygotowane- Przyjemna atmosfera- Nieprofesjonalne obsługa- Innowacyjne menu- Tłoczno i głośno- Drożej niż się spodziewałem - Słabe jedzenie - Tanio i smacznie Jeśli żaden z powyższych tagów nie jest odpowiedni, proszę użyć tagu INNE. "},
            {"role": "user", "content": comment},
        ],
        temperature=0,
    )
    tag = response.choices[0].message.content
    #data = response.id
    #print(tag, data)
    return tag
def chat_request_sentiment(comment:str):
    openai = OpenAI(api_key="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")
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Proszę zanalizować czy komentarz dotyczący restauracji jest pozytywny, negatywny, neutralny, czy jest nieistotny. Jeśli pozytywny wypisz 0  jeżeli negtywny wypisz 1 jeżeli neutralny 2 i jeżeli nieistotny wypisz 3"},
            {"role": "user", "content": comment},
        ],
        temperature=0,
    )
    value = response.choices[0].message.content
    print(value)
    match value:
        case 0:
            return Sentiment.GOOD
        case 1:
            return Sentiment.BAD
        case 2:
            return Sentiment.NEUTRAL
        case 3: 
            return Sentiment.IRRELEVANT
    
    #data = response.id
    

#data = chat_request("lubie placki")
data = chat_request_sentiment("jedzenie było obżydliwe, zdecydowanie z a drogog")
#print (data)