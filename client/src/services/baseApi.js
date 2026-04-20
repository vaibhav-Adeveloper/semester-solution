// RTK Query :-

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:2000/api/v1/student/branch/semester"
    }),
    endpoints: () => ({}),
}) 