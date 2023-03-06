import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { GlobalUrl } from '../../../helpers/GlobalUrl'
import { useForm } from '../../../hooks/useForm'

const RegisterStyled = styled.div`
    .page{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    form{
        max-inline-size: 50rem;
        display: flex;
        gap: .5rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #282C31;
        padding: 2rem;
    }
    a{
        color: white;
    }
    input, textarea{
        padding-block: .5rem;
        padding-inline: 1rem;
        font-family: 'Poppins', sans-serif;
    }
    textarea{
        resize: none;
    }
`

function Register() {

    const {form, onInputChange} = useForm({
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        profilePicture: '',
        coverPicture: '',
        about: ''
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const {name, lastname, username, email, password, profilePicture, coverPicture, about} = form

    const registerUser = async(e) => {
        setError('')
        e.preventDefault()
        setLoading(true)
        try {
            const profileImage = document.querySelector("#profilePicture").files[0]
            const coverImage = document.querySelector("#coverPicture").files[0]
            const data = new FormData()

            data.append("name", name)
            data.append("lastname", lastname)
            data.append("username", username)
            data.append("email", email)
            data.append("password", password)
            data.append("profilePicture", profileImage)
            data.append("coverPicture", coverImage)
            data.append("about", about)

            const response = await fetch(`${GlobalUrl.url}/users/register`, {
                method: 'POST',
                body: data
            })

            const responseData = await response.json()
            if(responseData.error){
                if(responseData.error.keyValue){
                    setLoading(false)
                    return setError(responseData.error.keyValue)
                } else {
                    setLoading(false)
                    return setError(responseData.error)
                }
            } else {
                setLoading(false)
                navigate("/login")
            }


        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    return (
        <RegisterStyled>
            <div className="page">
                <h3>Registrate ahora</h3>
                <form onSubmit={registerUser} >
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id='name' name='name' placeholder='Manueh' value={name} onChange={onInputChange} />
                    <label htmlFor="lastname">Apellido:</label>
                    <input type="text" id='lastname' placeholder='Lopez' name='lastname' value={lastname} onChange={onInputChange} />
                    <label htmlFor="username">Usuario:</label>
                    <input type="text" id='username' placeholder='Usuario13' name='username' value={username} onChange={onInputChange} />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id='email' placeholder='email@email.com' name='email' value={email} onChange={onInputChange} />
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id='password' name='password' value={password} onChange={onInputChange} />
                    <label htmlFor="profilePicture">Imagen de perfil (Opcional):</label>
                    <input type="file" name="profilePicture" id="profilePicture" value={profilePicture} onChange={onInputChange} />
                    <label htmlFor="coverPicture">Imagen de portada (Opcional):</label>
                    <input type="file" name='coverPicture' id='coverPicture' value={coverPicture} onChange={onInputChange} />
                    <label htmlFor="about">Biografia (Opcional):</label>
                    <textarea id="about" name="about" rows="4" cols="50" value={about} onChange={onInputChange} />
                    {
                        loading ? (<div className='loading'><span>Cargando...</span></div>) : null

                    }
                    {
                        error ? 
                        (error.email ? (<div className='error'><span>El correo ya está registrado</span></div>) :
                        error.map(err => {
                            return (<div className='error' key={err.param}><span>{err.msg}</span></div>)
                        })) : null
                    }
                    <button type="submit" className='follow'>Registrarse</button>
                    <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
                </form>
            </div>
        </RegisterStyled>
    )
}

export default Register
