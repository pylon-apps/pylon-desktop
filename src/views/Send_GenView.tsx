import { Button, Card, CardBody, CardFooter, Spinner } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

interface Send_GenvViewProps {
  cancelHandler: () => void;
}

function Send_GenvView(props: Send_GenvViewProps) {
  const { t } = useTranslation();
  const { cancelHandler } = props;

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
        <Button
          color="danger"
          variant="flat"
          onClick={cancelHandler}
          className="self-center"
        >
          {t("sendView.cancelButtonLabel")}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Send_GenvView;
