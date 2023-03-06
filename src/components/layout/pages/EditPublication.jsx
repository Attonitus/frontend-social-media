import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { GlobalUrl } from '../../../helpers/GlobalUrl'
import { useForm } from '../../../hooks/useForm'
import { AuthContext } from '../../context/AuthProvider'

const EditPublicationStyled = styled.div`
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
    .description{
        padding-block: .5rem;
        padding-inline: 1rem;

    }
    input{
        font-family: 'Poppins', sans-serif;
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

function EditPublication() {

    const {form, onInputChange} = useForm({
        description: '',
        image: ''
    })

    const {id} = useParams()
    const {auth, token} = useContext(AuthContext)

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const {description, image} = form

    const onEdit = async(e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            if(!(description.length > 1 || image.length > 1)){
                setLoading(false)
                return setError('Ingresa una descripcion o imagen')
            }
            
            const data = new FormData()

            if(image.length > 1){
                const imageFile = document.querySelector("#image").files[0]
                data.append("image", imageFile)
            }

            data.append("description", description)

            const response = await fetch(`${GlobalUrl.url}/posts/${id}`, {
                method: 'PUT',
                body: data,
                headers: {
                    'Authorization': token
                }
            })
            await response.json()
            setLoading(false)
            navigate("/social")
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <EditPublicationStyled>
            <div className="page">
                <div className="text">
                    <h3>Editar publicación</h3>
                    <button className='follow' onClick={()=> navigate("/social")}><span className="material-symbols-outlined">arrow_back</span></button>
                </div>
                <form onSubmit={onEdit}>
                    <input type="text" className='description' placeholder="Ingrese el nuevo texto" name='description' id='description' onChange={onInputChange} value={description} />
                    <input type="file" name="image" id="image" onChange={onInputChange} value={image} />
                    {
                        error ? (<div className='error'>{error}</div>) : null
                    }
                    {
                        loading ? (<div className='loading'>Cargando...</div>) : null
                    }
                    <button type="submit" className='follow'>Editar</button>
                </form>
            </div>
        </EditPublicationStyled>
    )
}

export default EditPublication
