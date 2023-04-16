import s from './ClientCreateRequestPage.module.scss'
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { Input } from '../../components/UI/Input/Input';
import { api } from '../../lib/api';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { Button } from '../../components/UI/Button/Button';

export const ClientCreateRequestPage = () => {
    const id = useSelector(state => state.auth.id)

    const [filterBy, setFilterBy] = useState('')
    const [request, setRequest] = useState({
        name: '',
        description: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')


    function handleFormSubmit(e) {
        e.preventDefault()

        setIsLoading(true)
        setError('')

        const url = `/api/requests/create`
        api.post(url, { ...request, client: id })
            .then(res => {
                console.log(res)
                setRequest({
                    name: '',
                    description: ''
                })
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleChange (e) {
        setRequest(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    if (isLoading) return (
        <main className={`${s.homePage} paddingPage`}>
            <CircularProgress/>
        </main>
    )
    if (error) return (
        <main className={`${s.homePage} paddingPage`}>
            <h4>{error}</h4>
        </main>
    )
    return (
        <main className={`${s.homePage} paddingPage`}>
            <h1>Send us request</h1>
            <form onSubmit={handleFormSubmit}>
                <Input
                    label={'Request name'}
                    name={'name'}
                    value={request.name}
                    onChange={handleChange}
                />
                <Input
                    label={'Description'}
                    name={'description'}
                    value={request.description}
                    onChange={handleChange}
                />
                <Button
                    type={'submit'}
                    className={s.btn}
                >
                    Create task
                </Button>
            </form>
        </main>
    )
}
