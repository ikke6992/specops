// import RecordResponse from "../models/record/RecordResponse";
// import api from "./api-client";

import HistoryLog from "../models/log/HistoryLog";

// const getAllRecords = async () => {
//   try {
//     const response = await api.get("http://localhost:8080/history");
//     const data: RecordResponse[] = response.data;
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// TEST DATA: TEMPORARY, WAITING FOR ENDPOINT
const getAllRecords: () => HistoryLog[] = () => {
  return [
    {
      id: "0",
      status: "on time",
      name: "Test 0",
      executionDate: "",
      deadline: "",
      assignee: "Test",
    },
    {
      id: "1",
      status: "too late",
      name: "Test 1",
      executionDate: "",
      deadline: "",
      assignee: "Test",
    },
  ];
};

export default getAllRecords;
