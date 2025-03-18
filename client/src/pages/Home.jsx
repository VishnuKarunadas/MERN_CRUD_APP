import React, { useEffect, useState } from 'react'


const Home = () => {
    const [data,setData] = useState(null)
    useEffect(() => {
        const fetch = async () => {
            const result = await apiCall();
            setData(result); // Updates the state
            console.log('hii'); // Logs inside useEffect after state update
        }
        fetch();
    }, []);
    
    console.log('Current data:', data); // Logs `data` after it's updated
    
console.log(data);

 async function apiCall  (){
    try{
        const res = await fetch('http://localhost:3000/')// 5ms
        const data = await res.json()
          console.log(data);
          return data
    }
    catch(err) {
        console.log(err);
        console.log('error found fetch broken');
        
        
    }


 }
 console.log(data);
 return (
    <div>
        Home Hii {data ? data.message : "Loading..."} {/* Show "Loading..." while data is not yet set */}
    </div>
);
}

export default Home