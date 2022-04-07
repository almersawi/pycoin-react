import { Form, Input, InputNumber, Button, Alert, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GlobalState } from "../../store";
import { appActions } from "../../store/app-state";
import API from "../../services/api.service";

const SendTransaction = () => {
  const [form] = useForm();
  const wallet = useSelector((state: GlobalState) => state.app.wallet);
  const api = useMemo(() => new API(), []);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const formChangeHandler = () => {
    const values = form.getFieldsValue();
    setIsValid(values.amount > 0 && values.recipient.length > 0)
  }

  const addTransaction = async () => {
    setLoading(true)
    try {
      const values = form.getFieldsValue();
      const newFunds = await api.addTransaction(values.recipient, values.amount);
      dispatch(appActions.updateFunds(newFunds));
      dispatch(appActions.updateOpenTxRequiresUpdate())
      form.setFieldsValue({amount: null, recipient: ''})
      notification.success({
        message: "Success",
        description: "Transaction added successfully",
      })
    }
    catch {
      notification.error({
        message: "Error",
        description: "Error while adding transaction",
      })
    }

    setLoading(false)
  }

  return (
    <>
      {wallet.public_key ? (
        <Form form={form} layout="vertical" onFinish={addTransaction}>
          <Form.Item label="Recipient Key" required={true} name="recipient">
            <Input placeholder="Recipient Key" onChange={formChangeHandler}/>
          </Form.Item>
          <Form.Item label="Amount of Coins" required={true} name="amount">
            <InputNumber placeholder="Amount" min={0.1} step={1} max={wallet?.funds ?? 0} onChange={formChangeHandler}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} disabled={!isValid || loading}>
              Send
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Alert
          message="You have to create or load wallet first to be able to perform transactions"
          type="warning"
        ></Alert>
      )}
      <hr />
    </>
  );
};

export default SendTransaction;
