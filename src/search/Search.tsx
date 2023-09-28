import { Searchbar } from "react-native-paper";
import { useState } from "react";
import useSearchUsers from "./useSearchUsers";
import { FlatList } from "react-native";
import SearchElement from "./SearchElement";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../Navigators/Logged";

const Search = ({ navigation }: props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, hasNextPage, isFetching, fetchNextPage, refetch } =
    useSearchUsers(searchQuery);
  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <FlatList
      ListHeaderComponent={
        <Searchbar
          key={"search"}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ width: "80%", alignSelf: "center", marginTop: 20 }}
          autoFocus={true}
        />
      }
      keyboardShouldPersistTaps="handled"
      data={data ? data.pages.flat(1) : []}
      onEndReached={() => hasNextPage && !isFetching && fetchNextPage()}
      refreshing={isFetching}
      onRefresh={refetch}
      keyExtractor={(user) => user.username}
      renderItem={({ item }) => <SearchElement navigation={navigation} {...item} />}
      removeClippedSubviews={false}
    />
  );
};

type props = NativeStackScreenProps<NavigationParamList, "search">;

export default Search;
