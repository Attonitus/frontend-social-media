import styled from 'styled-components'

const SearchStyled = styled.div`
    input{
        font-family: 'Poppins', sans-serif;
        padding-block: .75rem;
        padding-inline: 1rem;
    }
    @media screen and(max-width: 500px){
        input{
            min-inline-size: 5rem;
        }
    }
`

function Search() {
    return (
        <SearchStyled>
            <input type="search" placeholder='Buscar...' />
        </SearchStyled>
    )
}

export default Search
