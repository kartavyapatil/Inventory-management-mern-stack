import { Router } from 'express';
import authRoutes from './Auth.service.js';
// import kRoutes from './k.route.js';
// import consumer from './consumer.sevice.js'
import consumer from "./consumer.service.js"
import product from "./product.service.js"
import order from "./order.service.js"
const router = Router();

const routes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path:"/consumer",
    route:consumer
  },{
    path:"/product",
    route:product
  },{
    path:"/order",
    route:order
  }
//   {
//     path: '/',
//     route: kRoutes,
//   },
];

routes.forEach((cur) => {
  router.use(cur.path, cur.route);
});

export default router;
