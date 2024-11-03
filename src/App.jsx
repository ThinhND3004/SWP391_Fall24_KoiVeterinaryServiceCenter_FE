import { BrowserRouter } from "react-router-dom"
import RouteComponent from "./routes"
import NotificationHandler from "./components/NotificationHandler"
import { GoogleOAuthProvider } from "@react-oauth/google"
import BackdropComponent from "./components/Backdrop.component"

function App() {

  return (
    <>
      {/* <div>
      <NotificationHandler />
    </div> */}
      <GoogleOAuthProvider clientId="510907958584-4eatd4rjtntoiokfc352dds2q9ad7av0.apps.googleusercontent.com">
        <BrowserRouter>
          <RouteComponent />
        </BrowserRouter>
      </GoogleOAuthProvider >
    </>
  )
}

export default App
