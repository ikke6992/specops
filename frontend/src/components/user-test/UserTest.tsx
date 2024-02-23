import { useEffect, useState } from "react";
import getAllUsers from "../../data/services/getAllUsers";

interface User {
  id: string;
  username: string;
  employeeName: string;
}

const UserTest = () => {
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
    </>
  );
};

export default UserTest;
