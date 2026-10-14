import { getApplicationByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const page = async () => {
    const user = await getUserSession()
    const jobs = await getApplicationByApplicant(user.id)
    return (
        <div>
            Applications: {jobs.length}
        </div>
    );
};

export default page;