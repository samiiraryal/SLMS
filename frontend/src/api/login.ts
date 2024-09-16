import { useMutation } from "@tanstack/react-query";
import httpClient from "./apiService.js";

const studentEndpoint = "/login";

interface ILoginProps {
  email: string;
  password: string;
}

const useLogin = async ({ data }: { data: ILoginProps }) => {
  const response = await httpClient.post(studentEndpoint, data);
  return response;
};

const LoginStudent = () => {
  return useMutation({
    mutationKey: ["loginStudent"],
    mutationFn: useLogin,
    onSuccess: (response) => {
      console.log(response);
      
      const token = response.headers.authorization?.toString();

      console.log(token);
      
      if (token) {
        localStorage.setItem("token", token);
      }
    },
  });
};
export default LoginStudent;
