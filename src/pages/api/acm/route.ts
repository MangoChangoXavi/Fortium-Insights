import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export default async function POST(req: NextRequest) {
  // get the acm parameters an send them to the python api
  const body = await req.json();
  const response = await fetch("https://td-flask-scrapper.vercel.app/acm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await response.json();
  console.log(data);
  return new Response("Hello", {
    status: 200,
  });
}
