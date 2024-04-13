import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		debug: true,
		fallbackLng: "en",
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		resources: {
			en: {
				translation: {
					app: {
						sendTabLabel: "Send",
						receiveTabLabel: "Receive",
						tabsAriaLaabel: "Options",
						themeToggleAriaLabel: "Toggle theme",
					},
					sendView: {
						description: "Send File",
						instruction: "Select the file or folder to send",
						selectButtonLabel: "Select",
						selectButtonAriaLabel: "Select",
						selectFileLabel: "File",
						selectFolderLabel: "Folder",
					},
					receiveView: {
						description: "Receive File",
						instruction: "Enter the Pylon code to receive the file or folder from the sender",
						receiveButtonLabel: "Receive",
						receiveButtonAriaLabel: "Receive",
						pylonCodeInputLabel: "Pylon Code",
					}
				}
			}
		}
	});

export default i18n;
