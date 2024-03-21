import RegisterForm from "./SignupForm";
import { SecurityProvider } from "../../contexts/SecurityContext";
import Layout from "../common/layout/Layout";
import { useParams } from "react-router-dom";

const Content = (props: { type: "signup" | "login" }) => {
  const { requestId } = useParams();
  return (
    <>
      <Layout
        header="LamaLab"
        content={
          <section className="flex justify-center">
            {requestId ? (
              <RegisterForm type={props.type} requestId={requestId} />
            ) : (
              <RegisterForm type={props.type} />
            )}
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
