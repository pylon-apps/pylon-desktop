import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Snippet,
  Spacer,
  Spinner,
} from "@nextui-org/react";
import { TbChevronDown, TbFile, TbFolder, TbUpload } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { ReactNode, useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import * as bindings from "../bindings";

function Send() {
  const { t } = useTranslation();
  const [pylonCode, setPylonCode] = useState<string>();

  const getCode = async () => {
    // TODO: parameterize code length.
    try {
      const code = await bindings.genCode(2);
      console.log(code);
      setPylonCode(code);
      setCurrentView(codeView);
    } catch (e) {
      console.error(e);
    }
  };

  const selectFile = async () => {
    try {
      const selected = await open({
        title: "Select file",
        multiple: false,
      });

      if (selected !== null) {
        setCurrentView(genView);

        try {
          await getCode();
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const selectView = (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button color="primary" endContent={<TbChevronDown />}>
          {t("sendView.selectButtonLabel")}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        disabledKeys={["folder"]}
        aria-label={t("sendView.selectDropdownAriaLabel")}
      >
        <DropdownItem key="file" startContent={<TbFile />} onPress={selectFile}>
          {t("sendView.selectFileLabel")}
        </DropdownItem>

        <DropdownItem
          key="folder"
          startContent={<TbFolder />}
          description={t("sendView.selectFolderDescription")}
        >
          {t("sendView.selectFolderLabel")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  const genView = (
    <Card
      shadow="none"
      className="bg-background/60 dark:bg-default-100/50 w-3/5"
    >
      {/* TODO: add header with file information */}

      <CardBody className="flex flex-col justify-center items-center">
        <Spinner label={t("sendView.spinnerLabel")} color="primary" size="sm" />
      </CardBody>

      <CardFooter className="flex flex-col">
        <Button color="danger" variant="flat" className="self-center">
          {t("sendView.cancelButtonLabel")}
        </Button>
      </CardFooter>
    </Card>
  );

  const codeView = (
    <Card
      shadow="none"
      className="bg-background/60 dark:bg-default-100/50 w-3/5"
    >
      {/* TODO: add header with file information */}

      <CardBody className="flex flex-col justify-center items-center">
        <Snippet symbol="" color="success" variant="flat">
          {/* FIXME: the code doesn't display, although its value gets logged to the console */}
          {pylonCode}
        </Snippet>
      </CardBody>

      <CardFooter className="flex flex-col">
        <Button color="danger" variant="flat" className="self-center">
          {t("sendView.cancelButtonLabel")}
        </Button>
      </CardFooter>
    </Card>
  );

  // FIXME: content in subviews aren't translated instantly when new language is selected.
  type Views = ReactNode;
  const [currentView, setCurrentView] = useState<Views>(selectView);

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

      {currentView}
    </div>
  );
}

export default Send;
