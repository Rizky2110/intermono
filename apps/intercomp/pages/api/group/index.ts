import axios, { AxiosError } from "axios";
import { uriEncode } from "core/utils";
import { NextApiRequest, NextApiResponse } from "next";
import api from "src/lib/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const accessToken = req.headers.authorization || "";

      // const params = uriEncode("", JSON.parse(req.query.params as string));
      const params = uriEncode("", req.query);

      const response = await api.get(`/group?${params}`, {
        headers: {
          Authorization: accessToken,
        },
      });

      if (response.status >= 400) {
        throw new Error(response.data.message);
      }

      return res.status(response.status).json(response.data);
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

  if (req.method === "POST") {
    try {
      const accessToken = req.headers.authorization || "";

      const response = await api.post(`/group`, req.body, {
        headers: {
          Authorization: accessToken,
        },
      });

      if (response.status >= 400) {
        throw new Error(response.data.message);
      }

      return res.status(response.status).json(response.data);
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
