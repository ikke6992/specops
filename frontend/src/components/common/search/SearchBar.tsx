import { useState } from "react";
import SearchFilter from "../../../models/filter/SearchFilter";

type SearchProps = {
  search: (type: SearchFilter, querry: string) => void;
  isHistory: boolean;
};
const SearchBar = ({ search, isHistory }: SearchProps) => {
  const [type, setType] = useState("name");
  const [querry, setQuerry] = useState("");

  return (
    <div className="flex items-center">
      <select
        className="border border-gray-300 bg-blue-300 rounded px-2 py-2 text-black"
        onChange={(e) => {
          setQuerry("");
          setType(e.target.value);
        }}
      >
        <option value="name">Name</option>
        <option value={isHistory ? "user" : "dept"}>
          {isHistory ? "User" : "Dept"}
        </option>
        {/* <option value="option3">Role</option> */}
      </select>
      <input
        onChange={(e) => {
          setQuerry(e.target.value);
          search(
            type === "name" ? "name" : isHistory ? "user" : "dept",
            e.target.value
          );
        }}
        value={querry}
        type="text"
        className="border border-gray-300 bg-blue-200 rounded px-4 py-2 bg-transparent text-black"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
