import classes from './Nodes.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from "../../store/index";
import { useEffect, useMemo, useState } from 'react';
import { Empty, Spin, Tooltip } from 'antd';
import API from "../../services/api.service";
import { appActions } from "../../store/app-state";

const Nodes = () => {
    const data = useSelector((state: GlobalState) => state.app.nodes);
    const [loading, setLoading] = useState(false)
    const api = useMemo(() => new API(), [])
    const dispatch = useDispatch();

    const getNodes = async () => {
        setLoading(true)
        const nodes = await api.getNodes();
        setLoading(false)
        dispatch(appActions.updateNodes(nodes))
    }

    const deleteNode = async (node: string) => {
        await api.deleteNode(node)
        dispatch(appActions.updateNodes(data.filter(n => n !== node)))
    }

    useEffect(() => {
        getNodes()
    }, [])

    return(
        <div>
            {
                data.length == 0 && !loading &&
                <Empty description="No nodes found" />
            }
            {
                loading &&
                <Spin />
            }
            {
                data.length > 0 && !loading && 
                data.map((node, index) => {
                    return(
                        <Tooltip title="Click to delete">
                            <div key={index} className={classes.node} onClick={() => deleteNode(node)}>
                                <div className={classes.nodeName}>{node}</div>
                            </div>
                        </Tooltip>
                    )
                })
            }
        </div>
    )
}

export default Nodes;