import React from 'react'
import "./styles.css";
import "./pure-react.css";

const Requestinfo = () => {

  return (

    <div className="flex flex-col  w-full h-screen ">
      <div className="flex h-12 sticky top-12 px-5  py-2 bg-amaranth-800 flex-row items-center justify-between w-full">
        <h3 className="  text-lg font-light text-white">Request reports</h3>
      </div>
      <div className="flex flex-col px-5 mt-4">
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

    </div>
  )
}

export default Requestinfo