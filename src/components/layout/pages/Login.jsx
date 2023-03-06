import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm'
import { useContext, useState } from 'react'
import { GlobalUrl } from '../../../helpers/GlobalUrl'
import { AuthContext } from '../../context/AuthProvider'

const LoginStyled = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-block: 3rem;
    form{
        max-inline-size: 50rem;
        display: flex;
        gap: .5rem;
        flex-direction: column;
        background-color: #282C31;
        padding: 2rem;
    }
    input{
        padding-block: .5rem;
        padding-inline: 1rem;
        font-family: 'Poppins', sans-serif;
    }
    a{
        color: white;
    }
`

function Login() {
    const {form, onInputChange} = useForm({
        email: '',
        password: ''
    })

    const {setAuth} = useContext(AuthContext)

    const {email, password} = form

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const emailValidation = (mail) => {
        if(mail.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)){
            return true
        }
        else {
            return false
        }
    }

    const loginUser = async(e) => {
        e.preventDefault()
        if(email.length < 1 || password.length < 1) return setError('Los campos son obligatorios')

        if(!emailValidation(email)){
            return setError('Ingrese un email válido')
        }

        if(password.length <= 5){
            return setError("La contraseña es mínimo 6 caracteres")
        }

        setError('')
        setLoading(true)

        const newUser = form

        try {
            const response = await fetch(`${GlobalUrl.url}/users/login`, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            const data = await response.json()

            if(data.error){
                setLoading(false)
                return setError(data.error)
            }

            setLoading(false)

            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))

            setAuth(data.user)

            window.location.reload()

        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    return (
        <LoginStyled>
                <form onSubmit={loginUser}>
                    <h3>Loggearse ahora</h3>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id='email' placeholder='email@email.com' name='email' value={email} onChange={onInputChange} />
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id='password' name='password' value={password} onChange={onInputChange} />
                    {
                        loading ?  (<div className='loading'><span>Cargando...</span></div>) : null
                    }
                                        {
                        error ?  (<div className='error'><span>{error}</span></div>) : null
                    }
                    <button type="submit" className='follow'>Iniciar sesión</button>
                    <Link to="/registro">¿No tienes una cuenta? Crea una!</Link>
                </form>
        </LoginStyled>
    )
}

export default Login
