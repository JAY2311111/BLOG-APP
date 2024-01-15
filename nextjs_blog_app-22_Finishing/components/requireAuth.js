import { useEffect } from "react";
import { useRouter } from "next/router";

const requireAuth = (Component) => {
  return (props) => {
    const router = useRouter();


    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/sign-in");
      }
    }, []);

    return <Component {...props} />;
  };
};

export default requireAuth;
