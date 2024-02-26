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

// TEST DATA: TEMPORARY, WAITING FOR ENDPOINT
const getAllRecords: () => RecordResponse[] = () => {
  return [
    {
      id: 0,
      status: "Planned",
      name: "Test 0",
      executionDate: new Date(),
      deadline: new Date(),
      assignee: "Test",
    },
    {
      id: 1,
      status: "Planned",
      name: "Test 1",
      executionDate: new Date(),
      deadline: new Date(),
      assignee: "Test",
    },
    {
      id: 2,
      status: "Planned",
      name: "Test 2",
      executionDate: new Date(),
      deadline: new Date(),
      assignee: "Test",
    },
    {
      id: 3,
      status: "Planned",
      name: "Test 3",
      executionDate: new Date(),
      deadline: new Date(),
      assignee: "Test",
    },
    {
      id: 4,
      status: "Planned",
      name: "Test 4",
      executionDate: new Date(),
      deadline: new Date(),
      assignee: "Test",
    },
    {
      id: 5,
      status: "Planned",
      name: "Test 5",
      executionDate: new Date(),
      deadline: new Date(),
      assignee: "Test",
    },
    {
      id: 6,
      status: "Planned",
      name: "Test 6",
      executionDate: new Date(),
      deadline: new Date(),
      assignee: "Test",
    },
    {
      id: 7,
      status: "Planned",
      name: "Test 7",
      executionDate: new Date(),
      deadline: new Date(),
      assignee: "Test",
    },
    {
      id: 8,
      status: "Planned",
      name: "Test 8",
      executionDate: new Date(),
      deadline: new Date(),
      assignee: "Test",
    },
    {
      id: 9,
      status: "Planned",
      name: "Test 9",
      executionDate: new Date(),
      deadline: new Date(),
      assignee: "Test",
    },
    {
      id: 10,
      status: "Planned",
      name: "Test 10",
      executionDate: new Date(),
      deadline: new Date(),
      assignee: "Test",
    },
    {
      id: 11,
      status: "Planned",
      name: "Test 11",
      executionDate: new Date(),
      deadline: new Date(),
      assignee: "Test",
    },
    {
      id: 12,
      status: "Planned",
      name: "Test 12",
      executionDate: new Date(),
      deadline: new Date(),
      assignee: "Test",
    },
  ];
};

export default getAllRecords;
