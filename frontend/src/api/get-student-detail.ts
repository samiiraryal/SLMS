import { useQuery } from "@tanstack/react-query";
import httpClient from "./apiService.js";

const getStudentDetail = (symbol: string) => {
  const studentEndpoint = (symbol: string) =>
    `/api/attendance/symbolno?symbolno=${symbol}`; // end point change garna parcha

  return useQuery({
    queryKey: ["getStudentDetail", symbol],
    queryFn: async () => {
      return await httpClient.get(studentEndpoint(symbol));
    },
    select: (data) => data.data,
    enabled: !!symbol
  });
};
export default getStudentDetail;
