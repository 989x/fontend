// import "@/styles/globals.css";
// import type { AppProps } from "next/app";
// import { SessionProvider } from "next-auth/react";

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <SessionProvider session={pageProps.session}>
//         <Component {...pageProps} />
//     </SessionProvider>
//   );
// }

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import RefreshTokenHandler from "../components/RefreshTokenHandler";

export default function App({ Component, pageProps }: AppProps) {
  const [interval, setInterval] = useState(0);

  // useEffect(()=>{
  //   console.log("interval",interval)
  // },[interval])

  return (
    <SessionProvider session={pageProps.session} refetchInterval={interval}>
      <Component {...pageProps} />
      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  );
}
