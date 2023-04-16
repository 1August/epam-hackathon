import s from './Button.module.scss'
import { NavLink } from 'react-router-dom';

export const PRIMARY_PRIORITY = 'PRIMARY'
export const SECONDARY_PRIORITY = 'SECONDARY'

export const Button = (props) => {
    const {
        children,
        handleClick,
        className,
        link,
        priority = PRIMARY_PRIORITY,
        ...buttonProps
    } = props

    if (!link) return(
        <button
            className={`${s.button} ${className}`}
            data-priority={priority}
            onClick={handleClick}
            {...buttonProps}
        >
            {children}
        </button>
    )
    return(
        <NavLink to={link}>
        <button
            className={`${s.button} ${className}`}
            data-priority={priority}
            {...buttonProps}
        >
            {children}
        </button>
        </NavLink>
    )
}
