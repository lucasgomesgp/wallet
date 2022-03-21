import Router from "next/router";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";

const protectedRoute = (Component) => (props) => {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!loggedIn || !user.email) {
            Router.push("/");
            toast.error("Para acessar essa página é necessário fazer login primeiro!");
        }
    }, [loggedIn]);
    return (
        <>
            <Toaster />
            {!loggedIn ? <Loading /> : <Component {...props} />}
        </>
    );
}

export default protectedRoute;