import "../styles/App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import Home from "./Home/Home";
import { Notification } from "./Navbar/Notification";
import ComingSoon from "./Common/ComingSoon";
import Answers from "./Answers";
import Login from "./Authentication/Login";
import PostDetails from "./Post/PostDetails";
import CreatePost from "./Post/CreatePost";
import NotFound from "./Common/NotFound";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />

          <Route path="/notification" element={
            <PrivateRoute>
              <Notification />
            </PrivateRoute>
          } />

          <Route path="/question/:id" element={
            <PrivateRoute>
              <PostDetails />
            </PrivateRoute>
          } />

          <Route path="/CreatePost" element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          } />

          <Route path="/ComingSoon" element={
            <PrivateRoute>
              <ComingSoon />
            </PrivateRoute>
          } />

          <Route path="/Answers" element={
            <PrivateRoute>
              <Answers />
            </PrivateRoute>
          } />

        <Route path="*" element={<NotFound />} />
          
        </Routes>
      </Router>
    </>

  )
}

export default App;
