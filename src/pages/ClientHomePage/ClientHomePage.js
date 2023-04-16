import s from './ClientHomePage.module.scss'
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { Input } from '../../components/UI/Input/Input';
import { api } from '../../lib/api';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const columns = [
    {
        name: 'Email',
        selector: row => row.email,
    },
    {
        name: 'Company name',
        selector: row => row.company_name,
    },
    {
        name: 'Company address',
        selector: row => row.company_address,
    },
    {
        name: 'Phone number',
        selector: row => row.phone_number,
    },
    {
        name: '',
        selector: row => <h1>{row._id + '--'}</h1>
    }
]

export const ClientHomePage = () => {
    const id = useSelector(state => state.auth.id)

    const [filterBy, setFilterBy] = useState('')
    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!requests?.length && id !== null){
            setIsLoading(true)
            setError('')

            const url = `/api/clients/${id}/requests`
            api.get(url)
                .then(res => {
                    setRequests(res.data.data)
                })
                .catch(error => {
                    setError(error.message)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [])

    useEffect(() => {
        console.log(requests)
    }, [])

    function handleFilterChange (e) {
        const value = e.target.value

        setFilterBy(value)
    }

    const filteredUsers = filterBy ? requests.filter(user =>
        user.email.toLowerCase().includes(filterBy.toLowerCase()) ||
        user.company_name.toLowerCase().includes(filterBy.toLowerCase()) ||
        user.company_address.toLowerCase().includes(filterBy.toLowerCase())) : requests

    if (isLoading) return (
        <main className={`${s.homePage} paddingPage`}>
            <Input type='text' onChange={handleFilterChange} placeholder={'Search parameter'}/>
            <CircularProgress/>
        </main>
    )
    if (error) return (
        <main className={`${s.homePage} paddingPage`}>
            <Input type='text' onChange={handleFilterChange} placeholder={'Search parameter'}/>
            <h4>{error}</h4>
        </main>
    )
    return (
        <main className={`${s.homePage} paddingPage`}>
            <Input type='text' onChange={handleFilterChange} placeholder={'Search parameter'}/>
            <DataTable columns={columns} data={filteredUsers}/>
        </main>
    )
}
