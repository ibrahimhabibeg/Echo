import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../Navigators/Logged";
import useChatMessages from "./useChatMessages";
import { FlatList, Platform } from "react-native";
import Message from "./Message";
import SendMessage from "./SendMessageInput";
import KeyboardSpacer from "react-native-keyboard-spacer";

const Chat = ({
  route: {
    params: { userId },
  },
}: props) => {
  const { data, hasNextPage, isFetching, fetchNextPage, refetch } =
    useChatMessages(userId);

  return (
    <>
      <FlatList
        data={data ? data.pages.flat(1) : []}
        onEndReached={() => hasNextPage && !isFetching && fetchNextPage()}
        refreshing={isFetching}
        onRefresh={refetch}
        keyExtractor={(message) => message._id}
        renderItem={({ item }) => <Message {...item} />}
        inverted={true}
        ListHeaderComponent={<SendMessage to={userId} />}
        stickyHeaderIndices={[0]}
        invertStickyHeaders={false}
      />
      {Platform.OS === "ios" ? <KeyboardSpacer /> : <></>}
    </>
  );
};

type props = NativeStackScreenProps<NavigationParamList, "chat">;

export default Chat;
