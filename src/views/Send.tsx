import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spacer,
} from "@nextui-org/react";
import { TbChevronDown, TbFile, TbFolder, TbUpload } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { Theme } from "../components/Settings";

interface SendProps {
  currentTheme: Theme;
}

function Send(props: SendProps) {
  const { t } = useTranslation();
  const { currentTheme } = props;

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-1">
      <TbUpload className="text-9xl text-foreground-500" />

      <Spacer y={4} />

      <span className="text-xl font-extrabold text-foreground">
        {t("sendView.description")}
      </span>
      <span className="text-sm font-light text-foreground-500">
        {t("sendView.instruction")}
      </span>

      <Spacer y={4} />

      <Dropdown
        className={`${currentTheme} text-foreground children:transition-none`}
      >
        <DropdownTrigger>
          <Button color="primary" endContent={<TbChevronDown />}>
            {t("sendView.selectButtonLabel")}
          </Button>
        </DropdownTrigger>

        <DropdownMenu aria-label={t("sendView.selectDropdownAriaLabel")}>
          <DropdownItem key="file" startContent={<TbFile />}>
            {t("sendView.selectFileLabel")}
          </DropdownItem>

          <DropdownItem key="folder" startContent={<TbFolder />}>
            {t("sendView.selectFolderLabel")}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default Send;
