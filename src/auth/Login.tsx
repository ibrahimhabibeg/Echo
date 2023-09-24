import { useContext, useState } from "react";
import { ParamList } from "../Navigators/NotLogged";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthContext } from "../providers/Auth";
import { useMutation } from "@tanstack/react-query";
import { loginReq, loginRes } from "../types";
import LoginView from "./LoginView";

type propsType = NativeStackScreenProps<ParamList, "login">;

const sendLoginToBackend = async (reqData: loginReq): Promise<loginRes> => {
  const response: Response = await fetch(
    `${process.env.EXPO_PUBLIC_USER_SERVICE_URL}/login`,
    {
      method: "POST",
      body: JSON.stringify(reqData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return await response.json();
};

const Login = ({ navigation }: propsType) => {
  const auth = useContext(AuthContext);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const onMutationFinish = ({ token, message, field }: loginRes) => {    
    if (token) return auth.login(token);
    setErrors((oldVal) => ({ ...oldVal, [field]: message }));
  };

  const { isLoading, mutate: login } = useMutation(sendLoginToBackend, {
    onSuccess: onMutationFinish,
  });

  const emailChangeTextHandler = (email: string) => {
    setLoginData((oldSignupData) => ({ ...oldSignupData, email }));
    setErrors((oldVal) => ({ ...oldVal, email: "" }));
  };

  const passwordChangeTextHandler = (password: string) => {
    setLoginData((oldSignupData) => ({ ...oldSignupData, password }));
    setErrors((oldVal) => ({ ...oldVal, password: "" }));
  };

  const navigateToSignup = () => navigation.navigate("signup");

  const submit = () => login(loginData);

  return (
    <LoginView
      email={loginData.email}
      password={loginData.password}
      emailError={errors.email}
      passwordError={errors.password}
      submit={submit}
      navigateToSignup={navigateToSignup}
      onEmailChange={emailChangeTextHandler}
      onPasswordChange={passwordChangeTextHandler}
      isLoading={isLoading}
    />
  );
};

export default Login;
