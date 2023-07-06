### next-auth JWEDecryptionFailed
- https://stackoverflow.com/questions/71385330/next-auth-jwedecryptionfailed

I often get this error:

```bash
https://next-auth.js.org/errors#jwt_session_error decryption operation failed {
  message: 'decryption operation failed',
  stack: 'JWEDecryptionFailed: decryption operation failed\n' +
    '    at gcmDecrypt (/home/aurel/Documents/repos/front/node_modules/jose/dist/node/cjs/runtime/decrypt.js:67:15)\n' +
    '    at decrypt (/home/aurel/Documents/repos/front/node_modules/jose/dist/node/cjs/runtime/decrypt.js:92:20)\n' +
    '    at flattenedDecrypt (/home/aurel/Documents/repos/front/node_modules/jose/dist/node/cjs/jwe/flattened/decrypt.js:119:52)\n' +
    '    at async compactDecrypt (/home/aurel/Documents/repos/front/node_modules/jose/dist/node/cjs/jwe/compact/decrypt.js:18:23)\n' +
    '    at async jwtDecrypt (/home/aurel/Documents/repos/front/node_modules/jose/dist/node/cjs/jwt/decrypt.js:8:23)\n' +
    '    at async Object.decode (/home/aurel/Documents/repos/front/node_modules/next-auth/jwt/index.js:64:7)\n' +
    '    at async Object.session (/home/aurel/Documents/repos/front/node_modules/next-auth/core/routes/session.js:41:28)\n' +
    '    at async NextAuthHandler (/home/aurel/Documents/repos/front/node_modules/next-auth/core/index.js:96:27)\n' +
    '    at async NextAuthNextHandler (/home/aurel/Documents/repos/front/node_modules/next-auth/next/index.js:21:19)\n' +
    '    at async /home/aurel/Documents/repos/front/node_modules/next-auth/next/index.js:57:32',
  name: 'JWEDecryptionFailed'
}
```

### solve

just had to add a secret to make it work

```ts
export default NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
    ...
    ]
})
```