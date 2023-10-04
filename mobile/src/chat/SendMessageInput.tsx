import { TextInput } from "react-native-paper";
import { View } from "react-native";
import { useContext, useState } from "react";
import { ThemeContext } from "../providers/Theme";
import { SocketContext } from "../providers/SocketProvider";

const SendMessageInput = ({ to }: propsType) => {
  const [message, setMessage] = useState("");
  const { theme } = useContext(ThemeContext);
  const { socket } = useContext(SocketContext);

  return (
    <View>
      <TextInput
        value={message}
        onChangeText={(newVal) => setMessage(newVal)}
        style={{
          marginBottom: -1,
        }}
        right={
          <TextInput.Icon
            forceTextInputFocus={false}
            icon={"send"}
            onPress={() => {
              socket.emit("sendMessage", { message, to });
            }}
            color={theme.colors.primary}
            pressRetentionOffset={200}
          />
        }
      />
    </View>
  );
};
export default SendMessageInput;

type propsType = {
  to: string;
};
