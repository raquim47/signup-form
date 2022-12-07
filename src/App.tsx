import { Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import "./style.css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
