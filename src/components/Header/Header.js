import s from './Header.module.scss'
import logo from '../../assets/img/Ресурс 2@4x.png'
import { NavLink } from 'react-router-dom';
import { Button, SECONDARY_PRIORITY } from '../UI/Button/Button';

export const Header = () => {
    return(
        <header className={s.header}>
            <div className='container'>
                <div className={s.header__left}>
                    <NavLink to={'/'}>
                        <img src={logo} alt='HECO'/>
                    </NavLink>
                </div>
                <div className={s.header__right}>
                    <div className={s.header__btnGroup}>
                        <Button link={'/login'}>Sign In</Button>
                        <Button
                            priority={SECONDARY_PRIORITY}
                            link={'/registration'}
                        >Sign Up</Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
