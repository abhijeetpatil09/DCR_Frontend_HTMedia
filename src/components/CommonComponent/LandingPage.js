import React from "react";
import HTWLogo from "../../Assets/hoonartek-logo.png";
import Hero1 from "../../Assets/landing/hero1.jpg";
import Hero2 from "../../Assets/landing/hero2.jpg";
import Hero3 from "../../Assets/landing/hero3.jpg";
import Hero4 from "../../Assets/landing/hero4.jpg";
import Hero5 from "../../Assets/landing/hero5.jpg";
import Hero6 from "../../Assets/landing/hero6.jpg";

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
                <img src={HTWLogo} className="w-12 mr-2" alt="" />
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
                  Unlock the potential of your data while maintaining the
                  highest levels of security and compliance with DataHaven. Our
                  cutting-edge platform is designed to provide a seamless,
                  no-code user interface (UI) experience on top of Snowflake
                  Data Clean Room, enabling organizations to collaborate on
                  sensitive data projects like never before.
                </p>
                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                  <a
                    href="#_"
                    className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-amaranth-600 rounded-md sm:mb-0 hover:bg-amaranth-700 sm:w-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 mr-1"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                        clip-rule="evenodd"
                      />
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
                <img src={Hero1} className=" object-fit " alt="" />
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
            <img src={Hero2} className="h-96 w-full" alt="" />
          </div>
          {/* Content */}
          <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
              Secure data collaboration
            </h2>
            <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
              DataHaven provides a secure environment for collaboration,
              enabling multiple stakeholders to collaborate on sensitive data
              projects without the risk of unauthorized access or data breaches.
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
          <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-30 ml-10">
            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
              Scalable and Flexible
            </h2>
            <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
              Whether you're working with small datasets or large-scale
              enterprise data, DataHaven scales seamlessly to meet your needs.
              It integrates with Snowflake's powerful data warehousing
              capabilities, ensuring high performance and reliability.
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
          <div className="w-full h-96  relative overflow-hidden rounded-md shadow-xl sm:rounded-xl md:w-1/2">
            <img src={Hero3} className="h-96 w-full object-cover" alt="" />
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
                  You don't need to be a data expert or have coding skills to
                  work with DataHaven. Our user-friendly UI empowers anyone to
                  leverage the power of Snowflake Data Clean Room effortlessly.
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
                alt="feature_image"
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
              alt="feature_image"
            />
          </div>
          {/* Content */}
          <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
              Compliance first approach
            </h2>
            <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
              We understand the importance of regulatory compliance. DataHaven
              ensures that your data collaboration meet industry-specific
              regulations and standards such as GDPR, HIPPA and CCPA.
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
              DataHaven provides robust data governance and auditing
              capabilities, allowing you to track data usage, monitor user
              activities, and maintain a complete audit trail for compliance and
              accountability.
            </p>
          </div>
          {/* End  Content */}
          {/* Image */}
          <div className="w-full h-96  relative overflow-hidden rounded-md shadow-xl sm:rounded-xl md:w-1/2">
            <img src={Hero6} className="object-cover w-full h-96" alt="" />
          </div>
        </div>
      </section>
      {/* Section USECASE */}
      
      <section class="relative pt-16 bg-blueGray-50">
        <div class="container mx-auto">
          <div class="flex flex-wrap items-center">
            <div class="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-amaranth-700">
                <img alt="..." src={"https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=700&amp;q=80"} class="w-full align-middle rounded-t-lg"/>
                  <blockquote class="relative p-8 mb-4">
                    <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" class="absolute left-0 w-full block h-95-px -top-[64px]">
                      <polygon points="-30,95 583,95 583,65" class="text-amaranth-700 fill-current"></polygon>
                    </svg>
                    <h4 class="text-xl font-bold text-white">
                      Data Monetization
                    </h4>
                    <p class="text-md font-light mt-2 text-white">
                        Unlock the hidden value of your data with Data Monetization. Transform your organization's data into a revenue-generating asset by leveraging insights, analytics, and partnerships. Monetize data through targeted marketing campaigns, data-as-a-service offerings, and strategic collaborations, driving business growth and unlocking new revenue streams.  
                    </p>
                  </blockquote>
              </div>
            </div>

            <div class="w-full md:w-6/12 px-4">
              <div class="flex flex-wrap">
                <div class="w-full md:w-6/12 px-4">
                  <div class="relative flex flex-col mt-4">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i class="fas fa-sitemap text-amaranth-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                          </svg>
                        </i>
                      </div>
                      <h6 class="text-xl mb-1 font-semibold">Match Rate Efficiency</h6>
                      <p class="mb-4 text-blueGray-500 text-sm">
                          Achieve superior data matching with our advanced matching rate capabilities. Increase data quality and accuracy by efficiently identifying and linking related records. Maximize operational efficiency and decision-making by leveraging a high matching rate, enabling precise data analysis and insights. 
                      </p>
                    </div>
                  </div>
                  <div class="relative flex flex-col min-w-0">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i class="fas fa-drafting-compass text-amaranth-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                          </svg>
                        </i>
                      </div>
                      <h6 class="text-xl mb-1 font-semibold">
                        Customer Enrichment & Customer Overlap 
                      </h6>
                      <p class="mb-4 text-blueGray-500 text-sm">
                        Unlock a deeper understanding of your customer base with customer enrichment and overlap analysis. Enhance customer profiles by appending additional data attributes, such as demographics, preferences, and purchasing behavior. Identify customer overlap across various datasets to uncover cross-selling and upselling opportunities. Utilize enriched customer insights to personalize marketing campaigns, improve customer segmentation, and boost overall customer engagement and retention. Maximize the value of your customer data through effective enrichment and overlap analysis. 
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-6/12 px-4">
                  <div class="relative flex flex-col min-w-0 mt-4">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i class="fas fa-newspaper text-amaranth-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                          </svg>
                        </i>
                      </div>
                      <h6 class="text-xl mb-1 font-semibold">Run an AD Campaign </h6>
                      <p class="mb-4 text-blueGray-500 text-sm">
                      Launch a targeted advertising campaign to reach your desired audience with precision. Utilize advanced audience segmentation and data analytics to identify the most relevant customer segments for your products or services. Deliver personalized messages and advertisements across multiple channels to maximize campaign effectiveness. Measure campaign performance in real-time, optimize ad placements, and achieve higher engagement and conversion rates. Run an AD campaign that drives results and maximizes your return on investment. 
                      </p>
                    </div>
                  </div>
                  <div class="relative flex flex-col min-w-0">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i class="fas fa-file-alt text-amaranth-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                          </svg>

                        </i>
                      </div>
                      <h6 class="text-xl mb-1 font-semibold">Integrations with Facebook and meta-ads</h6>
                      <p class="mb-4 text-blueGray-500 text-sm">
                      Seamlessly integrate your marketing efforts with Facebook and Meta Ads platforms for enhanced reach and impact. Connect your customer data and insights to create highly targeted ad campaigns. Leverage the powerful targeting capabilities and extensive user base of Facebook and Meta Ads to expand your brand's visibility and engage with the right audience. Optimize ad placements, track campaign performance, and refine your strategies based on real-time analytics. Drive conversions, increase brand awareness, and maximize ROI through seamless integrations with Facebook and Meta Ads. 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <h4 className="font-bold text-gray-800">John Doe</h4>
                    <p className="text-gray-600">CEO of Something</p>
                  </div>
                </div>
                <blockquote className="mt-8 text-lg text-gray-500">
                  "This is a no-brainer if you want to take your business to the
                  next level. If you are looking for the ultimate toolset, this
                  is it!"
                </blockquote>
              </div>
              <div className="flex flex-col items-start justify-start w-full h-auto px-0 mx-0 mb-12 border-l border-r border-transparent lg:w-1/3 lg:mb-0 lg:px-8 lg:mx-8 lg:border-gray-200">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 mr-4 overflow-hidden bg-gray-200 rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2547&q=80"
                      className="object-cover w-full h-full"
                      alt=""
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
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <h4 className="font-bold text-gray-800">John Smith</h4>
                    <p className="text-gray-600">Creator of Stuff</p>
                  </div>
                </div>
                <blockquote className="mt-8 text-lg text-gray-500">
                  "Packed with awesome content and exactly what I was looking
                  for. I would highly recommend this to anyone."
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
            <img src={HTWLogo} className="w-14" />
          </div>
          <p className="mt-8 text-base leading-6 text-center text-gray-400">
            © 2023 Hoonartek. All rights reserved.
          </p>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
