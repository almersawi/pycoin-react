import classes from "./Blockchain.module.css";
import { Button, Collapse, Empty, Spin } from "antd";
import { Block } from "../../models/Block";
import { useEffect, useMemo, useState } from "react";
import API from "../../services/api.service";
import { appActions } from "../../store/app-state";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../store";

const Blockchain = () => {
  const api = useMemo(() => new API(), []);
  const [mineLoading, setMineLoading] = useState(false);
  const [getChainLoading, setGetChainLoading] = useState(false);
  const requiresUpdate = useSelector((state: GlobalState) => state.app.loadBlockchain)

  const dispatch = useDispatch();

  const { Panel } = Collapse;
  const data: Block[] = useSelector((state: GlobalState) => state.app.blockchain);

  const mine = async () => {
    setMineLoading(true);
    try {
      const funds = await api.mine();
      dispatch(appActions.updateFunds(funds));
      dispatch(appActions.updateOpenTxRequiresUpdate())
      getBlockchain()
    } catch {
      console.error("Error while mining");
    }

    setMineLoading(false);
  };

  const getBlockchain = async () => {
    setGetChainLoading(true);
    try {
      const chain = await api.getBlockchain();
      dispatch(appActions.updateBlockchain(chain));
    } catch {}
    setGetChainLoading(false);
  };

  useEffect(() => {
    getBlockchain()
  }, [requiresUpdate])
  

  return (
    <div>
      <div className="actions_container">
        <Button loading={mineLoading} disabled={mineLoading} onClick={mine} type="dashed">
          Mine Coins
        </Button>
      </div>
      {data.length > 0 && !getChainLoading && (
        <Collapse>
          {data.map((block, index) => {
            return (
              <Panel header={`Block #${index}`} key={index}>
                <div>
                  <p>Previous Hash: {block.previous_hash}</p>
                  <div className={classes.transactions}>
                    {block.transactions.map((transaction, i) => {
                      return (
                        <div className={classes.transaction} key={i}>
                          <p>Sender: {transaction.sender}</p>
                          <p>Recipient: {transaction.recipient}</p>
                          <p>Amount: {transaction.amount}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Panel>
            );
          })}
        </Collapse>
      )}

      {
        data.length == 0 && !getChainLoading && (
          <Empty />
        )
      }

      {
        getChainLoading && <Spin />
      }

    </div>
  );
};

export default Blockchain;
