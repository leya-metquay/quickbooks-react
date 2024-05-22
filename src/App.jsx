

import './App.css'

// function App() {
  
//    const redirecturl = process.env.REDIRECT_URL;

//   const fetchData = async() =>{
//     try{
//       const response = await fetch(`${redirecturl}/auth`);
//       const config = await response.json();
     
//       // setData(result);
//       // const newWindow = window.open("", "_blank");
//       // newWindow.document.write(`<h1>Fetched Data</h1><p>${result}</p>`);
//       // newWindow.document.close();
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }
//   useEffect(() => {
//     fetchData();
//   }, []);
//   return (
//     <>
      
//       <a href={redirectUrl}>Quickbooks</a>
     
//     </>
//   )
// }

// export default App



function App(){
    const apiUrl = 'http://localhost:3000/callback';
    const fetchAuthUriAndRedirect = async () => {
      try {
        const response = await fetch(`${apiUrl}/auth`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const authUri = data.authUri;
        window.location.href = authUri; // Redirect the browser to the authorization URI
      } catch (error) {
        console.error('Error fetching auth URI:', error);
      }
    };
  return (
    <div>
      <div className="App">
      <button onClick={fetchAuthUriAndRedirect}>Authorize</button>
    </div>
    </div>
  )
}

export default App






// import React, { useState, useEffect } from 'react';

// function App() {
//   const [authUri, setAuthUri] = useState(null);

//   useEffect(() => {
//     fetchAuthUri();
//   }, []);

//   const fetchAuthUri = async () => {
//     try {
//       const response = await fetch(`${authUri}/auth`);
//       const data = await response.text();
//       setAuthUri(data);
//     } catch (error) {
//       console.error('Error fetching authUri:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>React and Node.js Fetch Example</h1>
//         <button onClick={fetchAuthUri}>Authorize</button>
//         {authUri && <a href={authUri}>Authorize with Intuit</a>}
//       </header>
//     </div>
//   );
// }

// export default App;
