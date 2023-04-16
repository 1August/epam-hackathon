import s from './SpecialistRequestsPage.module.css'
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { Input } from '../../components/UI/Input/Input';
import { api } from '../../lib/api';
import { CircularProgress } from '@mui/material';
import { Button } from '../../components/UI/Button/Button';
import { BiPlus } from 'react-icons/bi';


const columns = [
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Description',
        selector: row => row.description,
    }
]

export const SpecialistRequestsPage = () => {
    const [filterBy, setFilterBy] = useState('')
    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!requests?.length){
            setIsLoading(true)
            setError('')

            const url = '/api/requests'
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
