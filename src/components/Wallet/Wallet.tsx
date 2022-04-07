import classes from "./Wallet.module.css";
import { Button } from "antd";
import { appActions } from "../../store/app-state";
import { useSelector } from "react-redux";
import { GlobalState } from "../../store";
import API from "../../services/api.service";
import { useMemo, useState } from "react";
import { notification } from "antd";
import { useDispatch } from "react-redux";

const Wallet = () => {
  const wallet = useSelector((state: GlobalState) => state.app.wallet);
  const [getWalletLoading, setGetWalletLoading] = useState<boolean>(false);
  const [createWalletLoading, setCreateWalletLoading] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const api = useMemo(() => new API(), []);

  const getWallet = async () => {
    setGetWalletLoading(true);
    let wallet;
    try {
      const res = await api.getWallet();
      wallet = res;
      showWalletNotificationSuccess(res);
    } catch {
      wallet = null;
      notification.error({
        message: "Error",
        description: "Error while getting wallet",
      });
    }
    setGetWalletLoading(false);
    dispatch(appActions.updateWallet(wallet));
  };

  const createWallet = async () => {
    let wallet = {};
    setCreateWalletLoading(true);
    try {
      const res = await api.createWallet();
      wallet = res;
      showWalletNotificationSuccess(res);
    } catch (err) {
      notification.error({
        message: "Error",
        description: `Error while creating wallet`,
      });
    }
    setCreateWalletLoading(false);
    dispatch(appActions.updateWallet(wallet));
  };

  const showWalletNotificationSuccess = (res: any) => {
    notification.success({
      message: "Success",
      description: (
        <div>
          {" "}
          <p>
            <strong>Public Key</strong>: {res.public_key}
          </p>{" "}
          <p>
            <strong>Private Key</strong>: {res.private_key}
          </p>
        </div>
      ),
    });
  };
  return (
    <>
      <div className={classes.container}>
        <div className="actions_container">
          <Button
            type="primary"
            loading={createWalletLoading}
            disabled={createWalletLoading}
            onClick={createWallet}
          >
            Create New Wallet
          </Button>
          <Button
            loading={getWalletLoading}
            disabled={getWalletLoading}
            onClick={getWallet}
          >
            Load Wallet
          </Button>
        </div>
        <h3>Funds: {wallet.funds ?? 0}</h3>
      </div>
      <hr />
    </>
  );
};

export default Wallet;
