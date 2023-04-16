import s from './ClientRequestsPage.module.css'
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { Input } from '../../components/UI/Input/Input';
import { api } from '../../lib/api';
import { CircularProgress } from '@mui/material';
import { Button, SECONDARY_PRIORITY } from '../../components/UI/Button/Button';
import { BiCheck, BiPlus } from 'react-icons/bi';
import { useSelector } from 'react-redux';

export const ClientRequestsPage = () => {
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        {
            name: 'Status',
            selector: row => row.status
        }
    ]
    //     : query === 'active' ? [
    //     {
    //         name: 'Name',
    //         selector: row => row.name,
    //     },
    //     {
    //         name: 'Description',
    //         selector: row => row.description,
    //     },
    //     {
    //         name: 'Assign to me',
    //         selector: row => {
    //             function handleClick(e) {
    //                 const url = `/api/operator/${row.id}/assignRequest`
    //                 api.post(url)
    //                     .then(res => {
    //                         console.log(res)
    //                     })
    //                     .catch(error => {
    //                         console.log(error)
    //                     })
    //             }
    //
    //             return (
    //                 <Button
    //                     onClick={handleClick}
    //                     priority={SECONDARY_PRIORITY}
    //                 >
    //                     <BiPlus/>
    //                 </Button>
    //             )
    //         },
    //     },
    // ] : query === 'closed' ? [
    //     {
    //         name: 'Name',
    //         selector: row => row.name,
    //     },
    //     {
    //         name: 'Description',
    //         selector: row => row.description,
    //     },
    //     {
    //         name: 'Complete',
    //         selector: row => {
    //             function handleClick(e) {
    //                 const url = `/api/operator/${row.id}/assignRequest`
    //                 api.post(url)
    //                     .then(res => {
    //                         console.log(res)
    //                     })
    //                     .catch(error => {
    //                         console.log(error)
    //                     })
    //             }
    //
    //             return (
    //                 <Button
    //                     onClick={handleClick}
    //                     priority={SECONDARY_PRIORITY}
    //                 >
    //                     <BiCheck/>
    //                 </Button>
    //             )
    //         },
    //     },
    // ] : query === 'not_started' ? [
    //     {
    //         name: 'Name',
    //         selector: row => row.name,
    //     },
    //     {
    //         name: 'Description',
    //         selector: row => row.description,
    //     },
    //     {
    //         name: 'Assign to me',
    //         selector: row => {
    //             function handleClick(e) {
    //                 const url = `/api/operator/${row.id}/assignRequest`
    //                 api.post(url)
    //                     .then(res => {
    //                         console.log(res)
    //                     })
    //                     .catch(error => {
    //                         console.log(error)
    //                     })
    //             }
    //
    //             return (
    //                 <Button
    //                     onClick={handleClick}
    //                     priority={SECONDARY_PRIORITY}
    //                 >
    //                     <BiPlus/>
    //                 </Button>
    //             )
    //         },
    //     },
    // ] : null

    const id = useSelector(state => state.auth.id)
    const [filterBy, setFilterBy] = useState('')
    const [requests, setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!requests?.length) {
            setIsLoading(true)
            setError('')

            const url = `/api/clients/get/${id}/requests`
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

    function handleFilterChange(e) {
        const value = e.target.value

        setFilterBy(value)
    }

    const filteredUsers = filterBy ?
        requests.filter(user =>
            user.name.toLowerCase().includes(filterBy.toLowerCase()) ||
            user.description.toLowerCase().includes(filterBy.toLowerCase())) :
        requests

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
