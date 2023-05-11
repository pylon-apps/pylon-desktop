import React, { createContext, useState } from "react";

// TODO: docstring
type AppContextType = {
  readonly codes: string[];
  addCode: (code: string) => void;
  deleteCode: (code: string) => void;
};

// TODO: docstring
export const AppContext = createContext<AppContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

// TODO: docstring
const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [codes, setCodes] = useState<string[]>([]);

  // TODO: docstring
  const addCode = (code: string) => {
    setCodes([code, ...codes]);
  };

  // TODO: docstring
  const deleteCode = (code: string) => {
    let array = Array.from(codes);
    let index = array.indexOf(code);
    if (index !== -1) {
      array.splice(index, 1);
      setCodes(array);
    }
  };

  return (
    <AppContext.Provider value={{ codes, addCode, deleteCode }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
