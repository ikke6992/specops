import { FC, ReactNode, createContext, useState } from "react";
import api from "../services/api-client";
import axios from "axios";

type ContextType = {
  user: string;
  setUser: (name: string) => void;

  pwd: string;
  setPwd: (name: string) => void;

  matchPwd: string;
  setMatchPwd: (name: string) => void;

  errMsg: string;
  setErrMsg: (error: string) => void;

  success: boolean;
  setSuccess: (boolean: boolean) => void;

  handleAddUser: (e: React.FormEvent<HTMLFormElement>) => void;
};

type ProviderType = FC<{ children: ReactNode }>;

export const SecurityContext = createContext<ContextType>({
  user: "",
  setUser: () => {},

  pwd: "",
  setPwd: () => {},

  matchPwd: "",
  setMatchPwd: () => {},

  errMsg: "",
  setErrMsg: () => {},

  success: false,
  setSuccess: () => {},

  handleAddUser: () => {},
});

export const SecurityProvider: ProviderType = ({ children }) => {
  const [user, setUser] = useState("");

  const [pwd, setPwd] = useState("");

  const [matchPwd, setMatchPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const [success, setSuccess] = useState(false);

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post()
    } catch (err) {

    }
  };

  return (
    <SecurityContext.Provider
      value={{
        user,
        setUser,
        pwd,
        setPwd,
        matchPwd,
        setMatchPwd,
        errMsg,
        setErrMsg,
        success,
        setSuccess,
        handleAddUser,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};
