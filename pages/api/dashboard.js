import cookie from "cookie";

export default (req, res) => {
    const { token } = req.body.data;
    res.setHeader("Set-Cookie",
        cookie.serialize("auth_token", token, {
            maxAge: 7200,
            path: "/",
            secure: true,
            httpOnly: true,
        }));
    res.statusCode = 200;
    res.json({ message: "Token created!" });
}