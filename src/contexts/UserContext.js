import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [refreshUser, setRefreshUser] = useState(false);

  return (
    <UserContext.Provider value={{ refreshUser, setRefreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
