import { addCookieHeader } from "core";
import { Breakers, RequestComponentBreaker } from "src/dto";
import { proxy } from "src/lib/service";

const getAllBreaker = async ({
  cookie,
  datas,
}: RequestComponentBreaker): Promise<Breakers> => {
  const headers = addCookieHeader(cookie);
  const res = await proxy.get("/proxy/component", {
    params: datas,
    headers,
  });

  return res.data;
};

const breakerService = {
  getAllBreaker,
};

export default breakerService;
