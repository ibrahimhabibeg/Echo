import { useContext, useState } from "react";
import { ParamList } from "../Navigators/NotLogged";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthContext } from "../providers/Auth";
import { useMutation } from "@tanstack/react-query";
import { signupReq, authRes } from "../types";
import SignupView from "./SignupView";

type propsType = NativeStackScreenProps<ParamList, "signup">;

const sendSignupToBackend = async (reqData: signupReq): Promise<authRes> => {
  const response: Response = await fetch(
    `${process.env.EXPO_PUBLIC_USER_SERVICE_URL}/signup`,
    {
      method: "POST",
      body: JSON.stringify(reqData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return await response.json();
};

const Signup = ({ navigation }: propsType) => {
  const auth = useContext(AuthContext);

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onMutationFinish = ({ token, message, field }: authRes) => {    
    if (token) return auth.login(token);
    setErrors((oldVal) => ({ ...oldVal, [field]: message }));
  };

  const { isLoading, mutate: signup } = useMutation(sendSignupToBackend, {
    onSuccess: onMutationFinish,
  });

  const fieldChangeTextHandler =
    (field: "username" | "password" | "email") => (val: string) => {
      setSignupData((oldVal) => ({ ...oldVal, [field]: val }));
      setErrors((oldVal) => ({ ...oldVal, [field]: "" }));
    };

  const navigateToLogin = () => navigation.navigate("login");

  const submit = () => signup(signupData);

  return (
    <SignupView
      username={signupData.username}
      email={signupData.email}
      password={signupData.password}
      usernameError={errors.username}
      emailError={errors.email}
      passwordError={errors.password}
      submit={submit}
      navigateToLogin={navigateToLogin}
      onUsernameChange={fieldChangeTextHandler("username")}
      onEmailChange={fieldChangeTextHandler("email")}
      onPasswordChange={fieldChangeTextHandler("password")}
      isLoading={isLoading}
    />
  );
};

export default Signup;
