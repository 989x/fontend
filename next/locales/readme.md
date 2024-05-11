### Ask

using nextJS typescript, create file lib/dictionary.ts
```ts
import { useRouter } from "next/router";
import enUS from "@/locales/en-us";
import thTH from "@/locales/th-th";

export function useDictionary(): any {
  const router = useRouter();
  const { locale } = router;

  switch (locale) {
    case "en-us":
      return enUS;
    case "th-th":
      return thTH;
    default:
      return enUS; 
  }
}
```

locales/en-us.js
```js
export default {
  txt_NavDiscover: "Discover",
  txt_NavHosting: "Hosting",
  ...
};
```

locales/th-th.js
```js
export default {
  txt_NavDiscover: "ค้นพบ",
  txt_NavHosting: "โฮสติ้ง",
  ...
};
```

Found a problem in each file. There are hundreds of lines of code.
It makes the files look unattractive and too many.
Is there a better way to organize files?

### ChatGPT

To handle translations for navigation and footer in your `useDictionary` function, you can create separate module-specific files for these sections in your locale directories. Here's an example of how to structure your `useDictionary` function to include translations for both navigation and footer:

First, organize your locale files like this:

```
locales/en-us/
├── common.js
├── navigation.js
├── footer.js
...
```

```
locales/th-th/
├── common.js
├── navigation.js
├── footer.js
...
```

Now, update your `useDictionary` function to include translations for navigation and footer:

<dictionary.ts />

In this code, we import translations for common, navigation, and footer separately for both `en-us` and `th-th` locales and then merge them into a single object for each locale. This allows you to use translations from all three sections (common, navigation, and footer) in your application.

Make sure to adjust the import paths to match your actual directory structure. This approach can be extended to other sections or modules within your application.
