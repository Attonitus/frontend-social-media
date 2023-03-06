import styled from 'styled-components'
import {Navigate, Outlet} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const PrivateLayoutStyled = styled.div`

`

function PrivateLayout() {

    const {auth, loading} = useContext(AuthContext)
    if(loading){
        return <h1>Cargando...</h1>
    }
    else {
        return (
            <PrivateLayoutStyled>
                <section>
                    {
                        auth._id ? <Outlet /> : <Navigate to="/login" />
                    }
                </section>
            </PrivateLayoutStyled>
        )
    }

}

export default PrivateLayout
