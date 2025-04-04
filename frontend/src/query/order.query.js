import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL}),
    endpoints: (builder) => ({
        addorder: builder.mutation({
            query: (obj) => ({
                url: "/order/addorder/",
                method: "POST",
                body: obj,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
            }),
            invalidatesTags:['getAllOrders']
        }),
        deleteorder: builder.mutation({
            query: (_id) => ({
                url: "/order/deleteorder/"+_id,
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
            }),
            invalidatesTags:['getAllOrders']
        }),
        getAllOrders: builder.query({
            query: (obj) => ({
                url: `/order/getorder?query=${obj.query}&page=${obj.page}`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }),
            providesTags: ['getAllOrders']
        }),
    })
})
export const {useAddorderMutation,useGetAllOrdersQuery,useDeleteorderMutation}=orderApi;
