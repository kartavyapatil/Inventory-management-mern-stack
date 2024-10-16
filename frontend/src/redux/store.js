import { configureStore } from '@reduxjs/toolkit'
import {setupListeners} from "@reduxjs/toolkit/query"
import { userslice } from '../slice/user.slice'
import { sliderbarslice } from '../slice/sliderbar.slice'
import { AuthApi } from '../query/Auth.query'
import { consumerApi } from '../query/user.query'
import { productApi } from '../query/product.query'
import { orderApi } from '../query/order.query'
export const store = configureStore({
  reducer: {
    [userslice.name]:userslice.reducer,
    [sliderbarslice.name]:sliderbarslice.reducer,
    [AuthApi.reducerPath]:AuthApi.reducer,
    [consumerApi.reducerPath]:consumerApi.reducer,  
    [productApi.reducerPath]:productApi.reducer,
    [orderApi.reducerPath]:orderApi.reducer
  },
  middleware:(d)=>d().concat(AuthApi.middleware,consumerApi.middleware,productApi.middleware,orderApi.middleware)
})
setupListeners(store.dispatch)