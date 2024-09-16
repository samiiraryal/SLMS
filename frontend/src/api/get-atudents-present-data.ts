import { useQuery } from "@tanstack/react-query";
import httpClient from "./apiService.js";

const getStudentPresent = (sem: number, sub: number) => {
  const semesterStudentEndpoint = (sem: number, sub: number) =>
    `/api/semester/${sem}/${sub}`;

  return useQuery({
    queryKey: ["getStudentPresent"],
    queryFn: async () => {
      return await httpClient.get(semesterStudentEndpoint(sem, sub));
    },
    select: (data) => data.data,
    enabled: !!sem && !!sub,
  });
};

export default getStudentPresent;
