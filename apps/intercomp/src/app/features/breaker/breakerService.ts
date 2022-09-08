import { addCookieHeader } from "core";
import type {
  Breaker,
  Breakers,
  Config,
  RequestComponentBreaker,
  RequestComponentBreakerGetOne,
  RequestComponentBreakerSetting,
  RequestConfigOther,
  RequestConfigRestart,
} from "src/dto";
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

const getOneBreker = async ({
  cookie,
  datas: { id },
}: RequestComponentBreakerGetOne): Promise<Breaker> => {
  const headers = addCookieHeader(cookie);
  const res = await proxy.get(`/proxy/component/${id}`, {
    headers,
  });

  return res.data;
};

const updateSettingBreaker = async ({
  cookie,
  datas,
}: RequestComponentBreakerSetting): Promise<Breaker> => {
  const headers = addCookieHeader(cookie);
  const res = await proxy.post(`/proxy/component/${datas.id}`, datas.body, {
    headers,
  });

  return res.data;
};

const configRestart = async ({
  cookie,
  datas,
}: RequestConfigRestart): Promise<Config> => {
  const headers = addCookieHeader(cookie);
  const res = await proxy.post(`/proxy/publish/restart`, datas, {
    headers,
  });

  return res.data;
};

const configUpdate = async ({
  cookie,
  datas,
}: RequestConfigOther): Promise<Config> => {
  const headers = addCookieHeader(cookie);
  const res = await proxy.post(`/proxy/publish/other`, datas, {
    headers,
  });

  return res.data;
};

const breakerService = {
  getAllBreaker,
  getOneBreker,
  configRestart,
  configUpdate,
  updateSettingBreaker,
};

export default breakerService;
