import { NextRequest, NextResponse } from "next/server";

const comments = [
  { "id": 1, "username": "CulinaryExplorer", "opinion": "Fantastyczne jedzenie, obsługa na najwyższym poziomie!", "sentiment": "positive", "date": 1672531200, "tags": ["FOOD", "SERVICE"] },
  { "id": 2, "username": "EpicureanAdventurer", "opinion": "Wspaniała atmosfera, dania są prawdziwym dziełem sztuki kulinarniej.", "sentiment": "positive", "date": 1672617600, "tags": ["ATMOSPHERE", "FOOD"] },
  { "id": 3, "username": "CriticalCuisineCritic", "opinion": "Niestety, jedzenie było zbyt drogie jak na jakość. Obsługa była jednak miła.", "sentiment": "negative", "date": 1672704000, "tags": ["FOOD", "COST", "SERVICE"] },
  { "id": 4, "username": "GourmetGlobetrotter", "opinion": "Menu było bogate i zróżnicowane. Polecam dla miłośników eksperymentów kulinarnych.", "sentiment": "positive", "date": 1672790400, "tags": ["FOOD", "MENU"] },
  { "id": 5, "username": "PickyPalate", "opinion": "Jedzenie było zimne, atmosfera dość przeciętna. Nie polecam.", "sentiment": "negative", "date": 1672876800, "tags": ["FOOD", "ATMOSPHERE", "SERVICE"] },
  { "id": 6, "username": "FoodieNomad", "opinion": "Obsługa była bardzo uprzejma, a dania smakowały wyśmienicie. Wrócę tam na pewno!", "sentiment": "positive", "date": 1672963200, "tags": ["FOOD", "SERVICE"] },
  { "id": 7, "username": "GastronomyGuru", "opinion": "Ceny były wysokie, ale atmosfera i obsługa zrekompensowały to w pewnym stopniu.", "sentiment": "neutral", "date": 1673049600, "tags": ["COST", "ATMOSPHERE", "SERVICE"] },
  { "id": 8, "username": "SensorySommelier", "opinion": "Menu było ograniczone, ale jedzenie było doskonałe. Obsługa również na medal.", "sentiment": "positive", "date": 1673136000, "tags": ["FOOD", "MENU", "SERVICE"] },
  { "id": 9, "username": "EpicureanExplorer", "opinion": "Przeciętne jedzenie, ale miła atmosfera sprawiła, że wieczór był udany.", "sentiment": "positive", "date": 1673222400, "tags": ["FOOD", "ATMOSPHERE"] },
  { "id": 10, "username": "SelectiveSavorer", "opinion": "Najlepsze dania, jakie kiedykolwiek jadłem! Obsługa również godna polecenia.", "sentiment": "positive", "date": 1673308800, "tags": ["FOOD", "SERVICE"] }
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