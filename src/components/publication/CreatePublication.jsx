import { useState } from 'react'
import styled from 'styled-components'
import { GlobalUrl } from '../../helpers/GlobalUrl'
import { useForm } from '../../hooks/useForm'

const CreatePublicationStyled = styled.div`
    grid-area: create;
    padding: 1rem;

    form{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }
    .inputPubli{
        padding-block: .75rem;
        padding-inline: 1rem;
        font-family: 'Poppins', sans-serif;
        background-color: #1c1e22;
        border-radius: .5rem;
        border: none;
        inline-size: 75%;
        color: white;
    }
    .send{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: .25rem;
    }

`

function CreatePublication({auth, token}) {

    const {form, onInputChange} = useForm({
        descri: '',
        image: ''
    })

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const {descri, image} = form

    const onCreatePost = async(e) => {
        e.preventDefault()
        setLoading(true)

        if(!(descri.length > 1 || image.length > 1)){
            setLoading(false)
            return setError(true)
        }   

        try {
            const data = new FormData()
            if(image){
                const imagePost = document.querySelector("#image").files[0]
                data.append("image", imagePost)
            }
            data.append("description", descri)

            const response = await fetch(`${GlobalUrl.url}/posts`, {
                method: 'POST',
                headers:{
                    'Authorization': token
                },
                body: data
            })
            await response.json()
            setLoading(false)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <CreatePublicationStyled>
            <form onSubmit={onCreatePost}>
                <input className='inputPubli' id='descri' placeholder='Escribe algo' name='descri' value={descri} type="text" onChange={onInputChange} />
                <input type="file" id='image' name='image' value={image} onChange={onInputChange} />
                {
                    error ? (<div className='error'><span>Ingresa una descripción o imagen</span></div>) : null
                }
                {
                    loading ? (<div className='loading'><span>Cargando...</span></div>) : null
                }
                <button className='follow send' type="submit"><span className="material-symbols-outlined">send</span>Publicar</button>
            </form>
        </CreatePublicationStyled>
    )
}

export default CreatePublication
