import { NextRequest, NextResponse } from "next/server";

const comments = [
  { "id": 1, "username": "Smakosz123", "opinion": "Bardzo smaczne jedzenie, obsługa miła i profesjonalna. Polecam!", "sentiment": "positive", "date": 1642245600, "tags": ["FOOD", "SERVISE"] },
  { "id": 2, "username": "GourmetGirl", "opinion": "Restauracja ma przyjemny klimat, dania są świeże i smaczne. Wrócę tam na pewno.", "sentiment": "positive", "date": 1645394400, "tags": ["ATMOSPHERE", "FOOD"] },
  { "id": 3, "username": "RozczarowanyKlient", "opinion": "Niestety, doświadczenie było rozczarowujące. Dania były zimne, a obsługa nieprzyjazna.", "sentiment": "negative", "date": 1646853600, "tags": ["FOOD", "SERVICE"] },
  { "id": 4, "username": "DataNightExpert", "opinion": "Doskonałe miejsce na randkę! Menu jest zróżnicowane, a dania są estetycznie podane.", "sentiment": "positive", "date": 1649172000, "tags": ["ATMOSPHERE"] },
  { "id": 5, "username": "KrytycznyKonsument", "opinion": "Obsługa była bardzo uprzejma, ale jedzenie nie spełniło moich oczekiwań. Może to był pechowy dzień.", "sentiment": "negative", "date": 1652361600, "tags": ["FOOD", "SERVICE"] }
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