import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Error404Styled = styled.div`

    .page{
        background-color: #282C31;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5rem;
        padding: 3rem;
        border-radius: 1rem;
        max-inline-size: 50rem;
        margin: auto;
        margin-block-start: 5rem;
    }
    .image{
        inline-size: 20rem;
    }
    img{
        inline-size: 100%;
        display: block;
    }
    a{
        color: white;
    }
`

function Error404() {
    return (
        <Error404Styled>
            <div className="page">
                <div className="text">
                    <h3>Error 404</h3>
                    <h4>Página no encontrada</h4>
                    <Link to="login">Regresar al login</Link>
                </div>
                <div className="image">
                    <img src="https://res.cloudinary.com/dkzturwmj/image/upload/v1678075277/usersImage/404_qvyors.png" alt="Hubo un error" title='Hubo un error' />
                </div>
            </div>
        </Error404Styled>
    )
}

export default Error404

