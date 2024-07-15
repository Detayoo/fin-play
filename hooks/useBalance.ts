import { useQuery } from "@tanstack/react-query";

import { getUserMainBalanceFn } from "@/services";
import { TokenType } from "@/types";

export const useBalance = ({ token }: { token: TokenType }) => {
  return useQuery({
    queryKey: ["user balance"],
    queryFn: () =>
      getUserMainBalanceFn({
        token,
      }),
    enabled: !!token,
  });
};
