import React from "react";

const LandingPage = React.lazy(() =>
  import("../../screens/LandingPage/LandingPage")
);
const BookDoctor = React.lazy(() =>
  import("../../screens/BookDoctor/BookDoctor")
);
const Dashboard = React.lazy(() => import("../../screens/Dashboard/Dashboard"));
const OrderMeds = React.lazy(() => import("../../screens/OrderMeds/OrderMeds"));
const BookLabTest = React.lazy(() =>
  import("../../screens/BookLabTest/BookLabTest")
);

export const screenNames = {
  landingPage: "/",
  orderMedicines: "/products",
  bookDoctor: "/doctor",
  dashboard: "/dashboard",
  bookLabTest: "/lab",
};

export const routes = {
  [screenNames.landingPage]: {
    component: LandingPage,
    displayName: "Home",
  },
  [screenNames.bookDoctor]: {
    component: BookDoctor,
    displayName: "Book a Doctor",
  },
  [screenNames.dashboard]: {
    component: Dashboard,
    displayName: "Dashboard",
  },
  [screenNames.orderMedicines]: {
    component: OrderMeds,
    displayName: "Order Medicines",
  },
  [screenNames.bookLabTest]: {
    component: BookLabTest,
    displayName: "Book Lab Test",
  },
};
