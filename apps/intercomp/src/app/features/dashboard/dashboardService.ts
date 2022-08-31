import { addCookieHeader } from "core";
import {
  ComponentStatus,
  RequestComponentStatus,
} from "src/dto/componentStatus";
import { proxy } from "src/lib/service";

const getcomponentStatus = async ({
  cookie,
}: RequestComponentStatus): Promise<ComponentStatus> => {
  const headers = addCookieHeader(cookie);
  const res = await proxy.get("/proxy/component-status", {
    withCredentials: true,
    headers,
  });

  return res.data;
};

const dashboardService = {
  getcomponentStatus,
};

export default dashboardService;
