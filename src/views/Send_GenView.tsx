import { Button, Card, CardBody, CardFooter, Spinner } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

function Send_GenvView() {
  const { t } = useTranslation();

  return (
    <Card
      shadow="none"
      className="bg-background/60 dark:bg-default-100/50 w-3/5"
    >
      {/* TODO: add header with file information */}

      <CardBody className="flex flex-col justify-center items-center">
        <Spinner
          label={t("sendGenView.spinnerLabel")}
          color="primary"
          size="sm"
        />
      </CardBody>

      <CardFooter className="flex flex-col">
        <Button color="danger" variant="flat" className="self-center">
          {t("sendView.cancelButtonLabel")}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Send_GenvView;
