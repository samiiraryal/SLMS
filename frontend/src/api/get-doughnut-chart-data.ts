import { useQuery } from "@tanstack/react-query";
import httpClient from "./apiService.js";

const getDoughnutData = (semester: number, subject: number) => {
  const doughnutEndpoint = (semester: number, subject: number) =>
    `/api/doughnutchart/semester/${semester}/${subject}`;

  return useQuery({
    queryKey: ["getDoughnutData", subject],
    queryFn: async () => {
      return await httpClient.get(doughnutEndpoint(semester, subject));
    },
    select: (data) => data.data,
    enabled: !!semester && !!subject,
  });
};
export default getDoughnutData;

export const getDoughnutReportData = (semester: number, subject: number) => {
  const doughnutReportEndpoint = (semester: number, subject: number) =>
    `/api/doughnutchart/report/semester/${semester}/${subject}`;

  return useQuery({
    queryKey: ["getDoughnutReportData", subject],
    queryFn: async () => {
      return await httpClient.get<any>(doughnutReportEndpoint(semester, subject));
    },
    select: (data) => data.data,
    enabled: !!semester && !!subject,
  });
};
