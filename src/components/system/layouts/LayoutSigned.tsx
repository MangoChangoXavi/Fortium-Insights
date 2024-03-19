import React, { type ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PageNotFound } from "./PageNotFound";
import { UsersIcon } from "../ui/Icons";
import { Sidebar } from "./Sidebar";
import { AxeIcon, CatIcon, MicIcon, TvIcon } from "lucide-react";
const menuItems = [
  {
    name: "On Boards",
    icon: <AxeIcon className="h-5 w-5" />,
    link: "/reports/onboards",
    permissions: ["admin"],
  },
  {
    name: "Propuestas",
    icon: <CatIcon className="h-5 w-5" />,
    link: "/reports/proposals",
    permissions: ["admin"],
  },
  {
    name: "Clientes",
    icon: <TvIcon className="h-5 w-5" />,
    link: "/clients",
    permissions: ["admin"],
  },
  {
    name: "ACM",
    icon: <MicIcon className="h-5 w-5" />,
    link: "/acms",
    permissions: ["admin", "user"],
  },
  {
    name: "Usuarios",
    icon: <UsersIcon className="h-5 w-5" />,
    link: "/reports/users",
    permissions: ["admin"],
  },
];

export const LayoutSigned = ({
  role = ["admin", "user", "disabled"],
  children,
  noPadding = false,
}: {
  children: ReactNode;
  noPadding?: boolean;
  role?: string | string[];
}) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  if (!session?.user) return <PageNotFound />;

  // Verify roles or roles
  if (role) {
    if (Array.isArray(role)) {
      if (!role.includes(session.user.role)) return <PageNotFound />;
    } else {
      if (role !== session.user.role) return <PageNotFound />;
    }
  }
  return (
    <>
      <Sidebar
        userImage={
          session.user.image ??
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
        userName={session.user.name ?? "Anonimo"}
        userRole={session.user.role}
        items={menuItems}
        companyName="Techos Digitales"
      />
      <div className="w-full pt-2 md:pl-12 ">
        <div
          className={`${
            noPadding ? "" : "mx-auto w-full px-2 md:px-4 lg:px-12"
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
};
