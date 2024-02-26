// import RecordResponse from "../models/record/RecordResponse";
// import api from "./api-client";

import RecordResponse from "../models/record/RecordResponse";

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

const getAllRecords: () => RecordResponse[] = () => {
  return [
    {
      id: 0,
      status: "Planned",
      name: "Test",
      executionDate: new Date(),
      deadline: new Date(),
      assignee: "Test",
    },
  ];
};

export default getAllRecords;
