import axios from "axios";

const api = axios.create({
    baseURL: "/api",
});

export function createCookie(token) {
    api.post("/dashboard", {
        data: {
            token,
        }
    }).then((res) => {
        console.log("Deu certo!")
    }).catch(err => { console.log(err) });
}

export function deleteCookie() {
    api.post("/logout", {
        data: {}
    }).then((res) => {
    }).catch(err => { console.log(err) });
}

export async function getCookie() {
    try {
        const response = await api.get("/cookie");
        const { user } = response.data;
        return user;
    } catch (err) {
        console.log("Erro ao buscar!");
        return;
    }
}