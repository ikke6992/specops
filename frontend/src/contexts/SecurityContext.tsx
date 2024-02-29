import { FC, ReactNode, createContext, useState } from "react";

type ContextType = {
  user: string;
  setUser: (name: string) => void;

  pwd: string;
  setPwd: (name: string) => void;

  matchPwd: string;
  setMatchPwd: (name: string) => void;

  errMsg: string;
  setErrMsg: (error: string) => void;
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
});

export const SecurityProvider: ProviderType = ({ children }) => {
  const [user, setUser] = useState("");

  const [pwd, setPwd] = useState("");

  const [matchPwd, setMatchPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};
