// //
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const AppliedUsers = () => {
//   const { id } = useParams();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Make a GET request to fetch user data from the server
//     fetch(`http://localhost:5000/api/job/${id}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUsers(data); // Assuming data is an array of user objects
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [id]); // Include id in the dependency array to fetch data whenever id changes
//   console.log(users);
//   return (
//     <div>
//       <h1>User Data</h1>
//       <ul>
//         {users &&
//           users.map((user) => (
//             <li key={user._id}>
//               <strong>Full Name:</strong> {user.fullName}
//               <br />
//               <strong>Email:</strong> {user.email}
//               <br />
//               <strong>Number:</strong> {user.number}
//               <br />
//               <strong>Description:</strong> {user.description}
//             </li>
//           ))}
//       </ul>
//     </div>
//   );

//   // return (
//   //   <div>
//   //     <h1>User Data</h1>
//   //     <ul>
//   //       {users.map((user) => (
//   //         <li key={user._id}>
//   //           <strong>Full Name:</strong> {user.fullName}
//   //           <br />
//   //           <strong>Email:</strong> {user.email}
//   //           <br />
//   //           <strong>Number:</strong> {user.number}
//   //           <br />
//   //           <strong>Description:</strong> {user.description}
//   //           <br />
//   //           <strong>ID:</strong> {user._id}
//   //         </li>
//   //       ))}
//   //     </ul>
//   //   </div>
//   // );
// };

// export default AppliedUsers;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AppliedUsers = () => {
  const { id } = useParams();
  const [seekers, setSeekers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/job/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSeekers(data);
      })
      .catch((error) => {
        console.error("Error fetching seeker data:", error);
      });
  }, [id]);
  return (
    <div>
      <h1>Seekers Details</h1>
      <ul>
        {seekers.length > 0 ? (
          seekers.map((seeker, index) => (
            <li key={index}>
              <strong>Full Name:</strong> {seeker.fullName}
              <br />
              <strong>Email:</strong> {seeker.email}
              <br />
              <strong>Number:</strong> {seeker.number}
              <br />
              <strong>Description:</strong> {seeker.description}
              <br />
              <strong>ID:</strong> {seeker._id}
              <br />
              <br />
              <br />
              <br />
              <br />
            </li>
          ))
        ) : (
          <li>No seekers found</li>
        )}
      </ul>
    </div>
  );

  // return (
  //   <div>
  //     <h1>Seekers Details</h1>
  //     <ul>
  //       {seekers.map((seeker, index) => (
  //         <li key={index}>
  //           <strong>Full Name:</strong> {seeker.fullName}
  //           <br />
  //           <strong>Email:</strong> {seeker.email}
  //           <br />
  //           <strong>Number:</strong> {seeker.number}
  //           <br />
  //           <strong>Description:</strong> {seeker.description}
  //           <br />
  //           <strong>ID:</strong> {seeker._id}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default AppliedUsers;
