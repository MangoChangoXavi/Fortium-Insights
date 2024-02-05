import { type NextApiRequest } from "next";
import axios from "axios";

export default async function POST(req: NextApiRequest) {
  const data = await req.body;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const token = data.token;
  if (!token) throw new Error("No token provided");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
  );
  if (res.data.success) {
    return "success!";
  } else {
    throw new Error("Failed Captcha");
  }
}
