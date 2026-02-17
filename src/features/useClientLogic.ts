import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClients } from '../entities/client/api/clientApi'
import { setClients, setLoading, setError } from '../entities/client/model/clientSlice'
import type { AppDispatch, RootState } from "../app/store"

export const useClientLogic = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { clients } = useSelector((s: RootState) => s.clients)

    useEffect(() => {
        if (clients.length > 0) return

        const load = async () => {
            dispatch(setLoading(true))
            try {
                const data = await fetchClients()
                dispatch(setClients(data))
            } catch {
                dispatch(setError('Ошибка загрузки'))
            } finally {
                dispatch(setLoading(false))
            }
        }

        load()
    }, [dispatch, clients.length])
}
