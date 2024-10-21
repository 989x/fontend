import { useEffect } from "react";
import { useSession } from "next-auth/react";

// const RefreshTokenHandler = (props) => {
//   const { data: session } = useSession();

//   useEffect(() => {
//     if (!!session) {
//       // We did set the token to be ready to refresh after 23 hours, here we set interval of 23 hours 30 minutes.
//       const timeRemaining = Math.round((((session.expires - 30 * 60 * 1000) - Date.now()) / 1000));

//       // Here we set interval of 10 seconds.
//       // const timeRemaining = Math.round(((session.expires - 10 * 1000) - Date.now()) / 1000);
      
//       // console.log("time R",timeRemaining)

//       props.setInterval(timeRemaining > 0 ? timeRemaining : 0);
//     }
//   }, [session]);

//   return null;
// };

const RefreshTokenHandler = ({ setInterval }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!!session) {
      const timeRemaining = Math.round(((session.expires - 30 * 60 * 1000) - Date.now()) / 1000);
      setInterval(timeRemaining > 0 ? timeRemaining : 0);
    }
  }, [session, setInterval]);

  return null;
};

export default RefreshTokenHandler;
