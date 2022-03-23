import Router from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { getCookie } from "../../../services/token";
import { userHasLogin } from "../../app/auth-slice";
import { useDispatch } from "react-redux";
import { Loading } from "../Loading";

const protectedRoute = (Component) => (props) => {
    const [loading, setLoading] = useState(false);
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const initializeUserLoaded = async () => {
        try {
            const userLoaded = await getCookie();
            setLoading(true);
            if (userLoaded !== undefined) {
                const { email, user_id: uid, name: displayName, photoURL } = userLoaded;
                dispatch(userHasLogin({
                    user: {
                        email: email || "",
                        uid: uid || "",
                        displayName: displayName || "",
                        photoURL: photoURL || "",
                    }
                }));
            } else {
                Router.push("/");
                toast.error("Para acessar essa página é necessário fazer login primeiro!");
            }
            setLoading(false);
        } catch (err) {
            console.log("Sem usuário logado!");
        }
    }
    useEffect(async () => {
        await initializeUserLoaded();
    }, []);
    return (
        <>
            <Toaster />
            {!loggedIn ? <Loading /> : <Component {...props} />}
        </>
    );
}

export default protectedRoute;