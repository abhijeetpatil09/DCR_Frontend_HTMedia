import React from 'react';
import HTWLogo from "../../../Assets/hoonartek-logo.png";
import Beam from "../../../Assets/beams-basic.png";

const PrivacyPolicy = () => {

    return (
        <div>
            {/* Section 1 */}
            <section className="relative z-50  w-full px-8 text-gray-700 bg-transparent">
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

            <div class="relative -mt-[5.75rem] overflow-hidden pt-[5.75rem]">
                <img src={Beam} alt="" class="absolute left-1/2 top-0 -ml-[39rem] w-[113.125rem] max-w-none" />
                <div class="px-4 sm:px-6 lg:px-8">
                    <div class="relative mx-auto max-w-[37.5rem] pb-24 pt-20 text-center">
                        <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Privacy policy</h1>
                        <p class="mt-4 text-base leading-7 text-slate-600">This policy is effective from 1st July 2015</p>
                    </div>
                </div>
                <div class="relative px-4 sm:px-6 lg:px-8">
                    <div class="prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600 mx-auto max-w-[40rem]">
                        <div>
                            <h2 className='font-bold text-2xl text-gray-700 pb-2'>Hoonartek – Business Privacy Policy</h2>
                            <p>This privacy policy sets out how Hoonar Tekwurks (Hoonartek) uses and protects any information that you give us when you use this website.</p>
                            <p>HoonarTek is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.</p>
                            <p>Hoonartek may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.</p>
                        </div>
                        <div className='mt-6 text-gray-600'>
                            <h2 className='font-bold text-2xl text-gray-700 pb-2'>What we collect</h2>
                            <p className='text-gray-600'>We may collect the following information:</p>
                            <ul className='list-disc list-inside pl-6'>
                                <li>Name and job title</li>
                                <li>Contact information including email address</li>
                            </ul>
                        </div>

                        <div className='mt-6 text-gray-600'>
                            <h2 className='font-bold text-2xl text-gray-700 pb-2'>What we do with the information we gather</h2>
                            <p className='text-gray-600'>We require this information to understand your needs and either provide you with a better service or respond to your enquiry, and in particular for the following reasons:</p>
                            <ul className='list-disc list-inside pl-6'><li>Internal record keeping.</li><li>We may use the information to improve our services and offerings.</li><li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email or phone. We may use the information to customise the website according to your interests.</li></ul>
                        </div>

                        <div className='mt-6 text-gray-600'>
                            <h2 className='font-bold text-2xl text-gray-700 pb-2'>Security</h2>
                            <p className='text-gray-600'>We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.</p>
                        </div>

                        <h2 className='text-2xl font-bold text-gray-700 mt-8'>Cookies</h2>

                        <div className='mt-6 text-gray-600'>
                            <h2 className='font-bold text-2xl text-gray-700 pb-2'>Links to other websites</h2>
                            <p className='text-gray-600'>Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.</p>
                        </div>

                        <div className='mt-6 text-gray-600'>
                            <h2 className='font-bold text-2xl text-gray-700 pb-2'>Controlling your personal information</h2>
                            <p>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We will not use your personal information to send you promotional information about either ourselves or third parties.</p>
                            <p>You may request details of personal information which we hold about you under the Data Protection Act 1998. A small fee will be payable. If you would like a copy of the information held on you please write to HoonarTek, 60 Cannon Street, London EC4N 6NP.</p>
                            <p>If you believe that any information we are holding on you is incorrect or incomplete, please write to us or email us as soon as possible at the above address. We will promptly correct any information found to be incorrect.</p>
                        </div>
                    </div>
                </div>
            </div>






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

export default PrivacyPolicy;