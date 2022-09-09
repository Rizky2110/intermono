import { addCookieHeader } from "core";
import type {
  RequestOneSchedule,
  RequestSchedules,
  Schedule,
  Schedules,
} from "src/dto";
import { proxy } from "src/lib/service";

const getAllSchedules = async ({
  cookie,
  datas,
}: RequestSchedules): Promise<Schedules> => {
  const headers = addCookieHeader(cookie);
  const res = await proxy.get("/proxy/schedule", {
    params: datas,
    headers,
  });

  return res.data;
};

const getOneSchedule = async ({
  cookie,
  datas,
}: RequestOneSchedule): Promise<Schedule> => {
  const { id } = datas;

  const headers = addCookieHeader(cookie);
  const res = await proxy.get(`/proxy/schedule/${id}`, {
    headers,
  });

  return res.data;
};

const scheduleService = {
  getAllSchedules,
  getOneSchedule,
};

export default scheduleService;
