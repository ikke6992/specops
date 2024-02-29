import { createContext, FC, ReactNode, useEffect, useState } from "react";
import getAllRecords from "../services/getAllRecords";
import HistoryLog from "../models/log/HistoryLog";

type ContextType = {
  getLogs: () => HistoryLog[];
  setSize: (size: number) => void;
  moveRight: () => void;
  moveLeft: () => void;
};

type ProviderType = FC<{ children: ReactNode }>;

export const HistoryContext = createContext<ContextType>({
  getLogs: () => [],
  setSize: () => {},
  moveRight: () => {},
  moveLeft: () => {},
});

export const HistoryProvider: ProviderType = ({ children }) => {
  const [records, setRecords] = useState<HistoryLog[]>([]);
  const [size, setSize] = useState(0);
  const [pointer, setPointer] = useState(0);

  useEffect(() => {
    // const getRecordList = async () => {
    //   const data = await getAllRecords();
    //   setRecords(data);
    // };
    const getRecordList = () => {
      const data = getAllRecords();
      setRecords(data);
    };
    getRecordList();
  }, []);

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

  const getLogs = () => {
    return records.slice(pointer, pointer + size);
  };

  return (
    <HistoryContext.Provider value={{ getLogs, setSize, moveRight, moveLeft }}>
      {children}
    </HistoryContext.Provider>
  );
};
