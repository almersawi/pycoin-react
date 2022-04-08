import classes from "./Blockchain.module.css";
import { Button, Collapse, Empty, notification, Spin } from "antd";
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
  const [resolveLoading, setResolveLoading] = useState(false);

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
      notification.error({
        message: "Error while mining",
        description: "There was some conflicts while mining the block. Try resolve conflicts and try again."
      })
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

  const resolveConflicts = async () => {
    setResolveLoading(true)
    try {
      const data = await api.resolveConflicts();
      dispatch(appActions.updateBlockchain(data.chain));
      dispatch(appActions.updateOpenTransactions(data.open_transactions));
      notification.success({
        message: "Blockchain",
        description: "Conflicts resolved"
      })
    }
    catch (err) {
      console.log(err)
      notification.error({
        message: "Blockchain",
        description: "Conflicts could not be resolved"
      })
    }
    setResolveLoading(false)
  }

  useEffect(() => {
    getBlockchain()
  }, [requiresUpdate])
  

  return (
    <div>
      <div className="actions_container">
      <Button loading={getChainLoading} disabled={getChainLoading} onClick={getBlockchain}>
          Update
        </Button>

        <Button loading={mineLoading} disabled={mineLoading} onClick={mine} type="dashed">
          Mine Coins
        </Button>

        <Button loading={resolveLoading} disabled={resolveLoading} onClick={resolveConflicts} type="dashed">
          Resolve Conflicts
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
