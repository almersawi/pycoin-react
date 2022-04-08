import Wallet from "../../components/Wallet";
import SendTransaction from "../../components/SendTransaction";
import Blochchain from "../../components/Blockchain";
import OpenTransactions from "../../components/OpenTransactions";

import { Tabs } from 'antd';

const WalletAndNode = () => {
    const { TabPane } = Tabs;
  return (
    <>
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
    </>
  );
};

export default WalletAndNode;
