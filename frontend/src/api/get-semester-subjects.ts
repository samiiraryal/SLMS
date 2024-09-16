import { useQuery } from "@tanstack/react-query";
import httpClient from "./apiService.js";

const getSemesterSubjects = (semester: string) => {
  const semesterEndpoint = (semester: string) =>
    `/api/student/semester/${semester}/subjects`;

  return useQuery({
    queryKey: ["getSemesterSubjects"],
    queryFn: async () => {
      return await httpClient.get(semesterEndpoint(semester));
    },
    select: (data) => data.data,
    enabled: !!semester,
  });
};

export default getSemesterSubjects;
