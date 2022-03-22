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
        console.log(res);
    }).catch(err => { console.log(err) });
}

export function deleteCookie() {
    api.post("/logout", {
        data: {}
    }).then((res) => {
    }).catch(err => { console.log(err) });
}