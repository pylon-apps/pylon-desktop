import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { TbSettings } from "react-icons/tb";
import { useTranslation } from "react-i18next";

function Settings() {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        disableRipple
        onPress={onOpen}
        className="absolute bottom-2 left-2 transition-none"
      >
        <TbSettings />
      </Button>

      {/* TODO: make settings actually take effect */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t("settings.header")}
              </ModalHeader>

              <ModalBody>
                {/* FIXME: disallow unselecting options */}
                <Select
                  label="Theme"
                  defaultSelectedKeys={["system"]}
                  autoFocus
                  className="w-full"
                  aria-label={t("settings.themeSelectLabel")}
                >
                  <SelectItem key="system">
                    {t("settings.themeSystem")}
                  </SelectItem>
                  <SelectItem key="light">
                    {t("settings.themeLight")}
                  </SelectItem>
                  <SelectItem key="dark">{t("settings.themeDark")}</SelectItem>
                </Select>

                {/* FIXME: disallow unselecting options */}
                <Select
                  label="Language"
                  defaultSelectedKeys={["en"]}
                  className="w-full"
                >
                  <SelectItem key="en">
                    {t("settings.languageEnglish")}
                  </SelectItem>
                  <SelectItem key="es">
                    {t("settings.languageSpanish")}
                  </SelectItem>
                  <SelectItem key="cn">
                    {t("settings.languageChinese")}
                  </SelectItem>
                  <SelectItem key="de">
                    {t("settings.languageGerman")}
                  </SelectItem>
                </Select>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t("settings.closeButton")}
                </Button>

                <Button color="primary" variant="light" onPress={onClose}>
                  {t("settings.saveButton")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Settings;
