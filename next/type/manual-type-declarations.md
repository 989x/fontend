### Manual Type Declarations in TypeScript

#### Problem Faced

While working on a Next.js project with `next-intl` for internationalization, an error was encountered:

```
Module '"next-intl"' has no exported member 'useTranslations'.ts(2305)
```

This error indicates that TypeScript could not find the `useTranslations` export from the `next-intl` module. This problem may arise when:

1. The module does not include type declarations for the desired function.
2. There is a mismatch between the module version and its documentation.
3. The function might not be exported as expected.

#### Solution: Manual Type Declarations

To resolve this issue, you can manually declare the types for the module. This involves creating a `.d.ts` file where you explicitly declare the types for the functions you are using. Here’s a step-by-step guide:

1. **Create a Type Declaration File**

   Create a new file named `next-intl.d.ts` in a `types` directory at the root of your project.

   ```typescript
   // types/next-intl.d.ts
   declare module 'next-intl' {
     export function useTranslations(namespace: string): (key: string) => string;
     // Add other type declarations as needed
   }
   ```

2. **Update `tsconfig.json`**

   Ensure that TypeScript is aware of your custom type declarations by updating the `tsconfig.json` file to include the path to your types folder.

   ```json
   {
     "compilerOptions": {
       "typeRoots": ["./node_modules/@types", "./types"]
     }
   }
   ```

3. **Import and Use the Declared Types**

   With the custom declarations in place, you can now import and use the functions from `next-intl` without TypeScript errors.

   ```typescript
   import { useTranslations } from 'next-intl';

   export default function Footer() {
     const t = useTranslations('Footer');

     return (
       <div className='my-10 text-center'>
         <p>{t('copyright')}</p>
       </div>
     );
   }
   ```

### Additional Recommendations

- **Verify Module Documentation**: Always check the module’s documentation to ensure you are using the correct functions and imports.
- **Keep Dependencies Updated**: Regularly update your dependencies to ensure compatibility with TypeScript and other tools.
- **Use TypeScript’s Built-in Tools**: Utilize tools like `tsc` to compile and check your types, ensuring they are correctly defined.

### Conclusion

Manually declaring types is a powerful technique when working with modules that lack proper type definitions. It helps maintain type safety and enables smooth development workflows in TypeScript projects.
