import axios from "axios";
import getAllUsers from "./data/getAllUsers";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  employeeName: string;
}

const [users, setUsers] = useState<User[]>([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, []);

const App = () => {
  return (
    <>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>User: {user.username}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
