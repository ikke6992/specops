import React, { useContext, useEffect, useRef, useState } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/";
import { SecurityContext } from "../../contexts/SecurityContext";

const RegisterForm = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef();

  const {
    user,
    setUser,
    pwd,
    setPwd,
    matchPwd,
    setMatchPwd,
    errMsg,
    setErrMsg,
  } = useContext(SecurityContext);

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{5,23}&/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}/;

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  return <div></div>;
};

export default RegisterForm;
