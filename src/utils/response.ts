import { Response } from "../types/response";

const responseToClient = (res: Response) => {
  return {
    status: res.status,
    ...(res.message ? { message: res.message } : {}),
    ...(res.data ? { data: res.data } : {}),
  };
};

export default responseToClient;
