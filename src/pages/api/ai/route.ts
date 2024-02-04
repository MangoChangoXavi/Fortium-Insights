import { NextResponse } from "next/server";
import OpenAi from "openai";

export const runtime = "edge";

export default async function GET() {
  const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Esta es una conversacion con alguien con mucha experiencia en el area de los bienes raices",
      },
      {
        role: "user",
        content:
          "como vendedor experimentado dale un consejo a alguien que esta empezando en el area de los bienes raices que sea corto y facil de entender",
      },
    ],
  });

  return NextResponse.json({ text: response.choices[0]?.message.content });
}
