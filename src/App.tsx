import { Tabs, Tab } from "@nextui-org/react";
import Send from "./views/Send";
import Receive from "./views/Receive";
import Settings from "./components/Settings";
import { TbDownload, TbUpload } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bindings from "./bindings";

type Theme = "light" | "dark";

function App() {
  const { t } = useTranslation();
  const [theme] = useState<Theme>("light");

  // Bootstrap stuff for when our app launches.
  useEffect(() => {
    // If running in release mode, disable the right-click context menu.
    bindings.isReleaseMode().then((yes: boolean) => {
      if (yes) {
        document.addEventListener("contextmenu", (ev: MouseEvent) => {
          ev.preventDefault();
        });
      }
    });
  }, []);

  return (
    <main className={`${theme} text-foreground bg-background`}>
      <div className="h-screen flex flex-wrap flex-col items-center p-2">
        <Tabs
          key="options"
          color="primary"
          radius="md"
          aria-label={t("app.tabsAriaLabel")}
          classNames={{
            tabContent: "children:transition-none",
          }}
        >
          <Tab
            key="send"
            className="w-full h-5/6"
            title={
              <div className="flex items-center space-x-2">
                <TbUpload />
                <span>{t("app.sendTabLabel")}</span>
              </div>
            }
          >
            <Send />
          </Tab>

          <Tab
            key="receive"
            className="w-full h-5/6"
            title={
              <div className="flex items-center space-x-2">
                <TbDownload />
                <span>{t("app.receiveTabLabel")}</span>
              </div>
            }
          >
            <Receive />
          </Tab>
        </Tabs>

        <Settings />
      </div>
    </main>
  );
}

export default App;
