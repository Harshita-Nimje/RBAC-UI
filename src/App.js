import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopNav from "./Scencs/global/TopNav"
import { Routes, Route } from "react-router-dom"
import Dashboard from "./Scencs/dashboard"
import SideNav from "./Scencs/global/SideNav"
import User_mangement from './Scencs/user/index'
import RoleManagement from "./Scencs/Role_mange/role_management";
import Api from "./Scencs/api/api"
import Form from "./Scencs/form/index"
import BarChart from "./Components/BarChart";
import PieChart from "./Components/PieChart";

function App() {
   const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideNav />
          <main className="content">
            <TopNav />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/user" element={<User_mangement />} />
              
              <Route path="/role" element={<Api />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<BarChart />} />
              <Route path="/pie" element={<PieChart />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
