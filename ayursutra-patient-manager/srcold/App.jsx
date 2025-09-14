import React from "react";
import { RouterProvider } from "react-router-dom";
import { Mymap } from "./Router/Map";

const App = () => {
  return <RouterProvider router={Mymap} />;
};

export default App;
