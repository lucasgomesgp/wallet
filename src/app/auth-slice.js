import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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
            if (err.code === "auth/wrong-password" || err.code === "auth/invalid-email") {
                toast.error("Email ou senha incorreto!");
            } else {
                toast.error("Erro ao tentar fazer login com email");
            }
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
        loginWithEmailAndPassword(state, action) {

        },
        createNewUser(state, action) {
            const { email, password } = action.payload;
            createUserWithEmailAndPassword(auth, email, password)
                .then((credentials) => {
                    const user = credentials.user;
                    window.location.pathname = "/";
                    toast.success("Usuário criado com sucesso!");

                }).catch((error) => {
                    toast.error(error.message);
                });

        },
        signout(state, action) {

        }
    },
    extraReducers: {
        [loginWithGoogle.fulfilled]: (state, action) => {
            const { displayName, email, photoURL, uid } = action.payload;
            state.loggedIn = true;
            state.user = {
                displayName,
                email,
                photoURL,
                uid
            };
            if (email) {
                toast.success("Login com sucesso!");
            }
        },
        [loginWithGoogle.rejected]: (state) => {
            state.loggedIn = false;
            state.user = {};
        },
        [signInWithEmail.fulfilled]: (state, action) => {
            const { displayName, email, photoURL, uid } = action.payload;
            state.loggedIn = true;
            state.user = {
                displayName: displayName || "",
                email,
                photoURL: photoURL || "",
                uid
            };
            if (email) {
                toast.success("Login com sucesso!");
            }
        },
        [signInWithEmail.rejected]: (state, action) => {
            state.loggedIn = false;
            state.user = {};
        }
    }
});

export const { loginWithEmailAndPassword, createNewUser, signout } = authSlice.actions;

export default authSlice.reducer;