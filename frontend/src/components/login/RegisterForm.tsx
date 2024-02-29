import React, { useContext, useRef, useState } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/";
import { SecurityContext } from "../../contexts/SecurityContext";

interface Props {
  useRef: () => void;
}

const RegisterForm = () => {
  const userRef = useRef();
  const errRef = useRef();

  const user = useContext(SecurityContext);
  const validName = useContext(SecurityContext);
  const userFocus = useContext(SecurityContext);

  return <div></div>;
};

export default RegisterForm;
