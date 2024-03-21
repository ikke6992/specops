import { useState } from "react";
import SearchFilter from "../../../models/filter/SearchFilter";

type SearchProps = {
  search: (type: SearchFilter, query: string) => void;
  isHistory: boolean;
};
const SearchBar = ({ search, isHistory }: SearchProps) => {
  const [type, setType] = useState("name");
  const [query, setquery] = useState("");

  return (
    <div className="flex">
      <select
        className="w-36 h-10 bg-white px-4 text-black outline-none text-left"
        onChange={(e) => {
          setquery("");
          setType(e.target.value);
        }}
      >
        <option value="name">Task Name</option>
        <option value={isHistory ? "user" : "dept"}>
          {isHistory ? "User Name" : "Department"}
        </option>
        {/* <option value="option3">Role</option> */}
      </select>
      <input
        onChange={(e) => {
          setquery(e.target.value);
          search(
            type === "name" ? "name" : isHistory ? "user" : "dept",
            e.target.value
          );
        }}
        value={query}
        type="text"
        className="h-10 bg-white ml-2 px-3 text-black outline-none"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
