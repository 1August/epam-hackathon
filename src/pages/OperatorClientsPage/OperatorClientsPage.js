import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import s from './OperatorClientsPage.module.scss';
import { Input } from '../../components/UI/Input/Input';
import { CircularProgress } from '@mui/material';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Email',
        selector: row => row.email,
    },
    {
        name: 'Phone number',
        selector: row => row.phone_number,
    },
    {
        name: 'Company name',
        selector: row => row.company_name,
    },
    {
        name: 'Company address',
        selector: row => row.company_address,
    },
]

export const OperatorClientsPage = () => {
    const [filterBy, setFilterBy] = useState('')
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!users?.length) {
            setIsLoading(true)
            setError('')

            const url = '/api/clients'
            api.get(url)
                .then(res => {
                    setUsers(res.data.data)
                })
                .catch(error => {
                    setError(error.message)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [])

    function handleFilterChange(e) {
        const value = e.target.value

        setFilterBy(value)
    }

    const filteredUsers = filterBy ?
        users.filter(user =>
            user.email.toLowerCase().includes(filterBy.toLowerCase()) ||
            user.company_name.toLowerCase().includes(filterBy.toLowerCase()) ||
            user.company_address.toLowerCase().includes(filterBy.toLowerCase()) ||
            user.phone_number.toLowerCase().includes(filterBy.toLowerCase())) :
        users

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
