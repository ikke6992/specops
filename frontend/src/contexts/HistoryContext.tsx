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
  search: (type: SearchFilter, query: string) => void;
  filter: (status: StatusFilter) => void;
};

type ProviderType = FC<{ children: ReactNode }>;

export const HistoryContext = createContext<ContextType>({
  getRecords: () => [],
  getLogs: () => [],
  search: () => {},
  filter: () => {},
});

export const HistoryProvider: ProviderType = ({ children }) => {
  const [records, setRecords] = useState<RecordResponse[]>([]);
  const [query, setquery] = useState("");
  const [type, setType] = useState<"name" | "user">("name");
  const [status, setStatus] = useState<"all" | RecordStatus>("all");

  useEffect(() => {
    const getTaskList = async () => {
      const data = await getAllRecords();
      setRecords(data);
    };
    getTaskList();
  }, []);

  // Getters
  const getRecords = () => {
    return apply(records);
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
        notes: record.notes,
      };
    });

    return logs;
  };

  // Search & Filter
  const apply = (list: RecordResponse[]) => {
    return applyFilter(applySearch(list));
  };

  const applySearch = (list: RecordResponse[]) => {
    if (query === "") {
      return list;
    }

    if (type === "user") {
      return list.filter((record) =>
        record.assignee.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      return list.filter((record) =>
        record.name.toLowerCase().includes(query.toLowerCase())
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

  const search = (newType: SearchFilter, newquery: string) => {
    setType(newType as "name" | "user");
    setquery(newquery);
  };

  const filter = (newStatus: StatusFilter) => {
    setStatus(newStatus as RecordStatus);
  };

  return (
    <HistoryContext.Provider
      value={{
        getRecords,
        getLogs,
        search,
        filter,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
