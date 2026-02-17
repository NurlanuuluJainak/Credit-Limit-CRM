export type Status = 'New' | 'Approved' | 'Rejected'

export interface Client {
    id: string
    name: string
    account: string
    currentLimit: number
    requestedLimit: number
    currency: string
    status: Status
}

export interface SessionLog {
    id: string
    message: string
    timestamp: string
}
