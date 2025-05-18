import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { privateRouter, publicRouter } from "./router/router";

const App = () => {

  const router = createBrowserRouter([...privateRouter, ...publicRouter])
  return (
    <>
      <RouterProvider router={router} />

    </>
  )
};

export default App;


