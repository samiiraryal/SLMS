import { useMutation } from "@tanstack/react-query";
import httpClient from "./apiService.js";

const csvEndPoint = "/api/student/upload";

interface ILoginProps {
  email: string;
  password: string;
}

const useCSVReader = async ({ data }: { data: any }) => {
  const response = await httpClient.post(csvEndPoint, data);
  return response;
};

const StudentCSVReader = () => {
  return useMutation({
    mutationKey: ["csvStudent"],
    mutationFn: useCSVReader,
    onSuccess: (res) => {
      console.log(res, "res");
    },
  });
};
export default StudentCSVReader;
