import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spacer,
} from "@nextui-org/react";
import { TbChevronDown, TbFile, TbFolder, TbUpload } from "react-icons/tb";

function Send() {
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-1">
      <TbUpload className="text-9xl text-foreground-500" />

      <Spacer y={4} />

      <span className="text-xl font-extrabold text-foreground">Send File</span>
      <span className="text-sm font-light text-foreground-500">
        Select the file or folder to send
      </span>

      <Spacer y={4} />

      <Dropdown>
        <DropdownTrigger>
          <Button color="primary" endContent={<TbChevronDown />}>
            Select
          </Button>
        </DropdownTrigger>

        <DropdownMenu aria-label="Select">
          <DropdownItem key="file" startContent={<TbFile />}>
            File
          </DropdownItem>
          <DropdownItem key="folder" startContent={<TbFolder />}>
            Folder
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default Send;
