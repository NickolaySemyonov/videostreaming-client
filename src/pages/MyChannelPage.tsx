import { MainLayout } from "../components/layouts/MainLayout";
import { ChannelDataSection } from "../components/layouts/ChannelDataSection";
import { useState } from "react";
import { CreateVideoForm } from "../components/forms/VideoCreateForm";

export const MyChannelPage = () => {
  const [createFormOpened, setCreateFromOpened] = useState<boolean>(false);

  return (
    <MainLayout>
      {createFormOpened && <CreateVideoForm />}
      <button onClick={() => setCreateFromOpened(!createFormOpened)}>
        {createFormOpened ? "Close" : "Load new video"}
      </button>

      <ChannelDataSection />
    </MainLayout>
  );
};
