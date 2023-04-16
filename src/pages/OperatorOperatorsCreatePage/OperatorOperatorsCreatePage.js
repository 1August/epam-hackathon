import s from './OperatorOperatorsCreatePage.module.css'
import { useState } from 'react';
import { Input } from '../../components/UI/Input/Input';
import { api } from '../../lib/api';
import { CircularProgress, MenuItem, Select } from '@mui/material';
import { Button } from '../../components/UI/Button/Button';

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
    },
]

export const OperatorOperatorsCreatePage = () => {
    const [role, setRole] = useState('operator')
    const [data, setData] = useState({
        email: '',
        first_name: '',
        second_name: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    function handleFormSubmit(e) {
        e.preventDefault()

        setIsLoading(true)
        setError('')

        const url = role === 'operator' ? '/api/operators/create' : '/api/specialists/create'
        const sendData = role === 'operator' ? { ...data } : { email: data.email }
        api.post(url, sendData)
            .then(res => {
                if (res.status !== 200 || res.status !== 201) {
                    console.log(res)
                    throw new Error('Error on create user')
                }
                setData({
                    email: '',
                    first_name: '',
                    second_name: '',
                })
                setRole('operator')
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleInputChange(e) {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
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
            <form onSubmit={handleFormSubmit}>
                <Select
                    name={'role'}
                    value={data.role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <MenuItem value={'operator'}>Operator</MenuItem>
                    <MenuItem value={'specialist'}>Specialist</MenuItem>
                </Select>
                <Input
                    label={'Email'}
                    name={'email'}
                    value={data.email}
                    onChange={handleInputChange}
                />
                {
                    role === 'operator' &&
                    <>
                        <Input
                            label={'First name'}
                            name={'first_name'}
                            value={data.first_name}
                            onChange={handleInputChange}
                        />
                        <Input
                            label={'Second name'}
                            name={'second_name'}
                            value={data.second_name}
                            onChange={handleInputChange}
                        />
                    </>
                }

                <Button
                    type={'submit'}
                >
                    Create user account
                </Button>
            </form>
        </main>
    )
}
