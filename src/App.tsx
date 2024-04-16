import { Tabs, Tab } from "@nextui-org/react";
import Send from "./views/Send";
import Receive from "./views/Receive";
import Settings, { Theme, ThemeChoice, Lang } from "./components/Settings";
import { TbDownload, TbUpload } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bindings from "./bindings";

function App() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<Theme>("light");
  const [themeChoice, setThemeChoice] = useState<ThemeChoice>("system");
  const [lang, setLang] = useState<Lang>("en");

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

    // Set initial language.
    // TODO: set initial language based on detected locale, rather than force-setting English.
    i18n.changeLanguage(lang);

    // Set initial theme.
    if (themeChoice == "system") {
      setTheme(detectSystemTheme());
    }
  }, []);

  const detectSystemTheme = function (): Theme {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    } else {
      return "light";
    }
  };

  const onThemeChange = function (theme: React.ChangeEvent<HTMLSelectElement>) {
    if (theme.target.value == "system") {
      setTheme(detectSystemTheme());
    } else {
      setTheme(theme.target.value as Theme);
    }

    setThemeChoice(theme.target.value as Theme);
  };

  const onLangChange = function (lang: React.ChangeEvent<HTMLSelectElement>) {
    i18n.changeLanguage(lang.target.value);
    setLang(lang.target.value as Lang);
  };

  return (
    <main className={`${theme} text-foreground bg-background`}>
      <div className="h-screen flex flex-wrap flex-col items-center p-2">
        <Tabs
          key="options"
          color="primary"
          radius="md"
          aria-label={t("main.tabsAriaLabel")}
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
                <span>{t("main.sendTabLabel")}</span>
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
                <span>{t("main.receiveTabLabel")}</span>
              </div>
            }
          >
            <Receive />
          </Tab>
        </Tabs>

        <Settings
          defaultTheme={themeChoice}
          onThemeChange={onThemeChange}
          defaultLang={lang}
          onLangChange={onLangChange}
        />
      </div>
    </main>
  );
}

export default App;
