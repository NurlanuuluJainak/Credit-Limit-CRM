import {useDispatch, useSelector} from 'react-redux'
import type {RootState} from "../../app/store.ts";
import './SessionLog.css'
import {clearLogs} from "../../entities/client/model/clientSlice.ts";

const SessionLog = () => {
    const dispatch = useDispatch()
    const { logs } = useSelector((s: RootState) => s.clients)

    return (
        <div className="session-log">
            <h3>Лог сессии</h3>
            <button  onClick={() => dispatch(clearLogs())}>Очистить лог</button>
            {logs.map(log => (
                <div key={log.id} className="log-item">
                    <span className="log-time">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    <span>{log.message}</span>
                </div>
            ))}
        </div>
    )
}

export default SessionLog
