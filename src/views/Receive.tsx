import { Button, Input, Spacer } from "@nextui-org/react";
import { TbDownload } from "react-icons/tb";

function Receive() {
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-1">
      <TbDownload className="text-9xl text-foreground-500" />

      <Spacer y={4} />

      <span className="text-xl font-extrabold text-foreground">
        Receive File
      </span>
      <span className="text-sm font-light text-foreground-500">
        Enter the Pylon code to receive the file or folder from the sender
      </span>

      <Spacer y={4} />

      <div className="flex flex-row space-x-2 w-3/5">
        <Input label="Pylon Code" size="sm" className="font-mono" />
        <Button color="primary" className="self-center">
          Receive
        </Button>
      </div>
    </div>
  );
}

export default Receive;
