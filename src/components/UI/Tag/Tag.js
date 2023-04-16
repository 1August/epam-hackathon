import s from './Tag.module.scss'

export const Tag = (props) => {
    const {
        children,
        className,
        ...etc
    } = props


    if (!children) return null
    return(
        <span
            className={`${s.tag} ${className}`}
            {...etc}
        >
            {children}
        </span>
    )
}
