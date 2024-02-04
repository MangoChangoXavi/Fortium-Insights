import { type PutBlobResult } from "@vercel/blob";
import type SignatureCanvas from "react-signature-canvas";

export const GTQ = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "GTQ",
});

export const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const getRandomColors = (n: number): string[] => {
  const randomColors: string[] = [];

  for (let index = 0; index < n; index++) {
    randomColors.push(getRandomColor());
  }

  return randomColors;
};

export const splitArrayIntoChunks = <Type>(
  arr: Type[],
  chunkSize: number,
): Type[][] => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};

export const haveSameDay = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const getRandomColor = (): string => {
  let length = 6;
  const chars = "0123456789ABCDEF";
  let hex = "#";
  while (length--) hex += chars[(Math.random() * 16) | 0];
  return hex;
};

export const getTip = async (): Promise<string> => {
  const response = await fetch("/api/ai/route", {
    method: "GET",
  });
  if (response.status === 200) {
    const res = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.text;
  } else {
    const error = await response.text();
    throw new Error(error);
  }
};

export const uploadFile = async (file: File): Promise<string> => {
  const response = await fetch("/api/upload/route", {
    method: "POST",
    headers: { "content-type": file?.type ?? "application/octet-stream" },
    body: file,
  });
  if (response.status === 200) {
    const { url } = (await response.json()) as PutBlobResult;
    return url;
  } else {
    const error = await response.text();
    throw new Error(error);
  }
};

export const getFileFromCanvas = async (
  padRef: React.MutableRefObject<SignatureCanvas | null>,
) => {
  if (padRef.current) {
    const signatureCanvas = padRef.current.getCanvas();
    const blob = await new Promise((resolve) =>
      signatureCanvas.toBlob(resolve),
    );
    const fd = new window.FormData();
    fd.append("signature", blob as Blob, "signature.png");
    return fd.get("signature") as File;
  }
};

export const getAge = (dateString: string) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export function addConditionToWhere<T>(condition: T, key: string, value: T): T {
  return {
    ...condition,
    [key]: value,
  };
}
