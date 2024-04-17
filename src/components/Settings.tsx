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
import { TbLanguage, TbPaint, TbSettings } from "react-icons/tb";
import { useTranslation } from "react-i18next";

export type Theme = "light" | "dark";
export type ThemeChoice = "system" | "light" | "dark";
export type Lang = "en" | "es" | "cn" | "de";

// TODO: docstring, once properties are finalized.
interface SettingsProps {
  defaultThemeChoice?: ThemeChoice;
  onThemeChange?: (theme: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultLang?: Lang;
  onLangChange?: (lang: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Settings(props: SettingsProps) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { defaultThemeChoice, onThemeChange, defaultLang, onLangChange } =
    props;

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

      {/* TODO: make settings persist between sessions */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        backdrop="blur"
        className="transition-none children:transition-none"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t("settings.header")}
              </ModalHeader>

              <ModalBody>
                {/* FIXME: disable color transition for start content */}
                <Select
                  label={t("settings.themeSelectLabel")}
                  defaultSelectedKeys={[defaultThemeChoice || "system"]}
                  disallowEmptySelection
                  autoFocus
                  className={"w-full"}
                  aria-label={t("settings.themeSelectAriaLabel")}
                  onChange={onThemeChange}
                  startContent={<TbPaint />}
                >
                  <SelectItem
                    key="system"
                    description={t("settings.themeSystemDescription")}
                  >
                    {t("settings.themeSystem")}
                  </SelectItem>
                  <SelectItem key="light">
                    {t("settings.themeLight")}
                  </SelectItem>
                  <SelectItem key="dark">{t("settings.themeDark")}</SelectItem>
                </Select>

                {/* FIXME: disable color transition for start content */}
                {/* TODO: default to system locale instead of English */}
                <Select
                  label={t("settings.languageSelectLabel")}
                  defaultSelectedKeys={[defaultLang || "en"]}
                  disallowEmptySelection
                  className={"w-full"}
                  aria-label={t("settings.languageSelectAriaLabel")}
                  onChange={onLangChange}
                  startContent={<TbLanguage />}
                >
                  {/* TODO: make this more dynamic */}
                  <SelectItem key="en" value="en">
                    English
                  </SelectItem>
                  <SelectItem key="es" value="es">
                    Español
                  </SelectItem>
                  <SelectItem key="cn" value="cn">
                    中国人
                  </SelectItem>
                  <SelectItem key="de" value="de">
                    Deutsch
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
