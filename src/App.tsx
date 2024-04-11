import { Tabs, Tab, Button } from "@nextui-org/react";
import Send from "./views/Send";
import Receive from "./views/Receive";
import { TbDownload, TbUpload, TbSun, TbMoon } from "react-icons/tb";
import { ReactNode, useState } from "react";

type Theme = "light" | "dark";
type ThemeIcon = ReactNode;

function App() {
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

  return (
    <main className={`${theme} text-foreground bg-background`}>
      <div className="h-screen flex flex-wrap flex-col items-center p-2">
        <Tabs key="options" color="primary" radius="md" aria-label="Options">
          <Tab
            key="send"
            className="w-full h-5/6"
            title={
              <div className="flex items-center space-x-2">
                <TbUpload />
                <span>Send</span>
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
                <span>Receive</span>
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
          aria-label="Toggle theme"
        >
          {themeIcon}
        </Button>
      </div>
    </main>
  );
}

export default App;
