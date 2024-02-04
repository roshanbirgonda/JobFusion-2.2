import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  // console.log(id);
  const [job, setJob] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, []);
  const handleApply = async () => {
    // Retrieve the Bearer token from local storage
    const token = localStorage.getItem("token");

    // Construct the headers object with the Bearer token
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include the Bearer token in the Authorization header
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/apply-job/${id}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      //setUsers(data); // Assuming data is an array of user objects
      alert("Applied to job successfully!!");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // const handleApply = async () => {
  //   alert("Applied to job successfully!!");
  //   fetch(`http://localhost:5000/api/apply-job/${id}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setUsers(data); // Assuming data is an array of user objects
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data:", error);
  //     });
  // };

  const {
    _id,
    companyName,
    companyLogo,
    JobTitle,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    employmentType,
    postingDate,
    description,
  } = job;

  return (
    <section className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-10">
      <Link
        to={`/job-details/${_id}`}
        className="flex gap-4 flex-col sm:flex-row items-start"
      >
        <img
          src={companyLogo}
          alt="Company Logo"
          className="h-36 w-36 rounded"
        />
        <div>
          <h4 className="text-primary mb-1">{companyName}</h4>
          <h3 className="text-lg font-semibold mb-2">{JobTitle}</h3>
          <div className="text-primary text-3xl text-bold flex flex-wrap gap-2 mb-2">
            <ol className="list-decimal my-4">
              <li>Company Name: {companyName}</li>
              <li>Designation: {JobTitle}</li>
            </ol>
          </div>
          <p className="text-base text-primary/70">{description}</p>
        </div>
      </Link>

      <button
        className="bg-green px-8 py-2 my-2 text-white rounded-full"
        onClick={handleApply}
      >
        Apply Now
      </button>
    </section>
  );
};

export default JobDetails;
