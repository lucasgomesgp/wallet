import cookie from "cookie";
import jwtDecode from "jwt-decode";

export default function (req, res) {
    const { auth_token } = cookie.parse(req.headers.cookie || "");
    if (auth_token !== undefined) {
        const user = jwtDecode(auth_token);
        res.send({ user });
    } else {
        res.send({ message: "Usuário não encontrado!" });
    }
}