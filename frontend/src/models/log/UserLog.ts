export default interface UserLog {
  id: string;
  name: string;
  role: "analyst" | "team manager" | "manager";
  department: string;
}
