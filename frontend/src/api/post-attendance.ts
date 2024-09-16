import { useMutation } from "@tanstack/react-query";
import httpClient from "./apiService.js";

const addAttendanceEndPoint = "/api/attendance/add";
const addReportEndPoint = "/api/report/add";
const addNoteEndPoint = "/api/note/add";

const useAttendance = async ({ data }: { data: any }) => {

    const [attendanceResponse, reportResponse, noteResponse] = await Promise.all([
        httpClient.post(addAttendanceEndPoint, data),
        httpClient.post(addReportEndPoint, data),
        httpClient.post(addNoteEndPoint, data),
      ]);
      
      return { attendanceResponse, reportResponse, noteResponse };
};

const PostAttendance = () => {
    return useMutation({
        mutationKey: ["addAttendance"],
        mutationFn: useAttendance,
        onSuccess: (res) => {
          console.log("Attendance Response:", res.attendanceResponse);
          console.log("Report Response:", res.reportResponse);
          console.log("Note Response:", res.noteResponse);
        },
      });
};
export default PostAttendance;
