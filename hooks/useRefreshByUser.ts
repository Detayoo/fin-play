import { useState } from "react";

export const useRefreshByUser = <T>(refetch: () => Promise<T>) => {
  const [isRefetchingByUser, setIsRefetchingByUser] = useState(false);

  function refetchByUser() {
    setIsRefetchingByUser(true);

    try {
      refetch();
    } finally {
      setIsRefetchingByUser(false);
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser,
  };
};
