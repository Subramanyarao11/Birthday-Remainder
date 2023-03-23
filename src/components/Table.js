import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import useSWR from 'swr'
import { mutate } from "swr"
import Loader from './Loader'
import { convertToDate, capitalizeFirstLetter, formatDate } from '../utils/utils'

// export async function getServerSideProps() {
//     try {
//         let response = await fetch('http://localhost:3000/api/birthday');
//         let birthdays = await response.json();

//         return {
//             props: { birthdays: JSON.parse(JSON.stringify(birthdays)) },
//         };
//     } catch (e) {
//         console.error(e);
//     }
// }





function Table() {

    const fetcher = async () => {
        const res = await axios.get("/api/birthday");
        return convertToDate(res.data.data)
    }

    const { data, error } = useSWR('birthdays', fetcher)
    // console.log(data)
    if (error) return <div className='text-center text-red-800'>failed to load</div>
    if (!data) return <Loader />

    const deleteBirthday = async (id) => {
        await axios.delete(`/api/${id}`)
        mutate('birthdays');
    };

    return (
        <>
            <main className='flex items-center justify-center'>
                <div className="bg-white shadow xl:w-3/4 2xl:w-4/5 w-full px-6 sm:px-12 py-5 sm:py-10">
                    <div className="mb-5 sm:mb-10 rounded-tl-lg rounded-tr-lg">
                        <div className="sm:flex items-center justify-between">
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Upcoming Birthdays</p>
                            <div className="flex items-center mt-4 sm:mt-0">
                                <div className="flex items-center pl-3 bg-white border rounded-md border-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                        <path d="M8.33333 13.1667C11.555 13.1667 14.1667 10.555 14.1667 7.33333C14.1667 4.11167 11.555 1.5 8.33333 1.5C5.11167 1.5 2.5 4.11167 2.5 7.33333C2.5 10.555 5.11167 13.1667 8.33333 13.1667Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17.5 17.5L12.5 12.5" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <input type="text" className="py-2.5 pl-1 w-40 sm:w-64 focus:outline-none text-sm rounded-md text-gray-600 placeholder-gray-400" placeholder="Search Birthday" />
                                </div>
                                <Link href="/add" legacyBehavior>
                                    <a className="inline-flex cursor-pointer ml-3 whitespace-nowrap items-start justify-start px-6 py-3 bg-blue-600 hover:bg-blue-500 focus:outline-none rounded">
                                        <span className="text-xs sm:text-sm font-medium leading-none text-white">Add Birthday</span>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-nowrap">
                                <thead>
                                    <tr className="h-20 w-full text-sm leading-none text-gray-600">
                                        <th className="font-normal text-left pl-10">Name</th>
                                        <th className="font-normal text-left pl-4">Date</th>
                                        <th className="font-normal text-left pl-10 w-32">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="w-full">
                                    {
                                        data.sort((a, b) => a.date - b.date)
                                            .map((bd) => (
                                                <tr key={bd._id} className="h-20 text-sm leading-none text-gray-700 border-b border-t border-gray-200 bg-white hover:bg-gray-50">
                                                    <td className="pl-10">
                                                        <div className="flex items-center">
                                                            {capitalizeFirstLetter(bd.name)}
                                                        </div>
                                                    </td>
                                                    <td className="pl-4">{formatDate(bd.date)}</td>
                                                    <td className="pl-10">
                                                        <div className="flex items-center">
                                                            <Link href={`/edit/${bd._id}`} legacyBehavior>
                                                                <a className="focus:outline-none bg-gray-200 mr-5 hover:bg-gray-100 py-2.5 px-5 rounded text-sm leading-3 text-gray-500">Edit</a>
                                                            </Link>
                                                            <a onClick={() => deleteBirthday(bd._id)} className="focus:outline-none cursor-pointer bg-red-600 mr-5 hover:bg-red-500 py-2.5 px-5 rounded text-sm leading-3 text-gray-100">Delete</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Table
