import { Tabs, Tab } from "@nextui-org/react";
import Send from "./views/Send";
import Receive from "./views/Receive";

function App() {
  return (
    <div className="h-screen flex flex-wrap flex-col items-center p-2">
      {/* TODO: add icons to tabs */}
      <Tabs key="options" color="primary" radius="md" aria-label="Options">
        <Tab key="send" title="Send" className="w-full h-5/6">
          <Send />
        </Tab>
        <Tab key="receive" title="Receive" className="w-full h-5/6">
          <Receive />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
