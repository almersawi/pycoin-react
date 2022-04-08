import { Transaction } from "../../models/transactions";
import { Button, Collapse, Empty, Spin } from "antd";
import "./OpenTransactions.module.css";
import { useSelector, useDispatch } from "react-redux";
import { GlobalState } from "../../store";
import { appActions } from "../../store/app-state";
import { useEffect, useMemo, useState } from "react";
import API from "../../services/api.service";

const OpenTransactions = () => {
  const data: Transaction[] = useSelector(
    (state: GlobalState) => state.app.open_transactions
  );
  const requiresUpdate = useSelector(
    (state: GlobalState) => state.app.loadOpenTransactions
  );

  const [loading, setLoading] = useState(false);
  const { Panel } = Collapse;
  const api = useMemo(() => new API(), []);

  const dispatch = useDispatch();

  const getOpenTransactions = async () => {
    setLoading(true);
    try {
      const transactions = await api.getOpenTransactions();
      dispatch(appActions.updateOpenTransactions(transactions));
    } catch {
      console.error("Error while getting open transactions");
    }
    setLoading(false);
  };

  useEffect(() => {
    getOpenTransactions();
  }, [requiresUpdate]);

  return (
    <div>
      <div className="actions_container">
        <Button loading={loading} disabled={loading} onClick={getOpenTransactions}>Update</Button>
      </div>
      {data.length > 0 && !loading && (
        <Collapse>
          {data.map((transaction, index) => {
            return (
              <Panel key={index} header={"Transaction #" + index}>
                <div>
                  <p>Sender: {transaction.sender}</p>
                  <p>Recipient: {transaction.recipient}</p>
                  <p>Amount: {transaction.amount}</p>
                </div>
              </Panel>
            );
          })}
        </Collapse>
      )}

      {data.length === 0 && !loading && (
        <Empty description="No transactions to show" />
      )}

      {loading && <Spin />}
    </div>
  );
};

export default OpenTransactions;
