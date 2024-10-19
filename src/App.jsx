import { BrowserRouter } from "react-router-dom"
import RouteComponent from "./routes"
import NotificationHandler from "./components/NotificationHandler"

function App() {

  return (
    <>
    <div>
      <NotificationHandler />
    </div>
    <BrowserRouter>
        <RouteComponent />
      </BrowserRouter></>
  )
}

export default App
