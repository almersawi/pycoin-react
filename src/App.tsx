import classes from "./App.module.css";
import "antd/dist/antd.css";
import { Card } from "antd";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import WalletAndNode from "./pages/WalletAndNode";
import Network from "./pages/Network";

function App() {
  const header = (
    <div className={classes.header}>
      <div>
        <h3>Manage your blockchain</h3>
      </div>
      <div>
        <NavLink
          to="/wallet-and-node"
          className={({ isActive }) =>
            isActive
              ? `${classes.route_link} ${classes.active}`
              : classes.route_link
          }
        >
          {" "}
          Wallet & Blockchain{" "}
        </NavLink>
        <NavLink
          to="/network"
          className={({ isActive }) =>
            isActive
              ? `${classes.route_link} ${classes.active}`
              : classes.route_link
          }
        >
          {" "}
          Network{" "}
        </NavLink>
      </div>
    </div>
  );
  return (
    <div className={classes.container}>
      <Card title={header} style={{ borderRadius: "6px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/wallet-and-node" />}></Route>
          <Route path="/wallet-and-node" element={<WalletAndNode />}></Route>
          <Route path="/network" element={<Network />}></Route>
        </Routes>
      </Card>
    </div>
  );
}

export default App;
