import { createContext, FC, ReactNode, useEffect, useState } from "react";
import StatusFilter from "../models/filter/StatusFilter";
import HistoryLog from "../models/log/HistoryLog";
import RecordResponse from "../models/record/RecordResponse";
import getAllRecords from "../services/getAllRecords";
import RecordStatus from "../models/record/RecordStatus";
import SearchFilter from "../models/filter/SearchFilter";

type ContextType = {
  getRecords: () => RecordResponse[];
  getLogs: () => HistoryLog[];
  setSize: (size: number) => void;
  moveRight: () => void;
  moveLeft: () => void;
  search: (type: SearchFilter, querry: string) => void;
  filter: (status: StatusFilter) => void;
};

type ProviderType = FC<{ children: ReactNode }>;

export const HistoryContext = createContext<ContextType>({
  getRecords: () => [],
  getLogs: () => [],
  setSize: () => {},
  moveRight: () => {},
  moveLeft: () => {},
  search: () => {},
  filter: () => {},
});

export const HistoryProvider: ProviderType = ({ children }) => {
  const [records, setRecords] = useState<RecordResponse[]>([]);
  const [list, setList] = useState<RecordResponse[]>([]);
  const [size, setSize] = useState(0);
  const [pointer, setPointer] = useState(0);
  const [querry, setQuerry] = useState("");
  const [type, setType] = useState<"name" | "user">("name");
  const [status, setStatus] = useState<"all" | RecordStatus>("all");

  useEffect(() => {
    const getTaskList = async () => {
      const data = await getAllRecords();
      setRecords(data);
      setList(data);
    };
    getTaskList();
  }, []);

  // Navigation
  const moveRight = () => {
    if (pointer + size < records.length) {
      setPointer(pointer + size);
    }
  };

  const moveLeft = () => {
    if (pointer - size >= 0) {
      setPointer(pointer - size);
    }
  };

  // Getters
  const getRecords = () => {
    return apply(list).slice(pointer, pointer + size);
  };

  const getLogs = () => {
    const logs: HistoryLog[] = getRecords().map((record) => {
      return {
        id: record.id,
        status: record.status,
        name: record.name,
        executionDate: record.executionDate,
        deadline: record.deadline,
        assignee: record.assignee,
      };
    });

    return logs;
  };

  // Search & Filter
  const apply = (list: RecordResponse[]) => {
    return applyFilter(applySearch(list));
  };

  const applySearch = (list: RecordResponse[]) => {
    if (querry === "") {
      return list;
    }

    if (type === "user") {
      return list.filter((record) =>
        record.assignee.toLowerCase().includes(querry.toLowerCase())
      );
    } else {
      return list.filter((record) =>
        record.name.toLowerCase().includes(querry.toLowerCase())
      );
    }
  };

  const applyFilter = (list: RecordResponse[]) => {
    if (status === "all") {
      return list;
    } else {
      return list.filter((task) => task.status === status);
    }
  };

  const search = (newType: SearchFilter, newQuerry: string) => {
    setType(newType as "name" | "user");
    setQuerry(newQuerry);
  };

  const filter = (newStatus: StatusFilter) => {
    setStatus(newStatus as RecordStatus);
  };

  return (
    <HistoryContext.Provider
      value={{
        getRecords,
        getLogs,
        setSize,
        moveRight,
        moveLeft,
        search,
        filter,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
