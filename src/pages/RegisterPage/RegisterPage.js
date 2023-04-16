import s from './RegisterPage.module.scss'
import { useState } from 'react';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import jwt_decode from 'jwt-decode';
import { loginSuccess } from '../../store/slice/authSlice';
import { useDispatch } from 'react-redux';

export const RegisterPage = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        phone_number: '',
        company_name: '',
        company_address: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleChange(e) {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        setIsLoading(true)
        setError('')

        const url = '/api/auth/client/signup'
        api.post(url, data)
            .then(res => {
                if (res.status !== 200 && res.status !== 201) throw new Error('error in sign in')
                // const decoded = jwt_decode(res.data.data)
                // const data = {
                //     id: decoded.id,
                //     email: decoded.email,
                //     token: res.data.data
                // }
                // dispatch(loginSuccess(data))
                navigate('/login')
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <main className={`${s.registrationPage}`}>
            <div>
                <div className={s.registrationPage__content}>
                    <div className={s.registrationPage__text}>
                        <h1>Hello!</h1>
                        <p>
                            Lorem, consectetur adipisicing elit. Aliquam atque, cum cupiditate.
                        </p>
                    </div>
                    <form className={s.form} onSubmit={handleSubmit}>
                        { error && <span>{error}</span>}
                        <Input
                            label={'Email'}
                            name={'email'}
                            value={data.email}
                            onChange={handleChange}
                            placeholder={'example@mail.com'}
                        />
                        <Input
                            type={'password'}
                            label={'Password'}
                            name={'password'}
                            value={data.password}
                            onChange={handleChange}
                            placeholder={'Secret password'}
                        />
                        <Input
                            type={'tel'}
                            label={'Phone'}
                            name={'phone_number'}
                            value={data.phone_number}
                            onChange={handleChange}
                            placeholder={'+7 123 456 78 90'}
                        />
                        <Input
                            label={'Company name'}
                            name={'company_name'}
                            value={data.company_name}
                            onChange={handleChange}
                            placeholder={'Company ABC'}
                        />
                        <Input
                            label={'Company address'}
                            name={'company_address'}
                            value={data.company_address}
                            onChange={handleChange}
                            placeholder={'USA, Memphis, Melville Street 3642'}
                        />
                        <div className={s.registrationPage__btnGroup}>
                            <Button type={'submit'}>
                                Create
                            </Button>
                        </div>
                    </form>
                    <div className={s.registrationPage__helperText}>
                        <p>Have an account? <NavLink to={'/login'}>Sign in</NavLink></p>
                    </div>
                </div>
                <div className={s.registrationPage__img}></div>
            </div>
        </main>
    )
}
