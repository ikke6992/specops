const SearchBar = () => {
  return (
    <div className="flex items-center">
      <select className="border border-gray-300 bg-blue-300 rounded px-2 py-2 text-black">
        <option value="option1">Name</option>
        <option value="option2">Dept</option>
        <option value="option3">Role</option>
      </select>
      <input
        type="text"
        className="border border-gray-300 bg-blue-200 rounded px-4 py-2 bg-transparent text-black"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
