import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const consumerApi = createApi({
    reducerPath: 'consumerApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL}),
    tagTypes:['GetAllConsumer',"GetAllConsumerdetails"],
    endpoints: (builder) => ({
        registerconsumer: builder.mutation({
            query: (obj) => ({
                url: "/consumer/register",
                method: "POST",
                body: obj,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
            }),
            invalidatesTags:["GetAllConsumer"]
        }),
        deleteconsumer: builder.mutation({
            query: (_id) => ({
                url: "/consumer/delete/"+_id,
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
            }),
            invalidatesTags:["GetAllConsumer"]

        }),
        GetAllConsumer: builder.query({
            query:(obj)=>({
                url:`/consumer/getall?query=${obj.query}&page=${obj.page}`,
                method:"GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
            }),
            providesTags:["GetAllConsumer"]

        }),
        GetAllConsumerdetails: builder.query({
            query:(_id)=>({
                url:"/consumer/get/" +_id,
                method:"GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
            }),
            providesTags:["GetAllConsumerdetails"]

        }),

        getuserrforsearch: builder.query({
            query:()=>({
                url:`/consumer/getusersearch`,
                method:"GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
            }),
            providesTags:["GetAllConsumer"]

        }),
        update:builder.mutation({
            query:({data,_id})=>({
                url:"/consumer/update/"+_id,
                method:"PATCH",
                body:data,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
            }),
            invalidatesTags:["GetAllConsumer","GetAllConsumerdetails"]
        })

    
    }),
});

export const {useRegisterconsumerMutation,useGetAllConsumerQuery ,useDeleteconsumerMutation , useGetAllConsumerdetailsQuery ,useUpdateMutation,useGetuserrforsearchQuery} = consumerApi;
