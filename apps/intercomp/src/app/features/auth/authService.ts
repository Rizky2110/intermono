import api from "src/lib/service";
import { AuthLogin, RequestLogin, RequestMe } from "src/dto";
import { AxiosResponse } from "axios";

const login = async (data: RequestLogin) => {
  const res = await api.post<any, AxiosResponse<AuthLogin>>(
    "/auth/login",
    data
  );

  if (res.status === 200) {
    localStorage.setItem(
      "intercomp::token",
      JSON.stringify(res.data.result?.token || "")
    );

    localStorage.setItem(
      "intercomp::user",
      JSON.stringify({
        name: res.data.result.name,
        phone: res.data.result.phone,
        email: res.data.result.email,
        photo: res.data.result.photo,
        created_at: res.data.result.created_at,
        updated_at: res.data.result.updated_at,
        deleted_at: res.data.result.deleted_at,
      })
    );

    localStorage.setItem(
      "intercomp::permissions",
      JSON.stringify({
        permissions: res.data.result.permissions,
      })
    );

    localStorage.setItem(
      "intercomp::roles",
      JSON.stringify({
        roles: res.data.result.roles,
      })
    );
  }

  return res.data;
};

const logout = async () => {
  const res = await api.post("/auth/logout", {});

  return res.data;
};

const me = async (data: RequestMe) => {
  const res = await api.get("/auth/check_token", {
    headers: {
      Authorization: data.token,
    },
  });

  return res.data;
};

const authService = {
  login,
  logout,
  me,
};

export default authService;
