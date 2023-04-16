import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { ClientHomePage } from '../pages/ClientHomePage/ClientHomePage';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
import { Sidebar } from '../components/UI/Sidebar/Sidebar';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import s from './AppRoutes.module.scss'
import { OperatorOperatorsPage } from '../pages/OperatorOperatorsPage/OperatorOperatorsPage';
import { SpecialistRequestsPage } from '../pages/SpecialistRequestsPage/SpecialistRequestsPage';
import { useEffect } from 'react';
import { OperatorClientsPage } from '../pages/OperatorClientsPage/OperatorClientsPage';
import { OperatorCompletedRequestsPage } from '../pages/OperatorRequestsPage/OperatorCompletedRequestsPage';
import { OperatorSpecialistsPage } from '../pages/OperatorSpecialistsPage/OperatorSpecialistsPage';
import jwt_decode from 'jwt-decode';
import { loginSuccess } from '../store/slice/authSlice';
import { OperatorOperatorsCreatePage } from '../pages/OperatorOperatorsCreatePage/OperatorOperatorsCreatePage';
import { ClientCreateRequestPage } from '../pages/ClientCreateRequestPage/ClientCreateRequestPage';
import { ClientRequestsPage } from '../pages/ClientRequestsPage/ClientRequestsPage';
import { ClientWaitingRequestsPage } from '../pages/ClientWaitingRequestsPage/ClientWaitingRequestsPage';

const clientRows = [
    {
        to: '/',
        label: 'Home',
        component: <Navigate to={'/createRequest'}/>,
    },
    {
        to: '/createRequest',
        label: 'Create request',
        component: <ClientCreateRequestPage/>,
    },
    {
        to: '/myRequests',
        label: 'My requests',
        component: <ClientRequestsPage/>,
    },
    {
        to: '/waitingRequests',
        label: 'Waiting requests',
        component: <ClientWaitingRequestsPage/>,
    },
]
const operatorRows = [
    {
        to: '/',
        label: 'Home',
        component: <Navigate to={'/operators'}/>,
    },
    {
        to: '/createUser',
        label: 'Create user',
        component: <OperatorOperatorsCreatePage/>,
    },
    {
        to: '/operators',
        label: 'Operators',
        component: <OperatorOperatorsPage/>,
    },
    {
        to: '/clients',
        label: 'Clients',
        component: <OperatorClientsPage/>,
    },
    {
        to: '/specialists',
        label: 'Specialists',
        component: <OperatorSpecialistsPage/>,
    },
    // active / close / not_started
    {
        to: '/requests',
        label: 'All Requests',
        component:
            <OperatorCompletedRequestsPage query={'/'}/>,
    },
    {
        to: '/completedRequests',
        label: 'Completed Requests',
        component: <OperatorCompletedRequestsPage query={'/closed'}/>,
    },
    {
        to: '/waitingRequests',
        label: 'Waiting requests',
        component: <OperatorCompletedRequestsPage query={'/waiting'}/>,
    },
    {
        to: '/inProgressRequests',
        label: 'Requests in progress',
        component: <OperatorCompletedRequestsPage query={'/in_progress'}/>,
    }
]
const specialistRows = [
    {
        to: '/requests',
        label: 'Requests',
        component: <SpecialistRequestsPage/>,
    },
]

export const AppRoutes = () => {
    const token = useSelector(state => state.auth.token)
    const role = useSelector(state => state.auth.role)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!token) {
            const localToken = localStorage.getItem('token')
            if (!localToken) return
            const decoded = jwt_decode(localToken)
            if (decoded.exp * 1000 < Date.now()) return;
            const data = {
                id: decoded.id,
                email: decoded.email,
                token: localToken,
                role: decoded.role,
            }
            dispatch(loginSuccess(data))
        }
    }, [token])

    if (!token) {
        return (
            <Routes>
                <Route path={'/'} element={<LandingPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/registration'} element={<RegisterPage/>}/>
                <Route path={'/*'} element={<ErrorPage/>}/>
            </Routes>
        )
    }
    if (role === 'client') return (
        <>
            <div className={s.appContent}>
                <Sidebar
                    rows={clientRows}
                />
                <Routes>
                    <Route path={'/login'} element={<Navigate to={'/'}/>}/>
                    {
                        clientRows.map(row => (
                            <Route key={row.label} path={row.to} element={row.component}/>
                        ))
                    }
                    <Route path={'/*'} element={<ErrorPage/>}/>
                </Routes>
            </div>
        </>
    )
    if (role === 'operator') return (
        <>
            <div className={s.appContent}>
                <Sidebar
                    rows={operatorRows}
                />
                <Routes>
                    <Route path={'/login'} element={<Navigate to={'/'}/>}/>
                    {
                        operatorRows.map(row => (
                            <Route key={row.label} path={row.to} element={row.component}/>
                        ))
                    }
                    <Route path={'/*'} element={<ErrorPage/>}/>
                </Routes>
            </div>
        </>
    )
    if (role === 'specialist') return (
        <>
            <div className={s.appContent}>
                <Sidebar
                    rows={specialistRows}
                />
                <Routes>
                    <Route path={'/login'} element={<Navigate to={'/'}/>}/>
                    {
                        specialistRows.map(row => (
                            <Route key={row.label} path={row.to} element={row.component}/>
                        ))
                    }
                    <Route path={'/*'} element={<ErrorPage/>}/>
                </Routes>
            </div>
        </>
    )
}
