import React from 'react';
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom';
// import { PaperClipIcon } from '@heroicons/react/20/solid';

const PostResume = () => {
  const { register, handleSubmit,reset } = useForm();

  // const onSubmit = (data) => {
  //   fetch("http://localhost:5000/post-res",{
  //     method:"POST",
  //     headers: {'content-Type' : 'application/json'},
  //     body : JSON.stringify(data)
  //   })
  //   .then(res=>res.json())
  //   .then((resume)=>{
  //     if (resume.acknowledged === true) {
  //       alert("Resume has posted successfully!!!")
  //     }
  //     reset();
  //   })
  //   console.log('Form submitted:', data);
  // };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('email', data.email);
    formData.append('number', data.number);
    formData.append('description', data.description);
    formData.append('resume', data.resume[0]); // Assuming data.resume is a FileList

    try {
      const response = await fetch("http://localhost:5000/post-res", {
        method: "POST",
        body: formData,
      });

      const resume = await response.json();

      if (resume.acknowledged === true) {
        alert("Resume has posted successfully!!!");
      }

      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  return (
    <form className='px-8 py-8 bg-gray-100' encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 sm:px-0">
        <h3 className="text-xl font-semibold leading-7 text-gray-900">Applicant Information</h3>
        <p className="mt-1 max-w-2xl text-lg leading-6 text-gray-500">Personal details and application.</p>
        <div className='text-lg'>
        <Link to="/view-res" className='flex justify-end text-purple-600 hover:underline'>View Resume</Link>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900" >Full name</dt>
            <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                {...register('fullName')}
                type="text"
                
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              />
            </dd>
          </div>
        </dl>
      </div>
      <div className="mt-6 ">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">Email</dt>
            <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                {...register('email')}
                type="email"
                className="border border-gray-300 rounded-md p-2 w-full"
                required
              />
            </dd>
          </div>
        </dl>
      </div>
      <div className="mt-6">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">Mobile Number</dt>
            <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                {...register('number')}
                type="tel"
                pattern='[0-9]{10}'
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </dd>
          </div>
        </dl>
      </div>
      <div className="mt-6">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">Description</dt>
            <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <textarea className='w-full pl-3 py-1.5 focus-outline placeholder:text-gray-700'
            rows={6}
            placeholder='About Yourself'
            {...register("description",)} required/>
            </dd>
          </div>
        </dl>
      </div>
      <div className="mt-6">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900">Resume</dt>
            <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                {...register('resume')}
                type="file"
                accept='application/pdf'
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </dd>
          </div>
        </dl>
      </div>
      <div className="mt-6 px-4 sm:px-0">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          Submit Application
        </button>
      </div>
    </form>
  );
};

export default PostResume;


