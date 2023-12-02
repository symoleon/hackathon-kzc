import { NextRequest, NextResponse } from "next/server";

const comments = [
    { "id": 1, "username": "Smakosz123", "opinion": "Bardzo smaczne jedzenie, obsługa miła i profesjonalna. Polecam!" },
    { "id": 2, "username": "GourmetGirl", "opinion": "Restauracja ma przyjemny klimat, dania są świeże i smaczne. Wrócę tam na pewno." },
    { "id": 3, "username": "RozczarowanyKlient", "opinion": "Niestety, doświadczenie było rozczarowujące. Dania były zimne, a obsługa nieprzyjazna." },
    { "id": 4, "username": "DataNightExpert", "opinion": "Doskonałe miejsce na randkę! Menu jest zróżnicowane, a dania są estetycznie podane." },
    { "id": 5, "username": "KrytycznyKonsument", "opinion": "Obsługa była bardzo uprzejma, ale jedzenie nie spełniło moich oczekiwań. Może to był pechowy dzień." }
];
  

export async function GET(request: NextRequest) {
    return NextResponse.json(comments);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const timestamp = Date.now();
    body.id = timestamp;
    comments.push(body);
    return new Response(null, {status: 204});
}