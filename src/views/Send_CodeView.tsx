import { Button, Card, CardBody, CardFooter, Snippet } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

interface Send_CodeViewProps {
  code: string;
}

function Send_CodeView(props: Send_CodeViewProps) {
  const { t } = useTranslation();
  const { code } = props;

  return (
    <Card
      shadow="none"
      className="bg-background/60 dark:bg-default-100/50 w-3/5"
    >
      {/* TODO: add header with file information */}

      <CardBody className="flex flex-col justify-center items-center">
        <Snippet symbol="" color="success" variant="flat">
          {code}
        </Snippet>
      </CardBody>

      <CardFooter className="flex flex-col">
        <Button color="danger" variant="flat" className="self-center">
          {t("sendView.cancelButtonLabel")}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Send_CodeView;
