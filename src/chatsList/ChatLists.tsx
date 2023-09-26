import ChatCard from "./ChatCard";
import { ActivityIndicator, Text } from "react-native-paper";
import useChatList from "./useChatList";
import { FlatList } from "react-native";

const ChatsList = () => {
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
          <ChatCard key={item._id} name={item._id} {...item} />
        )}
      />
    );
  else return <Text>Can't reach server now. Please, try again later.</Text>;
};

export default ChatsList;
