import React from "react";

const Profile = () => {
  return (
    <div className="flex flex-col flex-grow w-full h-full bg-gray-50">
      <div className="flex h-12 sticky top-0 px-5  py-2 bg-amaranth-800 flex-row items-center justify-between w-full">
        <h3 className="text-lg font-light text-white">My profile</h3>
        </div>
      <div className="container mx-auto max-w-3xl mt-8 shadow-sm">
        <form action="{{ route('profile.save') }}" method="POST" enctype="multipart/form-data">
          <div className="w-full bg-white rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
            <div className="w-1/3 bg-amaranth-50 p-8 hidden md:inline-block">
              <h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">Profile Info</h2>
              <p className="text-xs text-gray-500">You can use this section to update yoour password.</p>
              <dl className="divide-y divide-gray-100">
                <div className="flex flex-col px-4 py-6 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Rashmi Verma</dd>
                </div>
                <div className="flex flex-col px-4 py-6 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">rashmi_verma@acme.com</dd>
                </div>
               
              </dl>
            </div>
            <div className="md:w-2/3 w-full">

              <div className="py-8 px-16">
              <h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">Change password</h2>

                <label for="name" className="text-sm text-gray-600">New password</label>
                <input className="block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6" type="password" value="" name="password" />
              </div>
              <hr className="border-gray-200" />
              <div className="py-8 px-16">
                <label for="email" className="text-sm text-gray-600">Confirm password</label>
                <input 
                  className="block w-full rounded-md border-0 py-1.5 text-amaranth-600  bg-blend-darken    shadow-sm ring-1 ring-inset ring-amaranth-600  placeholder:text-amaranth-600  focus:ring-2 focus:ring-inset focus:ring-amaranth-600  sm:text-sm sm:leading-6"
                  type="password" name="confirm_password" value="" />
              </div>
             

            </div>

          </div>
          <div className="flex  flex-row justify-end items-center p-16 py-8 bg-amaranth-700 clearfix rounded-b-lg border-t border-gray-200">
            <p className="float-left text-xs text-white tracking-tight  mr-4">Click on Save to update your Profile Info</p>
            <button id="createNewRequestMatchRate" className=" w-max flex items-center px-2 py-2  text-sm text-white bg-amaranth-600 rounded-md   hover:bg-amaranth-700  ">Save changes</button>          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
