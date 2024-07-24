import { useQuery } from "@tanstack/react-query";

import { getUserAccountDetailsFn } from "@/services";
import { TokenType } from "@/types";

export const useBalance = ({ token }: { token: TokenType }) => {
  return useQuery({
    queryKey: ["user account details"],

    queryFn: () => getUserAccountDetailsFn({ token }),
    enabled: !!token,
  });
};
