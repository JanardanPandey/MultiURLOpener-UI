
import {HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/home";
import MultiURLTab from "./Pages/MultiURLTab";



const App: React.FC = () => {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<MultiURLTab />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App
