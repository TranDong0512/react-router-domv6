
import { RouterProvider } from 'react-router-dom'
import { privateRouter, publicRouter } from './router/router'
import { createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([...publicRouter, ...privateRouter])
  return (
    <div>
      <RouterProvider router={router} ></RouterProvider>
    </div>
  )
}

export default App
