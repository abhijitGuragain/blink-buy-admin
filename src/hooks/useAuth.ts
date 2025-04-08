import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../services/AuthService";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
      }
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
      }
    },
  });
};
