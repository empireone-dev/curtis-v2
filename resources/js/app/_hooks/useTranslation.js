import { useSelector } from "react-redux";
import translations from "@/app/_json/translations.json";

// Resolves `key` against the currently selected language, falling back to English then the key itself.
export default function useTranslation() {
    const { selectedLang } = useSelector((store) => store.app);
    const lang = selectedLang?.code || "en";

    const t = (key, params) => {
        let value = translations[lang]?.[key] ?? translations.en?.[key] ?? key;

        if (params && typeof value === "string") {
            Object.entries(params).forEach(([placeholder, replacement]) => {
                value = value.replaceAll(`{${placeholder}}`, replacement);
            });
        }

        return value;
    };

    return { t, lang };
}
