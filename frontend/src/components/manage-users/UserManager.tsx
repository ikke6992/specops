import React, { useContext } from "react";

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
