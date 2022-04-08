import { Button, Form, Input } from "antd";
import { useMemo, useState } from "react";
import API from '../../services/api.service';
import { useDispatch } from 'react-redux';
import { appActions } from "../../store/app-state";

const AddNode = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const api = useMemo(() => new API(), []);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    setLoading(true);
    const nodes = await api.addNode(values.node);
    setLoading(false);
    dispatch(appActions.updateNodes(nodes));
    form.setFieldsValue({node: ''})
  };

  const handleInputChange = () => {
    const values = form.getFieldsValue();
    setValid(values.node?.length > 0);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Node URL" name="node">
        <Input onChange={handleInputChange} placeholder="ex. localhost:5001"/>
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        disabled={!valid || loading}
      >
        Submit
      </Button>
    </Form>
  );
};

export default AddNode;
