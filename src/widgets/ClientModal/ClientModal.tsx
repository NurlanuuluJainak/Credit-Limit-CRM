import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateClient, addLog } from '../../entities/client/model/clientSlice.ts'
import { maskAccount, isValidLimit, isSpecialRisk, buildLimitLog } from '../../shared/utils.ts'
import type { RootState } from '../../app/store.ts'
import "./ClientModal.css"

interface Props {
    id: string
    onClose: () => void
}

const ClientModal = ({ id, onClose }: Props) => {
    const dispatch = useDispatch()
    const client = useSelector((s: RootState) =>
        s.clients.clients.find(c => c.id === id)
    )

    const [limit, setLimit] = useState(client?.requestedLimit || 0)
    const [reason, setReason] = useState('')

    if (!client) return null

    const handleSave = () => {
        if (!isValidLimit(limit)) {
            alert('Неверный лимит')
            return
        }

        if (isSpecialRisk(limit) && !reason) {
            alert('Причина обязательна')
            return
        }

        dispatch(updateClient({ ...client, requestedLimit: limit }))
        dispatch(addLog(buildLimitLog(client.name, client.currentLimit, limit)))
        onClose()
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                <h3>{client.name}</h3>
                <p>Счет: {maskAccount(client.account)}</p>

                <input
                    type="number"
                    value={limit}
                    onChange={e => setLimit(Number(e.target.value))}
                />

                <select value={reason} onChange={e => setReason(e.target.value)}>
                    <option value="">Причина</option>
                    <option value="Standard">Стандартная</option>
                    {isSpecialRisk(limit) && <option value="Risk">Особый риск</option>}
                </select>

                <div className="modal-buttons">
                    <button className="save-btn" onClick={handleSave}>Сохранить</button>
                    <button className="close-btn" onClick={onClose}>Закрыть</button>
                </div>
            </div>
        </div>
    )
}

export default ClientModal
