import styled from 'styled-components'
import {Navigate, Outlet} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const PublicLayoutStyled = styled.div`

`

function PublicLayout() {

    const {auth} = useContext(AuthContext)

    return (
        <PublicLayoutStyled>
            <section>
                {!auth._id ? <Outlet /> : <Navigate to="/social" />}

            </section>
        </PublicLayoutStyled>
    )
}

export default PublicLayout
