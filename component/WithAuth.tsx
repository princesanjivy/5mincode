import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

const withAuth = (WrappedComponent: React.FC) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => { 
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/");
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
