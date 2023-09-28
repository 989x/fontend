## Ask

lib/propertyMappings.ts
```js
export const supportedTypes = [
  { value: "premium" },
  { value: "standard" },
  { value: "basic" },
];
```

how to use supportedTypes in this file
```js
import { useDictionary } from "@/lib/dictionary";

const CardProperty = ({ data, userData }: any) => {
  const supportedTypes = ["premium", "standard", "basic"];
  const isSupporter = supportedTypes.includes(userData?.subs?.type);

  return (
    ...
  )
}
```

## ChatGPT

To use the `supportedTypes` array from `lib/propertyMappings.ts` in your `CardProperty` component, you can import it and use it directly. Here's how you can do it:

```js
// Import the supportedTypes array from lib/propertyMappings.ts
import { supportedTypes } from "@/lib/propertyMappings";
import { useDictionary } from "@/lib/dictionary";

const CardProperty = ({ data, userData }: any) => {
  // Use the imported supportedTypes array
  const isSupporter = supportedTypes.some(typeObj => typeObj.value === userData?.subs?.type);

  return (
    // ...
  );
};
```

In this code, we import the `supportedTypes` array from `lib/propertyMappings.ts` and then use the `.some()` method to check if `userData?.subs?.type` matches any of the values in the `supportedTypes` array. This approach ensures that you are using the same list of supported types defined in `lib/propertyMappings.ts` in your component, making your code more maintainable and reducing redundancy.

</br>

## Easier way

```js
export const supportedTypes = [
  "premium",
  "standard",
  "basic",
];

const CardProperty = ({ data, userData }: any) => {
  // Use the imported supportedTypes array
  const isSupporter = supportedTypes.includes(userData?.subs?.type);

  return (
    // ...
  );
};
```