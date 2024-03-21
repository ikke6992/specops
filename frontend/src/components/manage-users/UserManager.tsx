import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const UserContent = () => {
  const { getUsers, getDepartments, search } = useContext(UserContext);
  return (
    <UserContent
      getUsers={getUsers}
      getDepartments={getDepartments}
      search={search}
    />
  );
};

const UserManager = () => {
  return (
    <>
      <UserProvider>
        <UserContent />
      </UserProvider>
    </>
  );
};

export default UserManager;
