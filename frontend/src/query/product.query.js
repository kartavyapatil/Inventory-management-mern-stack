import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1' }),
    endpoints: (builder) => ({
        addproduct: builder.mutation({
            query: (obj) => ({
                url: "/product/add-product/",
                method: "POST",
                body: obj,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
            }),
            invalidatesTags:["getproduct"]
        }),
        getallproductbyid: builder.query({
            query:(_id)=>({
                url:"/product/getbyid-product/" +_id,
                method:"GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
            }),
            providesTags:["getallproductbyid"]

        }),
        getproduct: builder.query({
            query:(obj)=>({
                url:`/product/get-product?query=${obj.query}&page=${obj.page}`,
                method:"GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
            }),
            providesTags:["getproduct"]
        }),
        update:builder.mutation({
            query:({data,_id})=>({
                url:"/product/update-product/"+_id,
                method:"PATCH",
                body:data,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
            }),
            invalidatesTags:["getproduct","getallproductbyid"]
        }),
        deleteproduct: builder.mutation({
            query: (_id) => ({
                url: "/product/delete-product/"+_id,
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
            }),
            invalidatesTags:["getproduct"]

        }),
        getproductforsearch: builder.query({
            query:()=>({
                url:`/product/getproductsearch`,
                method:"GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                  }
            }),
            providesTags:["getproduct"]

        }),
        //  getuserrforsearch: builder.query({
        //     query:()=>({
        //         url:`/consumer/getusersearch`,
        //         method:"GET",
        //         headers: {
        //             'Authorization': 'Bearer ' + localStorage.getItem("token")
        //           }
        //     }),
        //     providesTags:["GetAllConsumer"]

        // }),

        
    }),
});

export const {useAddproductMutation,useGetproductQuery ,useDeleteproductMutation,useGetallproductbyidQuery , useUpdateMutation ,useGetproductforsearchQuery}=productApi;