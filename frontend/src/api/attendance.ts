// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import httpClient from "../apiService.js";

// const postAttendance = () => {
//   const attendanceEndPoint = "/api/attendance"; // end point change garna parcha

//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (attendance) => httpClient.post(attendanceEndPoint, attendance),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["attendance"],
//       });
//     },
//   });
// };

// export default postAttendance;
