import LogLabel from "./LogLabel";

const LogData = () => {
  return (
    <tr className="border-b border-gray-600">
      <td className="px-4 py-2">
        <LogLabel />
      </td>
      <td className="px-4 py-2">Lorem ipsum, dolor sit amet.</td>
      <td className="px-4 py-2">2024-02-25</td>
      <td className="px-4 py-2">2024-02-28</td>
      <td className="px-4 py-2">Alice</td>
    </tr>
  );
};

export default LogData;
