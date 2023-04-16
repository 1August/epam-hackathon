import s from './LoginPage.module.scss'
import { useState } from 'react';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import { NavLink } from 'react-router-dom';
import { api } from '../../lib/api';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slice/authSlice';
import jwt_decode from 'jwt-decode';

export const LoginPage = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    function handleChange(e) {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        setIsLoading(true)
        setError('')

        const url = '/api/auth/login'
        api.post(url, data)
            .then(res => {
                if (res.status !== 200 && res.status !== 201) throw new Error('error in sign in')
                const decoded = jwt_decode(res.data.data)
                const data = {
                    id: decoded.id,
                    email: decoded.email,
                    token: res.data.data,
                    role: decoded.role
                }
                dispatch(loginSuccess(data))
            })
            .catch(error => {
                setError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <main className={`${s.loginPage}`}>
            <div>
                <div className={s.loginPage__img}></div>
                <div className={s.loginPage__content}>
                    <div className={s.loginPage__text}>
                        <h1>Hello again!</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam atque, cum cupiditate.
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
                        <div className={s.loginPage__btnGroup}>
                            <Button
                                type={'submit'}
                                disabled={isLoading}
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                    <div className={s.loginPage__helperText}>
                        <p>Need a new account? <NavLink to={'/registration'}>Create</NavLink></p>
                    </div>
                </div>
            </div>
        </main>
    )
}
