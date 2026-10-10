'use server'

import { serverMutation } from "../core/server"

export const createJobs = async (newJobsData) => {
    return serverMutation('/api/jobs', newJobsData);
}

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createJobs = async (newJobData) => {
//     const res = await fetch(`${baseUrl}/api/jobs`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newJobData)
//     })

//     return res.json();
// }