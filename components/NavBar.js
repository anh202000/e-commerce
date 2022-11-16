import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'
import HouseDoor from '../public/house-door.js'
import Cart from '../public/cart'
import Location from '../public/location'
import Store from '../public/store'
import Mail from '../public/mail'
import Chart from '../public/chart'

function NavBar() {
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { auth, cart } = state

    const [windowDimenion, detectHW] = useState({
        winWidth: typeof window !== "undefined" ? window.innerWidth : 1000,
        winHeight: typeof window !== "undefined" ? window.innerHeight : 1000,
    })

    const detectSize = () => {
        detectHW({
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
        })
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize)

        return () => {
            window.removeEventListener('resize', detectSize)
        }
    }, [windowDimenion])


    const isActive = (r) => {
        if (r === router.pathname) {
            return " active"
        } else {
            return ""
        }
    }

    const handleLogout = () => {
        Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' })
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {} })
        dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } })
        return router.push('/')
    }

    const adminRouter = () => {
        return (
            <>
                <Link href="/users">
                    <a className="dropdown-item">Users</a>
                </Link>
                <Link href="/create">
                    <a className="dropdown-item">Products</a>
                </Link>
                <Link href="/categories">
                    <a className="dropdown-item">Categories</a>
                </Link>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={auth.user.avatar} alt={auth.user.avatar}
                        style={{
                            borderRadius: '50%', width: '30px', height: '30px',
                            transform: 'translateY(-3px)', marginRight: '3px'
                        }} /> {auth.user.name}
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link href="/profile">
                        <a className="dropdown-item">Profile</a>
                    </Link>
                    <Link href="/infor">
                        <a className="dropdown-item">Personal page</a>
                    </Link>
                    <Link href="/location">
                        <a className="dropdown-item">location</a>
                    </Link>
                    {
                        auth.user.role === 'admin' && adminRouter()
                    }
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
            </li>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link href="/">
                <i className="navbar-brand font-text">Youngz Shop</i>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item li-mr">
                        <Link href="/">
                            <a className={"nav-link " + isActive('/')}>
                                <HouseDoor />
                            </a>
                        </Link>
                    </li>

                    <li className="nav-item li-mr">
                        <Link href="/location">
                            <a className={"nav-link" + isActive('/location')}>
                                <Location />
                            </a>
                        </Link>
                    </li>

                    <li className="nav-item li-mr">
                        <Link href="/hotnew">
                            <a className={"nav-link position-relative" + isActive('/hotnew')}>
                                <Store />
                                {windowDimenion.winWidth > 992 ?
                                    <span className="position-absolute"
                                        style={{
                                            padding: '3px 6px',
                                            background: '#d71036',
                                            borderRadius: '50%',
                                            top: '-10px',
                                            right: '-10px',
                                            color: 'white',
                                            fontSize: '8px',
                                            zIndex: '999'
                                        }}>
                                        New
                                    </span>
                                    : <></>
                                }
                            </a>
                        </Link>
                    </li>

                    {auth?.user?.role === 'admin' &&
                        <li className="nav-item li-mr">
                            <Link href="/mail">
                                <a className={"nav-link position-relative" + isActive('/mail')}>
                                    <Mail />
                                </a>
                            </Link>
                        </li>
                    }

                    {auth?.user?.role === 'admin' &&
                        <li className="nav-item li-mr">
                            <Link href="/dashboard">
                                <a className={"nav-link position-relative" + isActive('/dashboard')}>
                                    <Chart />
                                </a>
                            </Link>
                        </li>
                    }

                    {auth?.user?.role !== 'admin' &&
                        <li className="nav-item li-mr">
                            <Link href="/cart">
                                <a className={"nav-link position-relative" + isActive('/cart')}>
                                    <Cart />
                                    {windowDimenion.winWidth > 992 ?
                                        <span className="position-absolute"
                                            style={{
                                                padding: '3px 6px',
                                                background: '#d71036',
                                                borderRadius: '50%',
                                                top: '-10px',
                                                right: '-10px',
                                                color: 'white',
                                                fontSize: '8px',
                                                zIndex: '999'
                                            }}>
                                            {cart.length}
                                        </span>
                                        : <></>
                                    }
                                </a>
                            </Link>
                        </li>
                    }
                </ul>
            </div>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav p-1">
                    {
                        Object.keys(auth).length === 0
                            ? <li className="nav-item">
                                <Link href="/signin">
                                    <a className={"nav-link" + isActive('/signin')}>
                                        <i className="fas fa-user" aria-hidden="true"></i> Sign in
                                    </a>
                                </Link>
                            </li>
                            : loggedRouter()
                    }
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
