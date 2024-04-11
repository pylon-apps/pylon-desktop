import { Tabs, Tab } from "@nextui-org/react";
import Send from "./views/Send";
import Receive from "./views/Receive";
import { TbDownload, TbUpload } from "react-icons/tb";

function App() {
  return (
    <main className="text-foreground bg-background">
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
      </div>
    </main>
  );
}

export default App;
