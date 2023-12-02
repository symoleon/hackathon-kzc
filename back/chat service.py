from openai import OpenAI
from Sentiment import Sentiment


openai = OpenAI(api_key="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")
def chat_request(commentdata):
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Proszę podać jedną frazę opisującą komentarz dotyczący restauracji, wykorzystując jeden z poniższych tagów:- Smaczne jedzenie- Ekskluzywne wyposażenie- Źle przygotowane- Przyjemna atmosfera- Nieprofesjonalne obsługa- Innowacyjne menu- Tłoczno i głośno- Drożej niż się spodziewałem - Słabe jedzenie - Tanio i smacznie Jeśli żaden z powyższych tagów nie jest odpowiedni, proszę użyć tagu INNE. "},
            {"role": "user", "content": commentdata},
        ],
        temperature=0,
    )
    tag = response.choices[0].message.content
    #data = response.id
    #print(tag, data)
    return tag

#data = chat_request("lubie placki")