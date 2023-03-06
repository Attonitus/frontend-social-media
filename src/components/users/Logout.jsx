import Header from "../layout/general/Header"

import styled from 'styled-components'
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthProvider"

const LogoutStyled = styled.div`
    h1{
        text-align: center;
    }
`

function Logout() {

    const {setAuth, setToken} = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(()=> {
        localStorage.clear()
        setAuth({})
        setToken({})
        navigate("/login")
    })
    return (
        <LogoutStyled>
            <Header />
            <h1>Cerrando sesión...</h1>
        </LogoutStyled>
    )
}

export default Logout

