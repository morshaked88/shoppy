import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();

  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Something went wrong");

      toast.success("Successfully signed out");

      router.push("/sign-in");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong, please try again");
    }
  };

  return {
    signOut,
  };
};

export default useAuth;
