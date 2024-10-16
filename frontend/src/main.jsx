import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Routes} from "./provider/Router.jsx"
import { RouterProvider } from 'react-router-dom';
import { store } from './redux/store.js'
import {Provider} from "react-redux"
import {PrimeReactProvider} from "primereact/api"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Toaster, toast } from 'sonner'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrimeReactProvider>
    <Provider store={store }>
    <Toaster position='top-right '  />
     <RouterProvider router={Routes} />
    </Provider>
    </PrimeReactProvider>
  </React.StrictMode>,
)



