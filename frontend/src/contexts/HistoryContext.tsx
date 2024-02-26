import { createContext, FC, ReactNode, useEffect, useState } from "react";
import RecordResponse from "../models/record/RecordResponse";
import getAllRecords from "../services/getAllRecords";

type ContextType = {
  getRecords: () => RecordResponse[];
  setSize: (size: number) => void;
  moveRight: () => void;
  moveLeft: () => void;
};

type ProviderType = FC<{ children: ReactNode }>;

export const HistoryContext = createContext<ContextType>({
  getRecords: () => [],
  setSize: () => {},
  moveRight: () => {},
  moveLeft: () => {},
});

export const HistoryProvider: ProviderType = ({ children }) => {
  const [records, setRecords] = useState<RecordResponse[]>([]);
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

  const getRecords = () => {
    return records.slice(pointer, pointer + size);
  };

  return (
    <HistoryContext.Provider
      value={{ getRecords, setSize, moveRight, moveLeft }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
