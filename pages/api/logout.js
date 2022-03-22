import cookie from "cookie";

export default (req, res) => {
    res.setHeader("Set-Cookie",
        cookie.serialize("auth_token", "", {
            path: "/",
            secure: true,
            httpOnly: true,
            expires: new Date(0),
        }));
    res.statusCode = 200;
    res.json({ message: "Token deleted!" });
}