import React from "react";

const LandingPage = React.lazy(() =>
  import("../../screens/LandingPage/LandingPage")
);
const BookDoctor = React.lazy(() =>
  import("../../screens/BookDoctor/BookDoctor")
);

export const screenNames = {
  landingPage: "/",
  bookDoctor: "/doctor",
};

export const routes = {
  [screenNames.landingPage]: {
    component: <LandingPage />,
    displayName: "Home",
  },
  [screenNames.bookDoctor]: {
    component: <BookDoctor />,
    displayName: "Book a Doctor",
  },
};
