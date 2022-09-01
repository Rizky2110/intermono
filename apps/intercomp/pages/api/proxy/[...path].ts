import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";
import Cookies from "cookies";
import url from "url";

const PROXY_URL = process.env.NEXT_PUBLIC_PROXY_URL;

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = createProxyMiddleware({
  secure: process.env.NODE_ENV === "production",
  target: PROXY_URL,
  changeOrigin: true,
  pathRewrite: { "^/api/proxy": "" },
  selfHandleResponse: true,

  onError(err, req, res) {
    res.writeHead(500, {
      "Content-Type": "text/plain",
    });
    res.end(
      "Something went wrong. And we are reporting a custom error message."
    );
  },

  onProxyReq(proxyReq, req, res) {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access");
    req.headers.cookie = "";
    if (accessToken) {
      req.headers.authorization = accessToken;
      proxyReq.setHeader("authorization", accessToken);
    }
  },

  onProxyRes: responseInterceptor(
    async (responseBuffer, proxyRes, req, res) => {
      const { pathname } = url.parse(req.url || "");

      const isLogin: boolean = pathname === "/login";

      const cookies = new Cookies(req, res);
      const accesToken = cookies.get("access");

      req.headers.cookie = "";

      res.setHeader("Content-Type", "application/json");
      res.setHeader("Accept", "application/json");

      if (accesToken) {
        req.headers.authorization = accesToken;
      }

      const response = responseBuffer.toString("utf8");

      if (isLogin) {
        try {
          const { token } = JSON.parse(response);

          if (!token) {
            return response;
          }

          const cookiesLogin = new Cookies(req, res);
          cookiesLogin.set("access", token, {
            httpOnly: true,
            sameSite: "strict",
          });

          return JSON.stringify({ logged: true });
        } catch (error) {
          const err = error as Error;
          res.statusCode = 500;
          res.statusMessage = "Internal Server Error";

          const message = {
            message: err.message,
            status: res.statusCode,
          };
          return JSON.stringify(message);
        }
      }

      return responseBuffer;
    }
  ),
});

export default proxy;
