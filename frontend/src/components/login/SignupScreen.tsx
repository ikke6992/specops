import RegisterForm from "./SignupForm";
import {
  SecurityContext,
  SecurityProvider,
} from "../../contexts/SecurityContext";

interface Props {}

const Content = () => {
  return (
    <main className="h-screen">
      <section
        className="bg-slate-500 flex flex-row justify-center items-center"
        style={{ height: "20%" }}
      >
        <h1 className="text-3xl text-slate-950 font-black uppercase">
          Welcome to LamaLab
        </h1>
      </section>
      <section
        className="p-8 bg-gray-400 flex justify-center"
        style={{
          height: "70%",
        }}
      >
        <RegisterForm />
      </section>
      <section
        className="bg-zinc-700 grid grid-cols-3 grid-rows-1 p-2"
        style={{ height: "10%" }}
      ></section>
      {/* Show create task menu if needed */}
    </main>
  );
};

const SignupScreen = () => {
  return (
    <SecurityProvider>
      <Content />
    </SecurityProvider>
  );
};

export default SignupScreen;
