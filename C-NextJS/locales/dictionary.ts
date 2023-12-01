import { useRouter } from "next/router";
import commonEnUS from "@/locales/en-us/common";
import commonThTH from "@/locales/th-th/common";
import navigationEnUS from "@/locales/en-us/navigation";
import navigationThTH from "@/locales/th-th/navigation";
import footerEnUS from "@/locales/en-us/footer";
import footerThTH from "@/locales/th-th/footer";

export function useDictionary(): Record<string, string> {
  const router = useRouter();
  const { locale } = router;

  switch (locale) {
    case "en-us":
      return {
        ...commonEnUS,
        ...navigationEnUS,
        ...footerEnUS,
      };
    case "th-th":
      return {
        ...commonThTH,
        ...navigationThTH,
        ...footerThTH,
      };
    default:
      return {
        ...commonEnUS,
        ...navigationEnUS,
        ...footerEnUS,
      };
  }
}
