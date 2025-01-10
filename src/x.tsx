// import React from 'react';
// import { AuthProvider, useAuthContext } from './x2';

// function App() {
//   const { login, logout, signin } = useAuthContext();
//   login()

//   return (
//     <AuthProvider>
//       <div>
//         {/* {count.toString()} */}
//         <div>
//           <button onClick={(e) => console.log(e.nativeEvent.pageX, e.nativeEvent.pageY)}>
//             incre
//           </button>
//           {/* <button onClick={decrement}>decre</button> */}
//         </div>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;
fetch('/generate-presigned-url')
  .then(response => response.json())
  .then(async ({ url }) => {
    const formData = new FormData();
    formData.append('file', recordedBlob, 'video.webm');

    // Upload video to S3 using the pre-signed URL
    await fetch(url, {
      method: 'PUT',
      body: recordedBlob,
      headers: {
        'Content-Type': 'video/webm'
      }
    });

    console.log("Upload successful to S3");
  })
  .catch(error => {
    console.error('Error uploading video:', error);
  });
