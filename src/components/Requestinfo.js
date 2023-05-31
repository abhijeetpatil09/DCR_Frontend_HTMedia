import React from 'react'
import "./styles.css";
import "./pure-react.css";

const Requestinfo = () => {

  return (

    <div className="flex flex-col  w-full h-[calc(100vh - 60px)] bg-gray-100 " style={{height: "calc(100vh - 90px)"}}>
      <div className="flex h-12 sticky top-12 px-5  py-2 bg-amaranth-800 flex-row items-center justify-between w-full">
        <h3 className="  text-lg font-light text-white">Request reports</h3>
      </div>
      <div className="flex flex-col px-5 mt-4 hidden">
        <table className='table-fixed  text-left text-sm'>
          <thead>
            <tr className="bg-amaranth-50 text-amaranth-900 uppercase text-sm leading-normal border-t border-l ">
              <th className="px-4 py-2 w-4">Query Request</th>
              <th className="px-4 py-2 w-4 border-r">Download Link</th>
            </tr>
          </thead>
          <tbody  className="text-gray-600 text-sm font-light">
            <tr className='border-b border-gray-200 hover:bg-gray-100'>
              <td className='border border-l-0 px-4 py-2'>Previous month</td>
              <td className='border border-l-0 px-4 py-2' key='download-link.com'>
                <a href='download-link.com' className='flex flex-row items-center' target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                  <span className='pl-2'>Link</span>
                </a>
              </td>
            </tr>
            <tr className='border-b border-gray-200 hover:bg-gray-100'>
              <td className='border border-l-0 px-4 py-2'>Last 10 Days</td>
              <td className='border border-l-0 px-4 py-2' key='download-link.com'>
                <a href='download-link.com' className='flex flex-row items-center' target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                  <span className='pl-2'>Link</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap  mt-4">
        <div className="w-full max-w-full px-3 sm:flex-0 shrink-0 sm:w-6/12 lg:w-4/12">
          <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white dark:bg-gray-950 shadow-soft-xl dark:shadow-soft-dark-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap -mx-3">
                <div className="flex-none w-2/3 max-w-full px-3">
                  <div>
                    <p className="mb-0 font-sans font-semibold leading-normal text-sm dark:opacity-60 text-gray-400">This month's enrichment requests</p>
                    <h5 className="mb-0 font-bold dark:text-white">
                      530
                      <span className="leading-normal text-sm font-weight-bolder text-lime-500 pl-2">+2%</span>
                    </h5>
                  </div>
                </div>
                <div className="w-4/12 max-w-full px-3 text-right flex-0">
                  <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                    <i className="ni leading-none ni-money-coins text-lg relative top-3.5 text-white" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                      </svg>

                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-full px-3 mt-6 sm:flex-0 shrink-0 sm:mt-0 sm:w-6/12 lg:w-4/12">
          <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white dark:bg-gray-950 shadow-soft-xl dark:shadow-soft-dark-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap -mx-3">
                <div className="flex-none w-2/3 max-w-full px-3">
                  <div>
                    <p className="mb-0 font-sans font-semibold leading-normal text-sm dark:opacity-60 text-gray-400">This months's Match requests</p>
                    <h5 className="mb-0 font-bold dark:text-white">
                      +3,462
                      <span className="leading-normal text-red-600 text-sm font-weight-bolder pl-0">-2%</span>
                    </h5>
                  </div>
                </div>
                <div className="w-4/12 max-w-full px-3 text-right flex-0">
                  <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl">
                    <i className="ni leading-none ni-paper-diploma text-lg relative top-3.5 text-white" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M9.638 1.093a.75.75 0 01.724 0l2 1.104a.75.75 0 11-.724 1.313L10 2.607l-1.638.903a.75.75 0 11-.724-1.313l2-1.104zM5.403 4.287a.75.75 0 01-.295 1.019l-.805.444.805.444a.75.75 0 01-.724 1.314L3.5 7.02v.73a.75.75 0 01-1.5 0v-2a.75.75 0 01.388-.657l1.996-1.1a.75.75 0 011.019.294zm9.194 0a.75.75 0 011.02-.295l1.995 1.101A.75.75 0 0118 5.75v2a.75.75 0 01-1.5 0v-.73l-.884.488a.75.75 0 11-.724-1.314l.806-.444-.806-.444a.75.75 0 01-.295-1.02zM7.343 8.284a.75.75 0 011.02-.294L10 8.893l1.638-.903a.75.75 0 11.724 1.313l-1.612.89v1.557a.75.75 0 01-1.5 0v-1.557l-1.612-.89a.75.75 0 01-.295-1.019zM2.75 11.5a.75.75 0 01.75.75v1.557l1.608.887a.75.75 0 01-.724 1.314l-1.996-1.101A.75.75 0 012 14.25v-2a.75.75 0 01.75-.75zm14.5 0a.75.75 0 01.75.75v2a.75.75 0 01-.388.657l-1.996 1.1a.75.75 0 11-.724-1.313l1.608-.887V12.25a.75.75 0 01.75-.75zm-7.25 4a.75.75 0 01.75.75v.73l.888-.49a.75.75 0 01.724 1.313l-2 1.104a.75.75 0 01-.724 0l-2-1.104a.75.75 0 11.724-1.313l.888.49v-.73a.75.75 0 01.75-.75z" clipRule="evenodd" />
                      </svg>
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default Requestinfo