import { ClimbingLoaderP } from '@/components/general/climbing-loader'
import React from 'react'
import { useSession } from 'next-auth/react';

const Tester = async () => {
  const { data: session } = useSession();

  if (session) {
    console.log(session)
    // const res = await fetch('http://localhost:8080/api/protected', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${session}`, // Replace accessToken with the correct token if different
    //   },
    // });

    // const data = await res.json();
    // console.log(data);
  } else {
    console.log('User not authenticated');
  }
  return (
    <div>
        Hello check console
    </div>
  )
}

export default Tester




const fetchData = async () => {
  const { data: session } = useSession();

  if (session) {
    const res = await fetch('http://localhost:8080/api/protected', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session}`, // Replace accessToken with the correct token if different
      },
    });

    const data = await res.json();
    console.log(data);
  } else {
    console.log('User not authenticated');
  }
};

// Call fetchData when needed, e.g., in a useEffect or onClick event
