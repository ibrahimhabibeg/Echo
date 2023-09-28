import { useContext } from "react";
import { AuthContext } from "../providers/Auth";
import { useInfiniteQuery } from "@tanstack/react-query";

const useSearchUsers = (username: string) => {
  const { token } = useContext(AuthContext);
  const query = useInfiniteQuery({
    queryKey: ["search", username],
    queryFn: async ({ pageParam }): Promise<userType[]> => {      
      const cursorString =
        typeof pageParam === "undefined" ? "" : "cursor=" + pageParam;
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_USER_SERVICE_URL}/search?username=${username}&${cursorString}`,
        { headers: { authorization: token } }
      );      
      if (!response.ok)
        throw new Error("Can't reach server now. Please, try again later.");
      const res = await response.json();
      return res.users;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) return undefined;
      else return lastPage[lastPage.length - 1].username;
    },
  });
  return query;
};

export default useSearchUsers;

interface userType {
  username: string;
}
