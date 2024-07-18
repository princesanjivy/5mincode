import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";

const withoutAuth = (WrappedComponent: React.FC) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && user) {
        router.push("/home");
      }
    }, [user, loading, router]);

    if (loading) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withoutAuth;
