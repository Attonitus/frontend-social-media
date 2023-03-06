import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { GlobalUrl } from '../../../helpers/GlobalUrl'
import { useForm } from '../../../hooks/useForm'
import { AuthContext } from '../../context/AuthProvider'

const SettingsUserStyled = styled.div`
    .page{
        background-color: #282C31;
        max-inline-size: 50rem;
        padding: 1rem;
        margin: auto;
        border-radius: 1rem;
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    input, textarea{
        font-family: 'Poppins', sans-serif;
        padding-block: .5rem;
        padding-inline: 1rem;

    }
    textarea{
        resize: none;
    }
    .text{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    span{
        display: block;
    }
`

function SettingsUser() {

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

    const {id} = useParams()
    const {auth, token} = useContext(AuthContext)

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const {name, lastname, username, email, password, profilePicture, coverPicture, about} = form
    
    const onUpdateUser = async(e) => {
        setError('')
        e.preventDefault()
        setLoading(true)
        try {
            const data = new FormData()

            if(!(name.length > 1 || lastname.length > 1 || username.length > 1 || email.length > 1 || password.length > 1 || profilePicture.length > 1 || coverPicture.length > 1 || about.length> 1)) {
                setLoading(false)
                return setError('Todos los campos están vacios')
            } 

            if(profilePicture){
                const profileInput = document.querySelector("#profilePicture").files[0]
                data.append("profilePicture", profileInput)
            }

            if(coverPicture){
                const coverInput = document.querySelector("#coverPicture").files[0]
                data.append("coverPicture", coverInput)
            }

            if(name){
                data.append("name", name)
            }

            if(lastname){
                data.append("lastname", lastname)
            }
            if(username){
                data.append("username", username)
            }

            if(email) {
                data.append("email", email)
            }

            if(password){
                data.append("password", password)
            }

            if(about){
                data.append("about", about)
            }

            const response = await fetch(`${GlobalUrl.url}/users/update/`, {
                method: 'PUT',
                body: data,
                headers: {
                    "authorization": token
                }
            })

            const json = await response.json()
            console.log(json)
            setLoading(false)

            navigate("/social")
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    return (
        <SettingsUserStyled>
            <div className="page">
                <div className="text">
                    <h3>Editar usuario</h3>
                    <button className='follow' onClick={()=> navigate("/social")}><span className="material-symbols-outlined">arrow_back</span></button>
                </div>
                <form onSubmit={onUpdateUser} >
                    <span>Rellena los campos que desees editar</span>
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
                    <label htmlFor="profilePicture">Imagen de perfil:</label>
                    <input type="file" name="profilePicture" id="profilePicture" value={profilePicture} onChange={onInputChange} />
                    <label htmlFor="coverPicture">Imagen de portada:</label>
                    <input type="file" name='coverPicture' id='coverPicture' value={coverPicture} onChange={onInputChange} />
                    <label htmlFor="about">Biografia:</label>
                    <textarea id="about" name="about" rows="4" cols="50" value={about} onChange={onInputChange} />
                    {
                        error ? (<div className='error'>{error}</div>) : null
                    }
                    {
                        loading ? (<div className='loading'>Cargando...</div>) : null
                    }
                    <button type="submit" className='follow'>Editar</button>
                </form>
            </div>
        </SettingsUserStyled>
    )
}

export default SettingsUser
