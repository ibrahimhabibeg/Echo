import { Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import UsernameInput from "./UsernameInput";

interface propsType {
  username: string;
  email: string;
  password: string;
  usernameError: string;
  emailError: string;
  passwordError: string;
  isLoading: boolean;
  navigateToLogin: () => void;
  onUsernameChange: (username: string) => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  submit: () => void;
}

const SignupView = (props: propsType) => (
  <View style={styles.container}>
    <Text variant="titleLarge" style={styles.title}>
      Signup
    </Text>
    <EmailInput
      value={props.email}
      error={props.emailError}
      onChangeText={props.onEmailChange}
    />
    <UsernameInput
      value={props.username}
      error={props.usernameError}
      onChangeText={props.onUsernameChange}
    />
    <PasswordInput
      value={props.password}
      error={props.passwordError}
      onChangeText={props.onPasswordChange}
    />
    <Button
      mode="contained"
      style={styles.button}
      loading={props.isLoading}
      onPress={props.submit}
    >
      Submit
    </Button>
    <View style={styles.linkContainer}>
      <Text>Already have an account?</Text>
      <Button onPress={props.navigateToLogin}>Login</Button>
    </View>
  </View>
);

export default SignupView;

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    width: "80%",
    alignSelf: "center",
    maxWidth: 500,
  },
  title: {
    marginBottom: "10%",
    alignSelf: "center",
  },
  button: {
    marginTop: "5%",
    marginBottom: "15%",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
