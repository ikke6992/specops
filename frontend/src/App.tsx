import AddTask from "./components/addtask/AddTask";
import Modal from "./components/common/Modal";
import getAllUsers from "./data/services/getAllUsers";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  employeeName: string;
}

const App = () => {
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

  return (
    <>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>User: {user.username}</li>
          ))}
        </ul>
      </div>
      <Modal name="Add Task"/>
    </>
  );
};

export default App;
