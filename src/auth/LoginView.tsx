import { Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

interface propsType {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  isLoading: boolean;
  navigateToSignup: () => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  submit: () => void;
}

const LoginView = (props: propsType) => (
  <View style={styles.container}>
    <Text variant="titleLarge" style={styles.title}>
      Login
    </Text>
    <EmailInput
      value={props.email}
      error={props.emailError}
      onChangeText={props.onEmailChange}
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
      <Text>Create new account?</Text>
      <Button onPress={props.navigateToSignup}>Signup</Button>
    </View>
  </View>
);

export default LoginView;

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
