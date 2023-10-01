import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../Navigators/Logged";
import useChatMessages from "./useChatMessages";
import { FlatList } from "react-native";
import { Text } from "react-native-paper";
import { useEffect } from "react";

const Chat = ({
  route: {
    params: { userId },
  },
}: props) => {
  const { data, hasNextPage, isFetching, fetchNextPage, refetch } =
    useChatMessages(userId);
  useEffect(()=>{
    console.log(data);
    
  },[data])
  return (
    <FlatList
      data={data ? data.pages.flat(1) : []}
      onEndReached={() => hasNextPage && !isFetching && fetchNextPage()}
      refreshing={isFetching}
      onRefresh={refetch}
      keyExtractor={(message) => message._id}
      renderItem={({ item }) => <Text>{item.message}</Text>}
    />
  );
};

type props = NativeStackScreenProps<NavigationParamList, "chat">;

export default Chat;
