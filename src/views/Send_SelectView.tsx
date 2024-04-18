import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spacer,
} from "@nextui-org/react";
import { TbChevronDown, TbFile, TbFolder } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { Key } from "react";

interface Send_SelectViewProps {
  selectFileHandler: () => void;
}

function Send_SelectView(props: Send_SelectViewProps) {
  const { t } = useTranslation();
  const { selectFileHandler } = props;

  const handler = (key: Key) => {
    switch (key) {
      case "file":
        selectFileHandler();
        break;
      case "folder":
        return;
    }
  };

  return (
    <>
      <span className="text-sm font-light text-foreground-500">
        {t("sendSelectView.instruction")}
      </span>

      <Spacer y={4} />

      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button color="primary" endContent={<TbChevronDown />}>
            {t("sendSelectView.selectButtonLabel")}
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          disabledKeys={["folder"]}
          onAction={handler}
          aria-label={t("sendSelectView.selectDropdownAriaLabel")}
        >
          <DropdownItem key="file" startContent={<TbFile />}>
            {t("sendSelectView.selectFileLabel")}
          </DropdownItem>

          <DropdownItem
            key="folder"
            startContent={<TbFolder />}
            description={t("sendSelectView.selectFolderDescription")}
          >
            {t("sendSelectView.selectFolderLabel")}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default Send_SelectView;
