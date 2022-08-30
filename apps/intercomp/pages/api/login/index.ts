import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { RequestLogin } from "src/dto";
import api from "src/lib/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password, reCaptcha } = req.body as RequestLogin;

      const response = await api.post("/auth/login", {
        email,
        password,
        reCaptcha,
      });

      if (response.status >= 400) {
        throw new Error(response.data.message);
      }

      return res.status(200).json({ token: response.data.result.token });
    } catch (error) {
      const err = error as AxiosError | Error;

      if (axios.isAxiosError(err)) {
        const message = err.response?.data;

        return res.status(err.response?.status || 400).json(message);
      }

      const message = err.message || err.toString();

      return res.status(500).json(message);
    }
  }

  return res.status(406).json({
    message: "Method not allowed",
  });
}
