import type { Client, SessionLog } from "./types.ts"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface ClientState {
    clients: Client[]
    logs: SessionLog[]
    loading: boolean
    error: string | null
}

const initialState: ClientState = {
    clients: [],
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
        },

        updateClient(state, action: PayloadAction<Client>) {
            const index = state.clients.findIndex(c => c.id === action.payload.id)
            if (index !== -1) {
                state.clients[index] = action.payload
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

export const { setClients, updateClient, addLog, clearLogs, setLoading, setError } = clientSlice.actions

export default clientSlice.reducer
