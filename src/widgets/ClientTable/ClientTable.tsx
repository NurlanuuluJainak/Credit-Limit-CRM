import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../features/useDebounce.ts'
import ClientModal from '../ClientModal/ClientModal.tsx'
import type {RootState} from "../../app/store.ts";
import './ClientTable.css'

const ClientTable = () => {
    const { clients } = useSelector((s: RootState) => s.clients)
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')
    const [selected, setSelected] = useState<string | null>(null)

    const debounced = useDebounce(search, 500)

    const filtered = clients.filter(c =>
        c.name.toLowerCase().includes(debounced.toLowerCase()) &&
        (status ? c.status === status : true)
    )

    return (
        <div className="table-container">
            <div className="table-controls">
                <input
                    placeholder="Поиск по ФИО"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <select onChange={e => setStatus(e.target.value)} value={status}>
                    <option value="">Все</option>
                    <option value="New">New</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            <table className="client-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Текущий лимит</th>
                    <th>Желаемый лимит</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {filtered.map(c => (
                    <tr key={c.id} onClick={() => setSelected(c.id)}>
                        <td>{c.id}</td>
                        <td>{c.name}</td>
                        <td>{c.currentLimit.toLocaleString()}</td>
                        <td>{c.requestedLimit.toLocaleString()}</td>
                        <td>{c.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selected && <ClientModal id={selected} onClose={() => setSelected(null)} />}
        </div>
    )
}

export default ClientTable
