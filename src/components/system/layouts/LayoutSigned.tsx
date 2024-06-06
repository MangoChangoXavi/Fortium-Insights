import React, { type ReactNode } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PageNotFound } from "./PageNotFound";
import { Topbar } from "~/components/template/ui/Topbar";
import { LoadingPage } from "./Loader";
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
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  // wait to load the session
  if (status === "loading") return <LoadingPage />;

  // Verify if user is logged in and has the correct roles
  if (!session?.user) return <PageNotFound />;
  if (role) {
    if (Array.isArray(role)) {
      if (!role.includes(session.user.role)) return <PageNotFound />;
    } else {
      if (role !== session.user.role) return <PageNotFound />;
    }
  }

  const handleClickLogoTopBar = () => {
    router.push("/dashboard");
  };

  const handleSignOut = () => {
    void signOut();
    router.push("/");
  };
  return (
    <>
      <Topbar
        handleClickSignOut={handleSignOut}
        profileImgUrl={
          session.user.image ?? "https://via.placeholder.com/33x33"
        }
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
