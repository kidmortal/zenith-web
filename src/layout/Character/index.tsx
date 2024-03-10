import { Outlet } from "react-router-dom";

import { useMainStore } from "@/store/main";
import { useQuery } from "@tanstack/react-query";

import { Query } from "@/store/query";
import { FullscreenLoading } from "@/components/FullscreenLoading";
import { CharacterSummaryHeader } from "@/components/CharacterSummaryHeader";
import { useEffect } from "react";
import { CharacterCreationPage } from "@/pages/characterCreation";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useWebsocketApi } from "@/api/websocketServer";
import { FloatingNavBar } from "@/components/FloatingNavBar";
import styles from "./style.module.scss";

export function CharacterLayout() {
  const store = useMainStore();
  const api = useWebsocketApi();

  const characterQuery = useQuery({
    queryKey: [Query.USER_CHARACTER],
    enabled: !!store.websocket && !!store.loggedUserInfo.accessToken,
    staleTime: 1000 * 2,
    retry: 3,
    queryFn: () => api.users.getUser(),
  });

  useEffect(() => {
    if (characterQuery?.data) {
      store.setUserCharacterData(characterQuery?.data);
    }
  }, [characterQuery?.data]);

  if (characterQuery.isLoading) {
    return <FullscreenLoading />;
  }
  if (characterQuery.isError) {
    return <ErrorMessage message={characterQuery.error.message} />;
  }
  if (characterQuery.isFetched && !characterQuery.data) {
    return <CharacterCreationPage />;
  }

  return (
    <div className={styles.container}>
      <CharacterSummaryHeader />
      <Outlet />
      <FloatingNavBar />
    </div>
  );
}
