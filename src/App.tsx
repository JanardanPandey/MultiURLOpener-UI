
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/home";
import MultiURLTab from "./Pages/MultiURLTab";



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/multi-url" element={<MultiURLTab />} />
      </Routes>
    </Router>
  );
};

export default App
