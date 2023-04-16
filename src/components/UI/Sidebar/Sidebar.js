import s from './Sidebar.module.scss'
import { NavLink, useNavigate } from 'react-router-dom';

import logo from '../../../assets/img/Ресурс 2@4x.png'
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/slice/authSlice';

export const Sidebar = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    /*
    rows: [
        {
            to: '/',
            label: 'name',
            component: <HomePage/>
        }
    ]
     */
    const {
        rows = []
    } = props

    function handleLogout (e) {
        e.preventDefault()

        dispatch(logout())
        navigate('/')
    }

    return(
        <aside className={s.sidebar}>
            <div className={s.sidebar__container}>
                <div className={s.sidebar__logo}>
                    <img src={logo} alt='HECO'/>
                </div>
                <div className={s.sidebar__rows}>
                    {
                        rows.map(row => (
                            <NavLink key={row.label} to={row.to} className={s.sidebar__row}>{ row.label }</NavLink>
                        ))
                    }
                    <NavLink to={'/'} onClick={handleLogout} className={s.sidebar__row}>Logout</NavLink>
                </div>
            </div>
        </aside>
    )
}
