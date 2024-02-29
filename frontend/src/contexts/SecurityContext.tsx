import { FC, ReactNode, createContext, useEffect, useState } from "react";

type ContextType = {
  userRef: () => void;
  errRef: () => void;
  user: string;
  setUser: (name: string) => void;
  validName: boolean;
  setValidName: (arg: boolean) => void;
  userFocus: boolean;
  setUserFocus: (arg: boolean) => void;
  USER_REGEX: RegExp;
  PWD_REGEX: RegExp;
};

type ProviderType = FC<{ children: ReactNode }>;

export const SecurityContext = createContext<ContextType>({
  userRef: () => {},
  errRef: () => {},
  user: "",
  setUser: () => {},
  validName: false,
  setValidName: () => {},
  userFocus: false,
  setUserFocus: () => {},
  USER_REGEX: /.*/,
  PWD_REGEX: /.*/,
});

export const SecurityProvider: ProviderType = ({ children }) => {
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{5,23}&/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}/;

  useEffect(() => {
    return () => {};
  }, []);

  const userRef = () => {};

  const errRef = () => {};

  return (
    <SecurityContext.Provider
      value={{
        userRef,
        errRef,
        user,
        setUser,
        validName,
        setValidName,
        userFocus,
        setUserFocus,
        USER_REGEX,
        PWD_REGEX,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};
