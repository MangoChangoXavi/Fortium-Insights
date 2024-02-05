import { type NextApiRequest } from "next";

export default async function POST(req: NextApiRequest) {
  const data = await req.body;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const token = data.token;
  if (!token) throw new Error("No token provided");

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${data.token}`;

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
    console.log(responseData);
    throw new Error("Failed Captcha");
  }
}
