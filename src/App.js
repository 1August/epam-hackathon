import s from './App.module.scss';
import { Button } from './components/UI/Button/Button';
import { Input } from './components/UI/Input/Input';
import { useState } from 'react';
import { api } from './lib/api';
import { AppRoutes } from './routes/AppRoutes';

function App() {
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    function handleChangeInput (e) {
        setData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    function handleSubmit (e) {
        // e.preventDefault()
        //
        // const url = ''
        // api.get(url)
        //     .then(res => {
        //         console.log(res)
        //     })
    }

    return (
        <div className={s.App}>
            <AppRoutes/>
        </div>
    );
}

export default App;
