import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchClients } from '../entities/client/api/clientApi'
import { setClients, setLoading, setError } from '../entities/client/model/clientSlice'
import type {AppDispatch} from "../app/store.ts";

export const useClientLogic = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
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
    }, [dispatch])
}
