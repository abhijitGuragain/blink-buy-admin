import { ILogin, ISignup } from "../interfaces/IAuth";
import api from "./api";

export const login = (data: ILogin) => api.post("/login/", data);

export const signup = (data: ISignup) => api.post("/seller-register/", data);

export const verifyOtp = (data: any) => api.post("/verify/", data);
