import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HTWLogo from "../../../Assets/Logos/Data_Haven_Logo.svg";
import Beam from "../../../Assets/beams-basic.png";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {/* Section 1 */}
      <section className="w-full px-8 text-gray-700 bg-white fixed bg-white z-10">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <div className="relative flex flex-col md:flex-row">
            <a
              href="/"
              className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
            >
              <span className="flex flex-row items-center mx-auto text-xl font-black leading-none text-gray-900 select-none">
                <img src={HTWLogo} className="w-52 mr-2" alt="" />
              </span>
              {/* <div className="md:border-l md:border-gray-200">
                <span className="flex flex-row ml-6 items-center mt-2 mx-auto text-xl font-black leading-none text-gray-900 select-none">
                  <img src={DiscoverLogo} className="w-28 mr-2" alt="" />
                </span>
              </div> */}
            </a>
            <nav className="hidden flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
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

      <div class="relative overflow-hidden pt-[5.75rem]">
        <img
          src={Beam}
          alt=""
          class="absolute left-1/2 top-0 -ml-[39rem] w-[113.125rem] max-w-none"
        />
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="relative mx-auto max-w-[37.5rem] pb-24 pt-20 text-center">
            <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Terms and Conditions
            </h1>
            <p class="mt-4 text-base leading-7 text-slate-600">
              Last Updated on 18th Feb 2023
            </p>
          </div>
        </div>
        <div class="relative px-4 sm:px-6 lg:px-8">
          <div class="prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600 mx-auto max-w-[40rem]">
            <div>
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                Terms of use
              </h2>
              <p>
                Please read the following terms of use (the “terms”) very
                carefully, as your use of the website (as defined below) is
                subjected to your acceptance of and compliance with the
                following terms. By clicking on the ‘i agree’ (or a similar
                button) or by downloading or installing, registering, creating
                an account, accessing or otherwise using the website in any
                manner, you accept and agree to all of the terms and conditions
                contained herein. These terms constitute a legally binding
                agreement between you and hoonartek. If you do not agree to all
                or any of these terms, do not proceed to use, access or register
                on the website. If you continue to use this website, you are
                agreeing to be bound by these terms, which along with the
                privacy policy (“privacy policy”) govern your relationship with
                us.
              </p>
            </div>
            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                1. Definitions
              </h2>
              <ol className=" list-[lower-alpha] list-decimal list-inside pl-6">
                <li>
                  The term “Hoonar Tekwurks”, “Hoonartek” “We”, “Us”, “Our”
                  shall mean and include Hoonar Tekwurks Private Limited having
                  its registered address at G03, PENTAGON P4, MAGARPATTA CITY,
                  PUNE, Maharashtra, India, 411028
                </li>
                <li>
                  “User”, “You”, “Your” shall mean and include any person who
                  visits, downloads, installs and uses the Website
                </li>
                <li>
                  “Services” shall mean the service offered by Hoonartek details
                  of which are displayed on the Website including but not
                  limited to brochures of Our products and services, case
                  studies and research papers that are made available to you
                </li>
                <li>
                  “Website‟ shall mean the website available at
                  www.hoonartek.com
                </li>
              </ol>
            </div>
            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                2. Scope Of Website
              </h2>
              <ol className=" list-[lower-alpha] list-decimal list-inside pl-6">
                <li>
                  The Website facilitates Services (as defined above) to you
                </li>
                <li>
                  Hoonartek reserves all rights not expressly granted herein.
                  Use of the Website for any purpose not expressly permitted by
                  these Terms is strictly prohibited
                </li>
              </ol>
            </div>
            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                3. Registration
              </h2>
              <ol className=" list-[lower-alpha] list-decimal list-inside pl-6">
                <li>
                  To avail the Services provided through the Website, You need
                  to complete a registration process on the signup screen on the
                  Website and create an account (“User Account”) for utilizing
                  the Services of the Website
                </li>
                <li>
                  For such registration, You shall be required to provide Your
                  email address. You will receive one-time password (“PIN”) on
                  Your email. By using the PIN, You will have to validate the
                  email address for creation of the User Account. On creation of
                  this User Account, You will be eligible for receiving further
                  alerts and instructions related to the Services made available
                  through the Website
                </li>
              </ol>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                4. User Security
              </h2>
              <ol className=" list-[lower-alpha] list-decimal list-inside pl-6">
                <li>
                  You agree to use the Website only: (i) for purposes that are
                  permitted by these Terms; and (ii) in accordance with any
                  applicable law(s), regulation(s) or generally accepted
                  practices or guidelines. You agree not to engage in any
                  activity that may adversely affect the Website or the use of
                  the Website by any other User
                </li>
                <li>
                  You agree not to access (or attempt to access) the Website by
                  any means other than through the interface that is provided by
                  Hoonartek
                </li>
              </ol>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                5. Access To The Website
              </h2>
              <ol className=" list-[lower-alpha] list-decimal list-inside pl-6">
                <li>
                  By accessing or using the Website, You represent and warrant
                  that You are of the age of majority in the jurisdiction in
                  which You reside. In the event, a minor access or uses the
                  Website at any time, it is assumed that such a minor has
                  obtained the consent of the legal guardian or parents and such
                  use is made available by the legal guardian or parents
                </li>
                <li>
                  You must not access the Website on behalf of another
                  individual or entity unless You are authorized to do so
                </li>
              </ol>
            </div>
            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                6. Hyperlinks
              </h2>
              <p>
                The Website may from time to time contain hyperlinks to other
                websites. Such links are provided for convenience only and We
                take no responsibility for the content and maintenance of or
                privacy compliance by any linked website. Any hyperlink on the
                Website to another website does not imply Our endorsement,
                support, or sponsorship of the operator of that website and/or
                of the information or services which it provides. Hoonartek is
                not a party to any transaction between You and such website
              </p>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                7. Content Available
              </h2>
              <p>
                Hoonartek shall not be held liable under any circumstances
                including, but not limiting to any infringement, errors,
                damages, fraud, misrepresentations, direct or indirect losses,
                future business loss, Services liability, claims or omission of
                information or details posted, or any link accessible or made
                available through this Website. You understand that by using
                this Website, You may be exposed to content that may be
                incomplete, old, offensive and/or objectionable due to any
                reason whatsoever. You agree that You are solely responsible for
                Your use of the Services made available through the Website, and
                Hoonartek shall not be responsible and/or liable for any
                consequences arising from such use
              </p>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                8. Confidentiality
              </h2>
              <ol className=" list-[lower-alpha] list-decimal list-inside pl-6">
                <li>
                  Confidential information, for the purpose of these Terms,
                  shall mean the information including but not limited to the
                  Services, functionalities, processes, data and information
                  regarding the Website, or other information of a confidential
                  nature disclosed by one party to the other party under these
                  Terms, in any form (“Confidential Information”)
                </li>
                <li>
                  Confidential Information shall, however, exclude any
                  information which (i) is/was publicly known or comes into
                  public domain; (ii) is received by the receiving party from a
                  third party, without breach of these Terms; (iii) was already
                  in the possession of receiving party, without confidentiality
                  restrictions, at the time of disclosure by the disclosing
                  party; (iv) is permitted for disclosure by the disclosing
                  party in writing; (v) independently developed by the receiving
                  party without the use of Confidential Information; or (vi) is
                  required to be disclosed by the receiving party pursuant to
                  any order or requirement from a court, administrative or
                  governmental agency
                </li>
                <li>
                  The receiving party agrees not to use any Confidential
                  Information for any purpose except as stated in these Terms
                </li>
                <li>
                  We may, at Our discretion, keep any personal information
                  shared by You, confidential and only use it as per the terms
                  of Our Privacy Policy
                </li>
              </ol>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                9. Ownership Of Intellectual Property Rights
              </h2>
              <ol className=" list-[lower-alpha] list-decimal list-inside pl-6">
                <li>
                  The Website and all the rights including but not limited to
                  intellectual property rights subsisting under or in relation
                  to the Website are owned by Hoonartek and its affiliates,
                  subsidiaries, licensors, etc. as the case may be. Nothing
                  contained in this section shall be deemed to grant You any
                  right to any intellectual property contained in or available
                  on the Website
                </li>
                <li>
                  All material on this Website, including but not limited to
                  audio, video, images, photographs, software, text, blogs,
                  icons and such like (the “Content”), are protected by
                  copyright under the copyright laws or any other relevant
                  intellectual property laws. You cannot use the Content, except
                  as specified herein
                </li>
                <li>
                  There may be proprietary logos, service marks and trademarks
                  found on the Website whether owned/used by Us or licensed
                  otherwise. By displaying them on the Website, We are not
                  granting You any license to utilize those proprietary logos,
                  service marks, or trademarks
                </li>
                <li>
                  You may choose to, or We may invite You or any third party to
                  submit or You may submit or take part in chats, testimonials,
                  blogs, photographs, content, whitepapers, comments,
                  newsletters, reviews, ratings about the Services, including
                  without limitation about how to improve the Services of the
                  Website (“Feedback”) on the contact form available on the
                  Website. By submitting such Feedback, You agree that Your
                  disclosure is gratuitous, unsolicited and without restriction
                  and will not place Hoonartek under any fiduciary or other
                  obligation to maintain the secrecy of such Feedback, and that
                  We are free to use the Feedback, without any additional
                  compensation to You, and/or to disclose the same on a
                  non-confidential basis or otherwise to anyone
                </li>
                <li>
                  In case You wish to submit any oral Feedback , please write to
                  us on{" "}
                  <a
                    href="mailto:info@hoonartek.com"
                    className="text-blue-500 hover:text-blue-600 visited:text-blue-900"
                  >
                    info@hoonartek.com
                  </a>
                </li>
              </ol>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                10. Prohibited Conduct
              </h2>
              <p>You agree not to engage in any of the following activities:</p>
              <ol className=" list-[lower-alpha] list-decimal list-inside pl-6">
                <li>
                  Violating laws and rights: You may not (a) use the Website for
                  any illegal purpose or in violation of any local, state,
                  national, or international laws, (b) violate or encourage
                  others to violate any right of or obligation to a third party,
                  including but not limited to infringing, misappropriating, or
                  violating intellectual property, confidentiality, or privacy
                  rights, (c) rebroadcast or transmit the Content, (d) modify
                  the Website in any manner, including but not limited to, by
                  removing identification, copyright or other proprietary
                  notices from the Website Content, or by framing, mirroring, or
                  utilizing similar techniques
                </li>
                <li>
                  Solicitation: You may not use the Website, or any information
                  provided through the Website for the transmission of
                  advertising or promotional materials, including junk mail,
                  spam, chain letters, pyramid schemes, or any other form of
                  unsolicited or unwelcome solicitation
                </li>
                <li>
                  Disruption: You may not use the Website in any manner that
                  could disable, overburden, damage, or impair the Website, or
                  interfere with any other User’s use and enjoyment of the
                  Website; including but not limited by:
                  <ul className="list-[lower-roman] list-inside ml-6">
                    <li>
                      uploading or otherwise disseminating any virus, adware,
                      spyware, worm or other malicious code, or
                    </li>
                    <li>
                      interfering with or disrupting any network, equipment, or
                      server connected to or used to provide the Website, or
                      violating any regulation, policy, or procedure of any
                      network, equipment, or server, or
                    </li>
                    <li>
                      modifying, merging, revising or enhancing the Website in
                      any way, or
                    </li>
                    <li>
                      decompiling, disassembling, reverse engineering the
                      Website in any manner whatsoever
                    </li>
                  </ul>
                </li>
                <li>
                  Developing competing offerings:
                  <ul className="list-[lower-roman] list-inside ml-6">
                    <li>
                      You will not use the Website to develop any competing
                      websites, or services which are similar or substantially
                      similar to the Website
                    </li>
                    <li>
                      You understand and acknowledge that if You indulge in any
                      of the prohibited conduct stated above, and it is brought
                      to the notice of Hoonartek, Hoonartek may terminate Your
                      right to use the Website and the Services and take any
                      other corrective action as it deems fit
                    </li>
                  </ul>
                </li>
              </ol>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                11. Term And Termination
              </h2>
              <p>
                Hoonartek reserves the right to terminate Your right and access
                to use the Website with or without any reason whatsoever.
                Additionally, Your right to access and use the Website
                terminates automatically upon Your material breach of these
                Terms.
              </p>
              <p>
                Survival: The Disclaimer of Warranties, the Limitation of
                Liability, Indemnity and the Jurisdiction and Applicable Laws
                provisions will survive any termination of these Terms.
              </p>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                12. Disclaimer Of Warranties
              </h2>
              <p>
                You expressly acknowledge and agree that use of the website and
                the services provided through it is entirely at your own risk
                and that the website and the information therein are provided on
                an “as is” or “as available” basis, without any warranties of
                any kind. To the fullest extent permitted by law, hoonartek, its
                officers, directors, employees, and agents disclaim all
                warranties, express or implied, in connection with the website,
                the services and your use thereof.
              </p>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                13. Indemnification
              </h2>
              <p>
                You agree to indemnify, defend and hold harmless Hoonartek, its
                subsidiaries and affiliates from any claim, cost, expense,
                judgment, damages or other loss arising out of or in relation to
                Your use of this Website in any manner.
              </p>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                14. Limitation of Liability
              </h2>
              <p>
                In no event shall hoonartek, its officers, directors, employees,
                or agents, be liable for any indirect, incidental, special,
                consequential or exemplary damages (even if hoonartek has been
                advised of the possibility of such damages), resulting from
                anyaspect of your use of the website, services or the
                information provided through it, including without limitation
                whether the damages arise from use or misuse of the website or
                the services, from inability to use the website or the services,
                or the interruption, suspension, modification, alteration, or
                termination of the website or the services provided through it.
              </p>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                15. Applicable Law and Jurisdiction
              </h2>
              <p>
                These Terms shall be governed for all purposes by the laws of
                India. The acceptance of the Terms shall be deemed to have been
                given at Pune, India and the courts at Pune, India shall have
                exclusive jurisdiction to entertain any proceedings in any way
                relating to or concerning these Terms or any rights, duties,
                obligations or liabilities of the parties arising under these
                Terms, to the exclusion of all other courts in Pune, India.
              </p>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                16. General
              </h2>
              <ol className=" list-[lower-alpha] list-decimal list-inside pl-6">
                <li>
                  No assignment: These Terms may not be assigned by either
                  party, in whole or in part, without prior written consent of
                  the other party. Any attempted transfer or assignment by You
                  in violation hereof shall be null and void
                </li>
                <li>
                  No agency relationship: You agree that no joint venture,
                  employment, or agency relationship exists between you and
                  Hoonartek as a result of these Terms or due to Your use of the
                  Website
                </li>
                <li>
                  No waiver: Hoonartek’s failure to insist on or enforce strict
                  performance of any of these Terms shall not be construed as a
                  waiver of any provision or right
                </li>
                <li>
                  Severability: If any part of these Terms is held to be invalid
                  or unenforceable by any law or regulation or final
                  determination of a competent court or tribunal, that provision
                  shall be deemed severable and will not affect the validity and
                  enforceability of the remaining provisions
                </li>
                <li>
                  Entire Agreement: These Terms and the Privacy Policy
                  constitute the entire agreement between You and Hoonartek
                  relating to this subject matter and supersede any and all
                  prior communications and/or agreements between You and
                  Hoonartek relating to this subject matter
                </li>
              </ol>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                17. Grievance Redressal
              </h2>
              <p>
                If You have any questions or concerns or grievances regarding
                these Terms, You can email us at Our grievance email-address
                info@hoonartek.com.
              </p>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                18. Privacy Policy
              </h2>
              <p>
                Hoonartek is committed to responsibly handling the information
                and data We may collect through the Website in compliance with
                Our Privacy Policy. Please review the Privacy Policy so that You
                are aware of how We collect and use Your personal information.
                Our Privacy Policy can be read at{" "}
                <a href="/privacy-policy">
                  {" "}
                  https://hoonartek.com/privacy-policy/.
                </a>
              </p>
            </div>

            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                19. Electronic Record
              </h2>
              <p>
                This document is an electronic record in terms of the
                Information Technology Act, 2000 and the rules framed there
                under as applicable, and the amended provisions pertaining to
                electronic records in various statutes as amended by the
                Information Technology Act, 2000. This electronic record is
                generated by a computer system and does not require any physical
                or digital signatures.
              </p>
            </div>
            <div className="mt-6 text-gray-600">
              <h2 className="font-bold text-2xl text-gray-700 pb-2">
                20. Change In Terms
              </h2>
              <p>
                We may update these Terms without notice to You. You are
                encouraged to check these Terms on a regular basis to be aware
                of the changes made to it. Your continued use of the Website
                after such change shall be deemed to be Your acceptance of the
                revised Terms.
              </p>
              <p>
                The Terms were last modified on the date as mentioned at the top
                of these Terms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 7 */}
      <section className="bg-white">
        <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center -mx-5 -my-2">
            <div className="px-5 py-2">
              <span
                onClick={() => navigate("/privacy-policy")}
                className="text-base leading-6 text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                Privacy policy
              </span>
            </div>
            <div className="px-5 py-2">
              <span
                onClick={() => navigate("/terms-and-conditions")}
                className="text-base leading-6 text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                Terms of services
              </span>
            </div>
          </nav>
          <div className="flex justify-center mt-4 space-x-6">
            <img src={HTWLogo} className="w-44" alt="" />
          </div>
          <p className="mt-4 text-base leading-6 text-center text-gray-400">
            © 2023 Hoonartek. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;