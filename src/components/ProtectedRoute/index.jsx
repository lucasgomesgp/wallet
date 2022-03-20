import Router from "next/router";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const protectedRoute = (Component) => (props) => {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    useEffect(() => {
        if (!loggedIn) {
            Router.push("/");
            toast.error("Para acessar essa página é necessário fazer login primeiro!");
        }
    }, [loggedIn]);
    return (
        <>
            <Toaster />
            <Component {...props} />
        </>
    );
}

export default protectedRoute;