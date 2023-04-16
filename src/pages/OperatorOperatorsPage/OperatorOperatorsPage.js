import s from './OperatorOperatorsPage.module.css'
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { Input } from '../../components/UI/Input/Input';
import { api } from '../../lib/api';
import { CircularProgress } from '@mui/material';

const columns = [
    {
        name: 'Email',
        selector: row => row.email,
    },
    {
        name: 'First name',
        selector: row => row.first_name,
    },
    {
        name: 'Second name',
        selector: row => row.second_name,
    }
]

export const OperatorOperatorsPage = () => {
    const [filterBy, setFilterBy] = useState('')
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!users?.length){
            setIsLoading(true)
            setError('')

            const url = '/api/operators'
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

    function handleFilterChange (e) {
        const value = e.target.value

        setFilterBy(value)
    }

    const filteredUsers = filterBy ? users.filter(user =>
        user.email.toLowerCase().includes(filterBy.toLowerCase()) ||
        user.first_name.toLowerCase().includes(filterBy.toLowerCase()) ||
        user.second_name.toLowerCase().includes(filterBy.toLowerCase())) : users

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
