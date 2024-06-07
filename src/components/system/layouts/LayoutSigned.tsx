import React, { type ReactNode } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PageNotFound } from "./PageNotFound";
import { Topbar } from "~/components/template/layouts/Topbar";
import { LoadingPage } from "./Loader";
export const LayoutSigned = ({
  role = ["admin", "user", "disabled"],
  children,
}: {
  children: ReactNode;
  noPadding?: boolean;
  role?: string | string[];
}) => {
  const router = useRouter();
  /**
   * Renders the signed layout component.
   *
   * @returns The JSX element representing the signed layout.
   */
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

  /**
   * Handles the sign out functionality.
   * This function signs out the user and redirects them to the home page.
   */
  const handleSignOut = async () => {
    await signOut();
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
      {children}
    </>
  );
};
