import { FC, ReactNode, createContext, useState } from "react";

type ContextType = {
  notes: string;
  setNotes: (notes: string) => void;
};

type ProviderType = FC<{ children: ReactNode }>;

export const ConfirmationContext = createContext<ContextType>({
  notes: "",
  setNotes: (notes) => {
    return notes;
  },
});

export const ConfirmationProvider: ProviderType = ({ children }) => {
  const [notes, setNotes] = useState<string>("");

  return (
    <ConfirmationContext.Provider value={{ notes, setNotes }}>
      {children}
    </ConfirmationContext.Provider>
  );
};
