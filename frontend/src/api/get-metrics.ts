import { useQuery } from "@tanstack/react-query";
import httpClient from "./apiService.js";

export interface ComputerConditionProps {
  client_id: string;
  cpu: number;
  gpu: number;
  hostname: string;
  network: number;
  ram: number;
  recent_high_usage_duration: number;
  total_high_usage_duration: number;
  uptime: number;
  usage_score: number;
  storage: Storage;
  high_usage: number;
  maintenance_needed: number;
  moderate: number;
  running_good: number;
  result: string;
  confidence: number;
  timestamp: string;
}

export interface Storage {
  free: number;
  percent: number;
  total: number;
  used: number;
}

const getComputerCondition = () => {
  const semesterStudentEndpoint = `/get-metrics`;

  return useQuery({
    queryKey: ["getComputerCondition"],
    queryFn: async () => {
      return await httpClient.get<{ data: ComputerConditionProps[] }>(
        semesterStudentEndpoint
      );
    },
    select: (data) => data.data.data,
  });
};

export default getComputerCondition;
