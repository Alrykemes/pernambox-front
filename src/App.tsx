import SignIn from "@/pages/SignIn.tsx";
import { Route, Routes } from "react-router-dom";
import PasswordRecovery from "./pages/PasswordRecovery";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/password-recovery" element={<PasswordRecovery />} />
    </Routes>
  );
}
