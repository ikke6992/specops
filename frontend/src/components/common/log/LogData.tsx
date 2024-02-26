import LogLabel from "./LogLabel";

const LogData = () => {
  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-2">
        <LogLabel />
      </td>
      <td className="px-4 py-2">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae ipsa
        amet veritatis assumenda at aut quis incidunt, quae quod architecto
        quibusdam facere nesciunt voluptatibus? Unde ut enim natus similique
        molestiae?
      </td>
      <td className="px-4 py-2">2024-02-25</td>
      <td className="px-4 py-2">2024-02-28</td>
      <td className="px-4 py-2">Alice</td>
    </tr>
  );
};

export default LogData;
