import type {Client, SessionLog} from "./types.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface ClientState {
    clients: Client[]
    logs: SessionLog[]
    loading: boolean
    error: string | null
}

const initialState: ClientState = {
    clients: [],
    logs: [],
    loading: false,
    error: null
}

const slice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setClients(state, action: PayloadAction<Client[]>) {
            state.clients = action.payload
        },
        updateClient(state, action: PayloadAction<Client>) {
            const index = state.clients.findIndex(c => c.id === action.payload.id)
            if (index !== -1) state.clients[index] = action.payload
        },
        addLog(state, action: PayloadAction<string>) {
            state.logs.push({
                id: Date.now().toString(),
                message: action.payload,
                timestamp: new Date().toISOString()
            })
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        }
    }
})

export const { setClients, updateClient, addLog, setLoading, setError } =
    slice.actions

export default slice.reducer
