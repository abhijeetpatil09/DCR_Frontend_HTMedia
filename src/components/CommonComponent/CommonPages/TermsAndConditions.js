import React from 'react';
import HTWLogo from "../../../Assets/hoonartek-logo.png";

const TermsAndConditions = () => {

    return (
        <div>
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
                                href="#features"
                                className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                            >
                                Features
                            </a>
                            <a
                                href="#uc"
                                className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
                            >
                                Use cases
                            </a>
                            {/* <a
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
              </a> */}
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
            {/* Section 7 */}
            <section className="bg-white">
                <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                    <nav className="flex flex-wrap justify-center -mx-5 -my-2">
                        <div className="px-5 py-2">
                            <a
                                href="/privacy-policy"
                                target="_blank"
                                className="text-base leading-6 text-gray-500 hover:text-gray-900"
                            >
                                Privacy policy
                            </a>
                        </div>
                        <div className="px-5 py-2">
                            <a
                                href="/terms-and-conditions"
                                target="_blank"
                                className="text-base leading-6 text-gray-500 hover:text-gray-900"
                            >
                                Terms of services
                            </a>
                        </div>
                    </nav>
                    <div className="flex justify-center mt-8 space-x-6">
                        <img src={HTWLogo} className="w-14" alt='' />
                    </div>
                    <p className="mt-8 text-base leading-6 text-center text-gray-400">
                        © 2023 Hoonartek. All rights reserved.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default TermsAndConditions;