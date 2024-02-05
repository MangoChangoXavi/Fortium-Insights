export async function verifyCaptcha(token: string | null) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

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
    throw new Error("Failed Captcha");
  }
}
