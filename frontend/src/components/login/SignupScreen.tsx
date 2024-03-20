import RegisterForm from "./SignupForm";
import { SecurityProvider } from "../../contexts/SecurityContext";
import Layout from "../common/layout/Layout";

const Content = (props: { type: "signup" | "login" }) => {
  return (
    <>
      <Layout
        header="LamaLab"
        content={
          <section className="flex justify-center">
            <RegisterForm type={props.type} />
          </section>
        }
        isLogin={true}
      />
    </>
  );
};

const SignupScreen = (props: { type: "signup" | "login" }) => {
  return (
    <SecurityProvider>
      <Content type={props.type} />
    </SecurityProvider>
  );
};

export default SignupScreen;
