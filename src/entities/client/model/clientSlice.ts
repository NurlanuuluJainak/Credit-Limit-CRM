import type { Client, SessionLog } from "./types.ts"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface ClientState {
    clients: Client[]
    logs: SessionLog[]
    loading: boolean
    error: string | null
}

const initialState: ClientState = {
    clients: JSON.parse(localStorage.getItem('clients') || '[]'),
    logs: JSON.parse(localStorage.getItem('sessionLogs') || '[]'),
    loading: false,
    error: null
}

const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setClients(state, action: PayloadAction<Client[]>) {
            state.clients = action.payload
            localStorage.setItem('clients', JSON.stringify(state.clients))
        },

        updateClient(state, action: PayloadAction<Client>) {
            const index = state.clients.findIndex(c => c.id === action.payload.id)
            if (index !== -1) {
                state.clients[index] = action.payload
                localStorage.setItem('clients', JSON.stringify(state.clients))
            }
        },

        addLog(state, action: PayloadAction<string>) {
            const newLog: SessionLog = {
                id: Date.now().toString(),
                message: action.payload,
                timestamp: new Date().toISOString()
            }
            state.logs.push(newLog)

            localStorage.setItem('sessionLogs', JSON.stringify(state.logs))
        },

        clearClients(state) {
            state.clients = []
            localStorage.removeItem('clients')
        },

        clearLogs(state) {
            state.logs = []
            localStorage.removeItem('sessionLogs')
        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },

        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        }
    }
})

export const { setClients, updateClient, addLog, clearLogs, clearClients, setLoading, setError } = clientSlice.actions


export default clientSlice.reducer
