import { type NextApiRequest } from "next";
import { use } from "react";

export default async function POST(req: NextApiRequest) {
  const data = await req.body;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const token = data.token;
  const user_ip = req.headers["x-forwarded-for"] ?? req.socket.remoteAddress;
  if (!token) throw new Error("No token provided");
  if (!user_ip) throw new Error("No user ip provided");

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${
    user_ip as string
  }`;
  console.log("url", url);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  if (responseData.success) {
    return "success!";
  } else {
    console.error(responseData);
    throw new Error("Failed Captcha");
  }
}
