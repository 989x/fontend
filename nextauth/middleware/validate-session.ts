import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function validateSession() {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      // Session data is still loading, handle accordingly
      return;
    }

    if (!session && router.pathname !== "/auth/signin") {
      router.push("/auth/signin");
    }
  }, [session, status, router]);

  // You might render some loading UI here while the validation is happening
  // return null;
}
