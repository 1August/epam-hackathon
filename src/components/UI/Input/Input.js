import s from './Input.module.scss'

import { useId } from 'react';

export const Input = (props) => {
    const {
        label,
        ...inputProps
    } = props

    const {
        type = 'text',
        value,
        name,
        handleChange,
        id,
        className,
        ...etc
    } = inputProps

    const generatedId = useId()

    return(
        <div className={s.inputGroup}>
            { label && <label htmlFor={id || generatedId}>{ label }</label> }
            <input
                type={type} name={name}
                value={value} onChange={handleChange}
                id={id || generatedId}
                className={`${s.input} ${className}`}
                { ...etc }
            />
        </div>
    )
}
