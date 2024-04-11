import { Button, Input, Spacer } from "@nextui-org/react";
import { TbDownload } from "react-icons/tb";
import { useTranslation } from "react-i18next";

function Receive() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-1">
      <TbDownload className="text-9xl text-foreground-500" />

      <Spacer y={4} />

      <span className="text-xl font-extrabold text-foreground">
        {t("receiveView.description")}
      </span>
      <span className="text-sm font-light text-foreground-500">
        {t("receiveView.instruction")}
      </span>

      <Spacer y={4} />

      <div className="flex flex-row space-x-2 w-3/5">
        <Input
          label={t("receiveView.pylonCodeInputLabel")}
          size="sm"
          className="font-mono"
        />
        <Button color="primary" className="self-center">
          {t("receiveView.receiveButtonLabel")}
        </Button>
      </div>
    </div>
  );
}

export default Receive;
