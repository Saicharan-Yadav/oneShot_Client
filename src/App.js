import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./loginSignup/Home";
import SignUp from "./loginSignup/Signup";
import AllBlogs from "./blog/AllBlogs";
import CRUDblogs from "./blog/CreateEdit/CRUDblogs";
import Profile from "./loginSignup/Profile";
import EditBlog from "./blog/CreateEdit/EditBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Sign-up" exact element={<SignUp />} />

        <Route path="/blogs" exact element={<AllBlogs />} />

        <Route path="/blogsCrud" exact element={<CRUDblogs />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/edit" exact element={<EditBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
