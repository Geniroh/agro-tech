// import { ClimbingLoaderP } from '@/components/general/climbing-loader'
// import React from 'react'
// import { useSession } from 'next-auth/react';

// const Tester = async () => {
//   const { data: session } = useSession();

//   if (session) {
//     console.log(session)
//     // const res = await fetch('http://localhost:8080/api/protected', {
//     //   headers: {
//     //     'Content-Type': 'application/json',
//     //     'Authorization': `Bearer ${session}`, // Replace accessToken with the correct token if different
//     //   },
//     // });

//     // const data = await res.json();
//     // console.log(data);
//   } else {
//     console.log('User not authenticated');
//   }
//   return (
//     <div>
//         Hello check console
//     </div>
//   )
// }

// export default Tester

"use client"
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const fetchData = async (accessToken:string) => {
  const res = await fetch("http://localhost:8080/api/protected", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  console.log({ data });
};

const YourComponent = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    // if (status === "authenticated" && session) {
    //   fetchData(session.user.accessToken);
    // }

    console.log({session, status})
  }, [status, session]);

  return (
    <div>
      {/* Your component content */}
      Hello check console
    </div>
  );
};

export default YourComponent;

