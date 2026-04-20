// RTK Query :-

import { api } from "./baseApi"

export const resourceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBranchResources: builder.query({
            query: ({branch, semester}) => ({
                url: "/resources",
                method: "POST",
                body: {branch, semester}
            })
        })
    })
})

export const { useGetBranchResourcesQuery } = resourceApi;