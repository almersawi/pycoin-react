import classes from "./App.module.css";
import "antd/dist/antd.css";
import { Card, Tabs } from "antd";

import Wallet from "./components/Wallet";
import SendTransaction from "./components/SendTransaction";
import Blochchain from "./components/Blockchain";
import OpenTransactions from "./components/OpenTransactions";

function App() {
  const { TabPane } = Tabs;
  return (
    <div className={classes.container}>
      <Card title={"Manage your blockchain"} style={{ borderRadius: "6px" }}>
        <Wallet />
        <SendTransaction />
        <Tabs>
          <TabPane tab="Blockchain" key="1">
            <Blochchain />
          </TabPane>
          <TabPane tab="Open Transactions" key="2">
            <OpenTransactions />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default App;
