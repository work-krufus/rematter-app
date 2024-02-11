import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Camera } from "components/camera/Camera";
import { Users } from "components/users/Users";
import { EditUser } from "components/edit-user/Edit-user";
import { Navbar } from "components/navbar/Navbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route index path="users" element={<Users />} />
          <Route path="user" element={<Camera />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
