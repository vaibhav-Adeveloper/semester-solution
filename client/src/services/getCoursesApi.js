// RTK Query :-
// Injecting Courses Endpoint :-

import { api } from "./baseApi"

export const courseApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBranchCourses: builder.query({
            query: ({branch}) => ({
                url: "/courses",
                method: "POST",
                body: {branch}
            })
        })
    })
})

export const { useGetBranchCoursesQuery } = courseApi;