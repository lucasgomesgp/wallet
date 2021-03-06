import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {createCookie, deleteCookie} from "../../services/token";
import { auth, provider } from "../../services/firebase.config";
import toast from "react-hot-toast";

export const loginWithGoogle = createAsyncThunk(
    "auth/loginWithGoogle",
    async (dispatch, getState) => {
        try {
            const { user } = await signInWithPopup(auth, provider);
            return user;
        } catch (err) {
            if (err.code === "auth/popup-closed-by-user") {
                toast.error("O popup foi fechado e o login não foi concluído!");
            } else {
                toast.error("Erro ao tentar fazer login com Google");
            }
            return err;
        }
    }
);

export const signInWithEmail = createAsyncThunk(
    "auth/signInWithEmail",
    async ({ email, password }) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            return user;
        } catch (err) {
            let message = "";
            switch (err.code) {
                case "auth/user-not-found":
                    message = "Usuário não encontrado";
                    break;
                case "auth/wrong-password":
                    message = "Senha incorreta!";
                    break;
                case "auth/invalid-email":
                    message = "Email inválido!";
                    break;
                default:
                    message = "Erro ao tentar fazer login com email";
                    break;
            }
            toast.error(message);
            return err;
        }
    }
)
const authSlice = createSlice({
    name: "auth",
    initialState: {
        loggedIn: false,
        user: {
            displayName: "",
            email: "",
            photoURL: "",
            uid: ""
        }
    },
    reducers: {
        createNewUser(state, action) {
            const { email, password, fullName } = action.payload;
            createUserWithEmailAndPassword(auth, email, password)
                .then((credentials) => {
                    const user = credentials.user;
                    user.displayName = fullName;
                    window.location.pathname = "/";
                    toast.success("Usuário criado com sucesso!");

                }).catch((error) => {
                    toast.error(error.message);
                });
        },
        logout(state) {
            state.user = {};
            state.loggedIn = false;
            deleteCookie();
        },
        userHasLogin(state, action){
            state.user = action.payload.user;
            state.loggedIn = true;
        }
    },
    extraReducers: {
        [loginWithGoogle.fulfilled]: (state, action) => {
            const { displayName, email, photoURL, uid, accessToken: token } = action.payload;
            state.loggedIn = true;
            state.user = {
                displayName,
                email,
                photoURL,
                uid
            };
            if (email) {
                toast.success("Login com Google realizado com sucesso!");
                createCookie(token);
            }
        },
        [loginWithGoogle.rejected]: (state) => {
            state.loggedIn = false;
            state.user = {};
        },
        [signInWithEmail.fulfilled]: (state, action) => {
            const { displayName, email, photoURL, uid, accessToken: token } = action.payload;
            state.loggedIn = true;
            state.user = {
                displayName: displayName || "",
                email: email || "",
                photoURL: photoURL || "",
                uid: uid || ""
            };
            if (email) {
                toast.success("Login com sucesso!");
                createCookie(token);
            }
        },
        [signInWithEmail.rejected]: (state) => {
            state.loggedIn = false;
            state.user = {};
        }
    }
});

export const { createNewUser, logout, userHasLogin } = authSlice.actions;

export default authSlice.reducer;