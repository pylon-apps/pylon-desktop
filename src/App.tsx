import { Tabs, Tab, Button } from "@nextui-org/react";
import Send from "./views/Send";
import Receive from "./views/Receive";
import { TbDownload, TbUpload, TbSun, TbMoon } from "react-icons/tb";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bindings from "./bindings";

type Theme = "light" | "dark";
type ThemeIcon = ReactNode;

function App() {
  const { t } = useTranslation();

  const [theme, setTheme] = useState<Theme>("light");
  const [themeIcon, setThemeIcon] = useState<ThemeIcon>(<TbMoon />);

  const toggleTheme = function () {
    if (theme == "light") {
      setTheme("dark");
      setThemeIcon(<TbSun />);
    } else {
      setTheme("light");
      setThemeIcon(<TbMoon />);
    }
  };

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

        {/* TODO: make theme selection persistent */}
        {/* TODO: autodetect initial theme from system */}
        <Button
          isIconOnly
          disableRipple
          onClick={toggleTheme}
          className="absolute bottom-2 left-2"
          aria-label={t("app.themeToggleAriaLabel")}
        >
          {themeIcon}
        </Button>
      </div>
    </main>
  );
}

export default App;
