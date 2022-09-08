import { addCookieHeader } from "core";
import {
  Breaker,
  Breakers,
  Group,
  GroupDeleteOne,
  Groups,
  RequestComponentBreaker,
  RequestComponentBreakerGetOne,
  RequestGroups,
  RequestGroupsCreate,
  RequestGroupsDeleteOne,
  RequestGroupsOne,
} from "src/dto";
import { proxy } from "src/lib/service";

const getAllGroups = async ({
  cookie,
  datas,
}: RequestGroups): Promise<Groups> => {
  const headers = addCookieHeader(cookie);
  const res = await proxy.get("/proxy/group", {
    params: datas,
    headers,
  });

  return res.data;
};

const getOneGroup = async ({
  cookie,
  datas: { id },
}: RequestGroupsOne): Promise<Group> => {
  const headers = addCookieHeader(cookie);
  const res = await proxy.get(`/proxy/group/${id}`, {
    headers,
  });

  return res.data;
};

const deleteOneGroup = async ({
  cookie,
  datas: { id },
}: RequestGroupsDeleteOne): Promise<GroupDeleteOne> => {
  const headers = addCookieHeader(cookie);
  const res = await proxy.delete(`/proxy/group/${id}`, {
    headers,
  });

  return res.data;
};

const createOneGroup = async ({
  datas,
  cookie,
}: RequestGroupsCreate): Promise<Group> => {
  const headers = addCookieHeader(cookie);
  const res = await proxy.post(`/proxy/group`, datas, {
    headers,
  });

  return res.data;
};

const groupService = {
  getAllGroups,
  getOneGroup,
  createOneGroup,
  deleteOneGroup,
};

export default groupService;
