import { useQuery } from "@tanstack/react-query";
import httpClient from "./apiService.js";

const getAllStudent = (sem: number) => {
  const semesterStudentEndpoint = (sem: number) =>
    `/api/student/semester/${sem}`;

  return useQuery({
    queryKey: ["getAllStudent"],
    queryFn: async () => {
      return await httpClient.get(semesterStudentEndpoint(sem));
    },
    select: (data) => data.data,
  });
};

export default getAllStudent;
