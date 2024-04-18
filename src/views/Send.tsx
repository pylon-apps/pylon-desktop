import { Spacer } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { ReactNode, useState } from "react";
import { TbUpload } from "react-icons/tb";
import { open } from "@tauri-apps/api/dialog";
import * as bindings from "../bindings";
import Send_SelectView from "./Send_SelectView";
import Send_GenView from "./Send_GenView";
import Send_CodeView from "./Send_CodeView";

function Send() {
  const { t } = useTranslation();

  const getCode = async () => {
    // TODO: parameterize code length.
    try {
      const code = await bindings.genCode(2);
      console.log(code);
      setCurrentView(<Send_CodeView code={code} />);
    } catch (e) {
      console.error(e);
    }
  };

  const selectFileHandler = async () => {
    try {
      const selected = await open({
        title: "Select file",
        multiple: false,
      });

      if (selected !== null) {
        setCurrentView(<Send_GenView />);

        try {
          await getCode();
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  type Views = ReactNode;
  const [currentView, setCurrentView] = useState<Views>(
    <Send_SelectView selectFileHandler={selectFileHandler} />
  );

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-1">
      <TbUpload className="text-9xl text-foreground-500" />

      <Spacer y={4} />

      <span className="text-xl font-extrabold text-foreground">
        {t("sendView.description")}
      </span>

      {currentView}
    </div>
  );
}

export default Send;
