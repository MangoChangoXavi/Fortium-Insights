import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

// model client {
//     id          String    @id @default(cuid())
//     name        String
//     company     String
//     role        String
//     phone       String?
//     location    String
//     linkedIn    String?
//     notes       String?
//     status      String    @default("initial") // Initial, Contacted, Proposal, Contract, Completed
//     nextMeeting DateTime? @default(now()) @map("next_meeting")
//     createdAt   DateTime  @default(now()) @map("created_at")
//   }
export const CustomerCard = ({
  name,
  company,
  role,
  phone,
  location,
  linkedIn,
}: {
  name: string;
  company: string;
  role: string;
  phone: string;
  location: string;
  linkedIn: string;
}) => {
  return (
    <div className="flex h-[250px] w-fit flex-col gap-6 rounded-2xl bg-white p-4">
      <div className="flex flex-col gap-2">
        <p className="font-['Plus Jakarta Sans'] w-52 text-center text-base font-bold text-zinc-800">
          {name}
          <br />
          {company}
        </p>
        <div className="font-['Plus Jakarta Sans'] w-52 text-center text-sm font-normal text-stone-300">
          {role}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-['Plus Jakarta Sans'] w-52 text-center text-sm font-semibold text-zinc-500">
          {location}
        </div>
        <Link
          href={linkedIn}
          className="flex cursor-pointer flex-row items-center justify-center gap-2 text-center text-sm font-semibold text-blue-500 hover:underline"
        >
          <LinkedinIcon className="h-4 w-4" /> LinkedIn
        </Link>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="font-['Plus Jakarta Sans'] w-[82px] text-center text-base font-bold text-zinc-800">
          {phone}
        </div>
        <div className="flex flex-row gap-2">
          <Button className="h-8 w-8 rounded-full" variant="dark">
            {"<"}
          </Button>
          <Button className="h-8 w-8 rounded-full text-white" variant="dark">
            {">"}
          </Button>
        </div>
      </div>
    </div>
  );
};
