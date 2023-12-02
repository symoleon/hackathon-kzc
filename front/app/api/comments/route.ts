import { NextRequest, NextResponse } from "next/server";

const comments =[
  { "id": 11, "username": "CulinaryExplorer", "opinion": "Fantastyczne jedzenie, obsługa na najwyższym poziomie!", "sentiment": "positive", "date": 1673510400, "tags": ["FOOD", "SERVICE"] },
  { "id": 12, "username": "EpicureanAdventurer", "opinion": "Wspaniała atmosfera, dania są prawdziwym dziełem sztuki kulinarniej.", "sentiment": "positive", "date": 1673625600, "tags": ["ATMOSPHERE", "FOOD"] },
  { "id": 13, "username": "CriticalCuisineCritic", "opinion": "Niestety, jedzenie było zbyt drogie jak na jakość. Obsługa była jednak miła.", "sentiment": "negative", "date": 1673760000, "tags": ["FOOD", "COST", "SERVICE"] },
  { "id": 14, "username": "GourmetGlobetrotter", "opinion": "Menu było bogate i zróżnicowane. Polecam dla miłośników eksperymentów kulinarnych.", "sentiment": "positive", "date": 1673894400, "tags": ["FOOD", "MENU"] },
  { "id": 15, "username": "PickyPalate", "opinion": "Jedzenie było zimne, atmosfera dość przeciętna. Nie polecam.", "sentiment": "negative", "date": 1674038400, "tags": ["FOOD", "ATMOSPHERE", "SERVICE"] },
  { "id": 16, "username": "FoodieNomad", "opinion": "Obsługa była bardzo uprzejma, a dania smakowały wyśmienicie. Wrócę tam na pewno!", "sentiment": "positive", "date": 1674163200, "tags": ["FOOD", "SERVICE"] },
  { "id": 17, "username": "GastronomyGuru", "opinion": "Ceny były wysokie, ale atmosfera i obsługa zrekompensowały to w pewnym stopniu.", "sentiment": "neutral", "date": 1674297600, "tags": ["COST", "ATMOSPHERE", "SERVICE"] },
  { "id": 18, "username": "SensorySommelier", "opinion": "Menu było ograniczone, ale jedzenie było doskonałe. Obsługa również na medal.", "sentiment": "positive", "date": 1674432000, "tags": ["FOOD", "MENU", "SERVICE"] },
  { "id": 19, "username": "EpicureanExplorer", "opinion": "Przeciętne jedzenie, ale miła atmosfera sprawiła, że wieczór był udany.", "sentiment": "positive", "date": 1674566400, "tags": ["FOOD", "ATMOSPHERE"] },
  { "id": 20, "username": "SelectiveSavorer", "opinion": "Najlepsze dania, jakie kiedykolwiek jadłem! Obsługa również godna polecenia.", "sentiment": "positive", "date": 1674700800, "tags": ["FOOD", "SERVICE"] },
  { "id": 21, "username": "SavvySnacker", "opinion": "Ciekawe połączenia smakowe, ale obsługa mogłaby być bardziej profesjonalna.", "sentiment": "neutral", "date": 1674835200, "tags": ["FOOD", "SERVICE"] },
  { "id": 22, "username": "DiningDiva", "opinion": "Świetna oferta dań wegetariańskich, ale cena nieco zaporowa.", "sentiment": "neutral", "date": 1674969600, "tags": ["FOOD", "COST", "MENU"] },
  { "id": 23, "username": "FlavorFanatic", "opinion": "Smaczne jedzenie, ale brak innowacyjności w menu.", "sentiment": "neutral", "date": 1675104000, "tags": ["FOOD", "MENU"] },
  { "id": 24, "username": "TasteTrailblazer", "opinion": "Wyjątkowe doznania smakowe, ale niestety obsługa pozostawia wiele do życzenia.", "sentiment": "negative", "date": 1675238400, "tags": ["FOOD", "SERVICE"] },
  { "id": 25, "username": "PalatePioneer", "opinion": "Fantastyczny wybór win do dań. Obsługa również świetna.", "sentiment": "positive", "date": 1675372800, "tags": ["FOOD", "SERVICE"] },
  { "id": 26, "username": "EpicureEnthusiast", "opinion": "Atmosfera restauracji jest magiczna, jedzenie też nie zawodzi.", "sentiment": "positive", "date": 1675507200, "tags": ["ATMOSPHERE", "FOOD"] },
  { "id": 27, "username": "GourmetGourmand", "opinion": "Dania zaskakująco dobre, ale trochę zbyt wysokie ceny.", "sentiment": "neutral", "date": 1675641600, "tags": ["FOOD", "COST"] },
  { "id": 28, "username": "SavoringSculptor", "opinion": "Menu to prawdziwa uczta dla podniebienia. Polecam spróbować degustacji.", "sentiment": "positive", "date": 1675776000, "tags": ["FOOD", "MENU"] },
  { "id": 29, "username": "GastronomicGuru", "opinion": "Obsługa była wyjątkowo pomocna, co zrekompensowało droższe ceny.", "sentiment": "positive", "date": 1675910400, "tags": ["COST", "SERVICE"] },
  { "id": 30, "username": "CuisineConnoisseur", "opinion": "Wspaniałe dania i obsługa, ale trochę głośno w restauracji.", "sentiment": "positive", "date": 1676044800, "tags": ["FOOD", "SERVICE", "ATMOSPHERE"] }
];


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  if (searchParams.get('admin') == 'true') {
    return NextResponse.json(comments);
  }
  const partialComments = comments.map(comment => {
    return {
      id: comment.id,
      username: comment.username,
      opinion: comment.opinion,
      date: comment.date,
    }
  });
  return NextResponse.json(partialComments);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const timestamp = Date.now();
  body.id = timestamp;
  body.date = timestamp / 1000;
  body.tags = [];
  body.sentiment = 'positive';
  comments.push(body);
  return new Response(null, { status: 204 });
}