// "use client"
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";

// const fetchData = async (accessToken:string) => {
//   const res = await fetch("http://localhost:8080/api/protected", {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   const data = await res.json();
//   console.log({ data });
// };

// const YourComponent = () => {
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     // if (status === "authenticated" && session) {
//     //   fetchData(session.user.accessToken);
//     // }

//     console.log({session, status})
//   }, [status, session]);

//   return (
//     <div>
//       {/* Your component content */}
//       Hello check console
//     </div>
//   );
// };

// export default YourComponent;

"use client";

import { useState } from "react";

function UploadForm() {
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Clicked");
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/v1/upload", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
      console.log(res);
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <button type="submit">Uplopad</button>
    </form>
  );
}

export default UploadForm;
