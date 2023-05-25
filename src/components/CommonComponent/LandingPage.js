import React from 'react';
import GroupMLogo from '../../Assets/logo-download-01.png';
import HTWLogo from '../../Assets/hoonartek-logo.png';
import Hero1 from '../../Assets/landing/hero1.jpg';
import Hero2 from '../../Assets/landing/hero2.jpg';
import Hero3 from '../../Assets/landing/hero3.jpg';
import Hero4 from '../../Assets/landing/hero4.jpg';
import Hero5 from '../../Assets/landing/hero5.jpg';
import Hero6 from '../../Assets/landing/hero6.jpg';

const LandingPage = () => {

    return (
        <>
        {/* Section 1 */}
        <section className="w-full px-8 text-gray-700 bg-white">
          <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
            <div className="relative flex flex-col md:flex-row">
              <a
                href="#_"
                className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
              >
                <span className="flex flex-row items-center mx-auto text-xl font-black leading-none text-gray-900 select-none">
                    <img src={HTWLogo} className='w-12 mr-2' />
                  DataHaven<span className="text-amaranth-600">.</span>
                </span>
              </a>
              <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
                {/* <a
                  href="#_"
                  className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                >
                  Home
                </a> */}
                <a
                  href="#_"
                  className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                >
                  Features
                </a>
                <a
                  href="#_"
                  className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                >
                  Use cases
                </a>
                <a
                  href="#_"
                  className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </a>
                <a
                  href="#_"
                  className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                >
                  Blog
                </a>
              </nav>
            </div>
            <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
              <a
                href="/login"
                className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900"
              >
                Sign in
              </a>
              <a
                href="/register"
                className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-amaranth-600 border border-transparent rounded-md shadow-sm hover:bg-amaranth-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amaranth-600"
              >
                Sign up
              </a>
            </div>
          </div>
        </section>
        {/* Section 2 */}
        <section className="px-2 py-12 bg-white md:px-0">
          <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
            <div className="flex flex-wrap items-start sm:-mx-3">
              <div className="w-full md:w-1/2  ">
                <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-xl md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-5 md:pb-0">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <span className="block xl:inline">Unleash the power of </span>
                    <span className="block text-amaranth-600 xl:inline">
                     secure data collaboration.
                    </span>
                  </h1>
                  <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                    Unlock the potential of your data while maintaining the highest levels of security and compliance with DataHaven. Our cutting-edge platform is designed to provide a seamless, no-code user interface (UI) experience on top of Snowflake Data Clean Room, enabling organizations to collaborate on sensitive data projects like never before.
                  </p>
                  <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                    <a
                      href="#_"
                      className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-amaranth-600 rounded-md sm:mb-0 hover:bg-amaranth-700 sm:w-auto"
                    >
                    

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                            <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
                        </svg>

                        Watch Video 
                     
                    </a>
                    {/* <a
                      href="#_"
                      className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
                    >
                      Learn More
                    </a> */}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 pt-4">
                <div className="w-full h-96  relative overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                  <img src={Hero1}  className=' object-fit '/>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Section 3 */}
        <section className="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
          <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
            {/* Image */}
            <div className="w-full h-96  relative overflow-hidden rounded-md shadow-xl sm:rounded-xl md:w-1/2 ">
              <img
                 src={Hero2}
                className="h-96 w-full"
              />
            </div>
            {/* Content */}
            <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
              <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                Secure data collaboration
              </h2>
              <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                DataHaven provides a secure environment for collaboration, enabling multiple stakeholders to collaborate on sensitive data projects without the risk of unauthorized access or data breaches.
              </p>
              <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-amaranth-300 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>{" "}
                 Enhanced data privacy
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-amaranth-300 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>{" "}
                 Compliance with Regulations
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-amaranth-300 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>{" "}
                  Controlled Access and Authorization
                </li>
              </ul>
            </div>
            {/* End  Content */}
          </div>
          <div className="box-border flex flex-col items-center content-center px-8 mx-auto mt-10 pt-10 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-10 md:flex-row max-w-7xl lg:px-16">
            {/* Content */}
            <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
              <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                Scalable and Flexible
              </h2>
              <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
                Whether you're working with small datasets or large-scale enterprise data, DataHaven scales seamlessly to meet your needs. It integrates with Snowflake's powerful data warehousing capabilities, ensuring high performance and reliability.
              </p>
              <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-amaranth-300 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>{" "}
                 Efficient handling of Data Size Variations
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-amaranth-300 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>{" "}
                  Integration with Snowflake Data warehousing
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-amaranth-300 rounded-full">
                    <span className="text-sm font-bold">✓</span>
                  </span>{" "}
                  Future-Proof solution
                </li>
              </ul>
            </div>
            {/* End  Content */}
            {/* Image */}
            <div 
            className="w-full h-96  relative overflow-hidden rounded-md shadow-xl sm:rounded-xl md:w-1/2">
              <img
                src={Hero3}
                className="h-96 w-full object-cover"
              />
            </div>
          </div>
        </section>
        {/* Section 4 */}
        <section className="py-20 bg-amaranth-50">
          <div className="container items-center max-w-6xl px-4 px-10 mx-auto sm:px-20 md:px-32 lg:px-16">
            <div className="flex flex-wrap items-center -mx-3">
              <div className="order-1 w-full px-3 lg:w-1/2 lg:order-0">
                <div className="w-full lg:max-w-md">
                  <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl font-heading">
                   No-Code interface
                  </h2>
                  <p className="mb-4 font-medium tracking-tight text-gray-400 xl:mb-6">
                    You don't need to be a data expert or have coding skills to work with DataHaven. Our user-friendly UI empowers anyone to leverage the power of Snowflake Data Clean Room effortlessly.
                  </p>
                  <ul>
                    <li className="flex items-center py-2 space-x-4 xl:py-3">
                      <svg
                        className="w-8 h-8 text-pink-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                      </svg>
                      <span className="font-medium text-gray-500">
                        Accessibility for Non-Technical users
                      </span>
                    </li>
                    <li className="flex items-center py-2 space-x-4 xl:py-3">
                      <svg
                        className="w-8 h-8 text-amaranth-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <span className="font-medium text-gray-500">
                        Increased productivity and collaboration
                      </span>
                    </li>
                    <li className="flex items-center py-2 space-x-4 xl:py-3">
                      <svg
                        className="w-8 h-8 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <span className="font-medium text-gray-500">
                        Faster iteration and Time-to-Insight
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0">
                <img
                  className="mx-auto sm:max-w-sm lg:max-w-full"
                  src={Hero4}
                  alt="feature image"
                />
              </div>
            </div>
          </div>
        </section>
         {/* Section 3.1 */}
         <section className="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
          <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
            {/* Image */}
            <div className="w-full h-96  relative overflow-hidden rounded-md shadow-xl sm:rounded-xl md:w-1/2">

              <img
                 src={Hero5}
                className="h-96 w-full object-cover "
              />
            </div>
            {/* Content */}
            <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
              <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                Compliance first approach
              </h2>
              <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                We understand the importance of regulatory compliance. DataHaven ensures that your data collaboration meet industry-specific regulations and standards such as GDPR, HIPPA and CCPA.
              </p>
             
            </div>
            {/* End  Content */}
          </div>
          <div className="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-10 md:flex-row max-w-7xl lg:px-16">
            {/* Content */}
            <div className="box-border w-full text-black border-solid md:w-1/2 md:pr-6 xl:pr-32 space-x-0">
              <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                Data Governance and Auditing
              </h2>
              <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
                DataHaven provides robust data governance and auditing capabilities, allowing you to track data usage, monitor user activities, and maintain a complete audit trail for compliance and accountability.
              </p>
              
            </div>
            {/* End  Content */}
            {/* Image */}
            <div className="w-full h-96  relative overflow-hidden rounded-md shadow-xl sm:rounded-xl md:w-1/2">
              <img
                 src={Hero6}
                className="object-cover w-full h-96"
              />
            </div>
          </div>
        </section>
        {/* Section 5 */}
        <section className="flex items-center justify-center py-20 bg-white min-w-screen">
          <div className="px-16 bg-white">
            <div className="container flex flex-col items-start mx-auto lg:items-center">
              <p className="relative flex items-start justify-start w-full text-lg font-bold tracking-wider text-purple-500 uppercase lg:justify-center lg:items-center">
                Don't just take our word for it
              </p>
              <h2 className="relative flex items-start justify-start w-full max-w-3xl text-5xl font-bold lg:justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="absolute right-0 hidden w-12 h-12 -mt-2 -mr-16 text-gray-200 lg:inline-block"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                See what others are saying
              </h2>
              <div className="block w-full h-0.5 max-w-lg mt-6 bg-purple-100 rounded-full" />
              <div className="items-center justify-center w-full mt-12 mb-4 lg:flex">
                <div className="flex flex-col items-start justify-start w-full h-auto mb-12 lg:w-1/3 lg:mb-0">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 mr-4 overflow-hidden bg-gray-200 rounded-full">
                      <img
                        src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <h4 className="font-bold text-gray-800">John Doe</h4>
                      <p className="text-gray-600">CEO of Something</p>
                    </div>
                  </div>
                  <blockquote className="mt-8 text-lg text-gray-500">
                    "This is a no-brainer if you want to take your business to the
                    next level. If you are looking for the ultimate toolset, this is
                    it!"
                  </blockquote>
                </div>
                <div className="flex flex-col items-start justify-start w-full h-auto px-0 mx-0 mb-12 border-l border-r border-transparent lg:w-1/3 lg:mb-0 lg:px-8 lg:mx-8 lg:border-gray-200">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 mr-4 overflow-hidden bg-gray-200 rounded-full">
                      <img
                        src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2547&q=80"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <h4 className="font-bold text-gray-800">Jane Doe</h4>
                      <p className="text-gray-600">CTO of Business</p>
                    </div>
                  </div>
                  <blockquote className="mt-8 text-lg text-gray-500">
                    "Thanks for creating this service. My life is so much easier.
                    Thanks for making such a great product."
                  </blockquote>
                </div>
                <div className="flex flex-col items-start justify-start w-full h-auto lg:w-1/3">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 mr-4 overflow-hidden bg-gray-200 rounded-full">
                      <img
                        src="https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1256&q=80"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <h4 className="font-bold text-gray-800">John Smith</h4>
                      <p className="text-gray-600">Creator of Stuff</p>
                    </div>
                  </div>
                  <blockquote className="mt-8 text-lg text-gray-500">
                    "Packed with awesome content and exactly what I was looking for. I
                    would highly recommend this to anyone."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Section 6 : HIDDEN */}
        <section className="hidden box-border py-8 leading-7 text-gray-900 bg-white border-0 border-gray-200 border-solid sm:py-12 md:py-16 lg:py-24">
          <div className="box-border max-w-6xl px-4 pb-12 mx-auto border-solid sm:px-6 md:px-6 lg:px-4">
            <div className="flex flex-col items-center leading-7 text-center text-gray-900">
              <h2 className="box-border m-0 text-3xl font-semibold leading-tight tracking-tight text-black border-solid sm:text-4xl md:text-5xl">
                Pricing Options
              </h2>
              <p className="box-border mt-4 text-2xl leading-normal text-gray-900 border-solid">
                We've got a plan for companies of any size
              </p>
            </div>
            <div className="grid max-w-md mx-auto mt-6 overflow-hidden leading-7 text-gray-900 border border-b-4 border-gray-300 border-amaranth-600 rounded-xl md:max-w-lg lg:max-w-none sm:mt-10 lg:grid-cols-3">
              <div className="box-border px-4 py-8 mb-6 text-center bg-white border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
                <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                  Basic
                </h3>
                <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                  The basic plan is a good fit for smaller teams and startups
                </p>
                <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
                  <p className="box-border m-0 text-6xl font-semibold leading-normal text-center border-0 border-gray-200">
                    $19
                  </p>
                  <p className="box-border my-0 ml-4 mr-0 text-xs text-left border-0 border-gray-200">
                    per user <span className="block">per month</span>
                  </p>
                </div>
                <button className="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-amaranth-600 no-underline bg-transparent border border-b-2 border-amaranth-600 rounded-md cursor-pointer hover:bg-amaranth-600 hover:border-amaranth-600 hover:text-white sm:text-base sm:mt-8 md:text-lg">
                  Select Plan
                </button>
              </div>
              <div className="box-border px-4 py-8 mb-6 text-center bg-gray-100 border border-gray-300 border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
                <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                  Plus
                </h3>
                <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                  The plus plan is a good fit for medium-size to larger companies
                </p>
                <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
                  <p className="box-border m-0 text-6xl font-semibold leading-normal text-center border-0 border-gray-200">
                    $39
                  </p>
                  <p className="box-border my-0 ml-4 mr-0 text-xs text-left border-0 border-gray-200">
                    per user <span className="block">per month</span>
                  </p>
                </div>
                <button className="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-white no-underline bg-amaranth-600 border-b-4 border-amaranth-700 rounded cursor-pointer hover:text-white sm:text-base sm:mt-8 md:text-lg">
                  Select Plan
                </button>
              </div>
              <div className="box-border px-4 py-8 text-center bg-white border-solid sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
                <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                  Pro
                </h3>
                <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                  The pro plan is a good fit for larger and enterprise companies.
                </p>
                <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
                  <p className="box-border m-0 text-6xl font-semibold leading-normal text-center border-0 border-gray-200">
                    $59
                  </p>
                  <p className="box-border my-0 ml-4 mr-0 text-xs text-center border-0 border-gray-200">
                    per user <span className="block">per month</span>
                  </p>
                </div>
                <button className="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-amaranth-600 no-underline bg-transparent border border-b-2 border-amaranth-600 rounded cursor-pointer hover:bg-amaranth-600 hover:border-amaranth-600 hover:text-white sm:text-base sm:mt-8 md:text-lg">
                  Select Plan
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Section 7 */}
        <section className="bg-white">
          <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
            <nav className="flex flex-wrap justify-center -mx-5 -my-2">
              
              <div className="px-5 py-2">
                <a
                  href="#"
                  className="text-base leading-6 text-gray-500 hover:text-gray-900"
                >
                  Privacy policy
                </a>
              </div>
              <div className="px-5 py-2">
                <a
                  href="#"
                  className="text-base leading-6 text-gray-500 hover:text-gray-900"
                >
                  Terms of services
                </a>
              </div>
            </nav>
            <div className="flex justify-center mt-8 space-x-6">
                    <img src={HTWLogo} className='w-14' />
            </div>
            <p className="mt-8 text-base leading-6 text-center text-gray-400">
              © 2023 Hoonartek. All rights reserved.
            </p>
          </div>
        </section>
      </>
      
    )
};

export default LandingPage;