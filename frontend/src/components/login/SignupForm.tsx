import { useContext, useEffect, useRef, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SecurityContext } from "../../contexts/SecurityContext";
import { useNavigate } from "react-router-dom";

const SignupForm = (props: { type: "signup" | "login" }) => {
  const {
    user,
    setUser,
    pwd,
    setPwd,
    matchPwd,
    setMatchPwd,
    errMsg,
    setErrMsg,
    success,
    handleAddUser,
  } = useContext(SecurityContext);

  const navigate = useNavigate();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{5,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}/;

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  useEffect(() => {
    if (success) {
      setTimeout(() => navigate("/tasks"), 1000);
    }
  }, [success]);

  return (
    <>
      <div className="bg-slate-200 rounded-md w-80 size-fit">
        <form onSubmit={(e) => handleAddUser(e, props.type)}>
          {/* Content Wrapper */}
          <div className="p-3 border-b border-gray-900/10 pb-12">
            <div className="">
              <p ref={errRef} className={errMsg ? "errmsg" : "hidden"}>
                {errMsg}
              </p>
            </div>

            <h2 className="font-semibold leading-7 text-xl text-gray-900 mb-5">
              Welcome
            </h2>

            {/* Input fields wrapper */}
            <div className="grid grid-col-1">
              <label htmlFor="username">
                Username:
                <span className={validName ? "ml-2 text-green-500" : "hidden"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    validName || !user ? "hidden" : "ml-2 text-red-500"
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? false : true}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className="rounded border border-gray-400 p-1 h-9"
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? "bg-black text-xs text-white rounded-lg p-2 mt-2 mb-1 "
                    : "hidden"
                }
              >
                <FontAwesomeIcon className="pr-1" icon={faInfoCircle} />
                6 to 24 characters. Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>

              <label htmlFor="password" className="mt-3">
                Password:
                <span className={validPwd ? "ml-2 text-green-500" : "hidden"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validPwd || !pwd ? "hidden" : "ml-2 text-red-500"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? false : true}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                className="rounded border border-gray-400 p-1 h-9"
              />
              <p
                id="pwd"
                className={
                  pwdFocus && !validPwd
                    ? "bg-black text-xs text-white rounded-lg p-2 mt-2"
                    : "hidden"
                }
              >
                <FontAwesomeIcon className="pr-1" icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include at least one uppercase character and a number.
              </p>
              {props.type === "signup" && (
                <>
                  {" "}
                  <label htmlFor="confirm_pwd" className="mt-3">
                    Confirm Password:
                    <span
                      className={
                        validMatch && matchPwd
                          ? "ml-2 text-green-500"
                          : "hidden"
                      }
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={
                        validMatch || !matchPwd ? "hidden" : "ml-2 text-red-500"
                      }
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? false : true}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    className="rounded border border-gray-400 p-1 h-9"
                  />
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch
                        ? "bg-black text-xs text-white rounded-lg p-2 mt-2"
                        : "hidden"
                    }
                  >
                    <FontAwesomeIcon className="pr-1" icon={faInfoCircle} />
                    Passwords do not match.
                  </p>
                </>
              )}
              <button
                disabled={
                  !validName ||
                  !validPwd ||
                  (props.type === "signup" && !validMatch)
                }
                className={
                  !validName || !validPwd || !validMatch
                    ? "bg-red-500/30 rounded mt-8 p-1 border-2 border-red-900"
                    : "bg-green-500/30 rounded mt-8 p-1 border-2 border-green-900"
                }
              >
                {props.type === "signup" ? "Signup" : "Login"}
              </button>
              <p className="text-center mt-4">
                {props.type === "login"
                  ? "No account yet? "
                  : "Already an account? "}
                <a
                  href={props.type === "login" ? "/signup" : "/login"}
                  className="font-bold underline hover:underline-offset-4"
                >
                  {props.type === "login" ? "Signup" : "Login"}
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
