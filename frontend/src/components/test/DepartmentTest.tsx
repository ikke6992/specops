import { useEffect, useState } from "react";
import getAll from "../../services/getAll";

interface Department {
  id: string;
  name: string;
}

const DepartmentTest = () => {
  const [department, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAll("departments");
        setDepartments(data);
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
          {department.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DepartmentTest;
