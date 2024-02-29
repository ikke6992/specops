import { FC, ReactNode, createContext, useEffect, useState } from "react";

type ContextType = {
  userRef: () => void;
  errRef: () => void;
};

type ProviderType = FC<{ children: ReactNode }>;

export const LoginContext = createContext<ContextType>({
  userRef: () => {},
  errRef: () => {},
});

export const LoginProvider: ProviderType = {( children )} => {
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  useEffect(() => {
    
  
    return () => {
      
    };
  }, []);

  const userRef = () => {};
  
  const errRef = () => {};
  
  return (
    <LoginContext.Provider
    value={{userRef, errRef}}>
      {children}
    </LoginContext.Provider>
  );
};