import ChatCard from "./ChatCard";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import useChatList from "./useChatList";
import { FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../Navigators/Logged";

const ChatsList = ({ navigation }: props) => {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, refetch } =
    useChatList();
  if (isLoading) return <ActivityIndicator animating={true} />;
  else if (data)
    return (
      <FlatList
        data={data.pages.flat(1)}
        onEndReached={() => hasNextPage && !isFetching && fetchNextPage()}
        refreshing={isFetching}
        onRefresh={refetch}
        keyExtractor={(chat) => chat._id}
        renderItem={({ item }) => (
          <ChatCard
            key={item._id}
            name={item._id}
            navigation={navigation}
            {...item}
          />
        )}
      />
    );
  else return <Text>Can't reach server now. Please, try again later.</Text>;
};

type props = NativeStackScreenProps<NavigationParamList, "chatsList">;

export default ChatsList;
