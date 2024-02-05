//...existing imports
import axios from "axios";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  // ... (existing transporter setup and mailData)
  // Validate the reCAPTCHA token on the server-side

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.token}`,
    );
    if (response.data.success) {
    } else {
      // reCAPTCHA verification failed
      res.status(400).send("reCAPTCHA verification failed.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}
