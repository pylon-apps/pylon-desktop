import { Tabs, Tab } from "@nextui-org/react";
import Send from "./views/Send";
import Receive from "./views/Receive";

function App() {
  return (
    // TODO: add some padding in the viewport
    <div className="h-screen flex flex-wrap flex-col items-center">
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
