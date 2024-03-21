import { FC, ReactNode, createContext, useState } from "react";
import { connect } from "../services/api-client";

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

  handleAddUser: (
    e: React.FormEvent<HTMLFormElement>,
    type: "signup" | "login",
    requestId?: string
  ) => void;
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

  const handleAddUser = async (
    e: React.FormEvent<HTMLFormElement>,
    type: "signup" | "login",
    requestId?: string
  ) => {
    e.preventDefault();

    let data;
    if (type === "login") {
      data = await connect(type, {
        username: user,
        password: pwd,
      });
    } else {
      data = await connect(
        type,
        {
          username: user,
          password: pwd,
        },
        requestId
      );
    }

    if (data.token !== "") {
      setSuccess(true);
    } else {
      setErrMsg(data.username);
    }

    return data;
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
