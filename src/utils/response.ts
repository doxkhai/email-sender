import { Response } from "../common/types/response.type";

const responseToClient = (res: Response) => {
  return {
    status: res.status ?? 200,
    ...(res.message ? { message: res.message } : {}),
    ...(res.data ? { data: res.data } : {}),
    ...(res.path ? { path: res.path } : {}),
  };
};

export default responseToClient;
