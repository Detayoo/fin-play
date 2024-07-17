import { useQuery } from "@tanstack/react-query";

import { getUserAccountDetailsFn, getUserMainBalanceFn } from "@/services";
import { TokenType } from "@/types";

export const useBalance = ({ token }: { token: TokenType }) => {
  return useQuery({
    queryKey: ["user balance"],

    queryFn: () => getUserAccountDetailsFn({ token }),
    enabled: !!token,
  });
};
