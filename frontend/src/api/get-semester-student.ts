import { useQuery } from "@tanstack/react-query";
import httpClient from "./apiService.js";

const getSemesterStudents = (sem: number, sub: number) => {
  const semesterStudentEndpoint = (sem: number, sub: number) =>
    `/api/attendance/semester/subject?semester=${sem}&subject=${sub}`;
    
  return useQuery({
    queryKey: ["semesterStudent", sem],
    queryFn: async () => {
      return await httpClient.get(semesterStudentEndpoint(sem, sub));
    },
    select: (data) => data.data,
    enabled: !!sem && !!sub,
  });
};

export default getSemesterStudents;
