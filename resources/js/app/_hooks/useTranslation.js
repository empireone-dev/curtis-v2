import { useSelector } from "react-redux";
import translations from "@/app/_json/translations.json";

// Resolves `key` against the currently selected language, falling back to English then the key itself.
export default function useTranslation() {
    const { selectedLang } = useSelector((store) => store.app);
    const lang = selectedLang?.code || "en";

    const t = (key, fallback = key) => {
        return translations[lang]?.[key] ?? translations.en?.[key] ?? fallback;
    };

    return { t, lang };
}
