import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar/Navbar";
import UpdateDeodprice from "./components/deod/UpdateDeodprice";
import Error from "./components/Error/Error";
import BotPage from "./components/bot/BotPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/botpage" element={<BotPage />} />

        <Route path="/updateDeodprice" element={<UpdateDeodprice />} />
        <Route path="*" element={<Error />} />

      </Routes>
    </div>
  );
};

export default App;
