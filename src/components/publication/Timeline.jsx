import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GlobalUrl } from '../../helpers/GlobalUrl'
import Publication from './Publication'

const TimelineStyled = styled.div`
    grid-area: timeline;
    h3{
        text-align: center;
    }
`

function Timeline({auth, token, feedProfile, id}) {

    const [publis, setPublis] = useState([])

    const getPublis = async() => {
        try {
            const response = await fetch(`${GlobalUrl.url}/posts/13/timeline`, {
                headers: {
                    "Authorization": token
                }
            })
            const json = await response.json()
            setPublis(json)
        } catch (error) {
            console.log(error)
        }
    }

    const getFeedProfile = async() => {
        try {
            const response = await fetch(`${GlobalUrl.url}/posts/13/myself`, {
                headers: {
                    "Authorization": token
                }
            })
            const json = await response.json()
            setPublis(json)
        } catch (error) {
            console.log(error)
        }
    }

    const getProfileOwns = async() => {
        try {
            const response = await fetch(`${GlobalUrl.url}/posts/${id}/feed`, {
                headers: {
                    "Authorization": token
                }
            })
            const json = await response.json()
            setPublis(json)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        !id ? (!feedProfile ? getPublis() : getFeedProfile()) : getProfileOwns()
    }, [])


    return (
        <TimelineStyled>
            {
                id ?(publis < 1 ? <h3>Este usuario aún no crea publicaciones</h3> :
                publis.map(publication => {
                    return <Publication key={publication._id} id={publication._id} token={token} auth={auth} {...publication} />
                }))
                :
                (publis < 1 ? <h3>Crea publicaciones o sigue personas</h3> :
                publis.map(publication => {
                    return <Publication key={publication._id} id={publication._id} token={token} auth={auth} {...publication} />
                }))
            }
        </TimelineStyled>
    )
}

export default Timeline
