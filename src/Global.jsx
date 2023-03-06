import {createGlobalStyle} from 'styled-components'

const GlobalStyled = createGlobalStyle`
    body{
        margin: 0;
        background-color: #212327;
        font: 400 1.2rem 'Poppins', sans-serif;
        color: white;
    }
    ul{
        margin: 0;
    }
    li{
        list-style: none;
    }
    .follow{
        background-color: #34373D;
        border: none;
        border: 1px solid #34373D;
        padding-block: 1rem;
        padding-inline: .75rem;
        border-radius: .75rem;
        font-family: 'Poppins', sans-serif;
        color: white;
        font-weight: 600;
    }
    .follow:hover{
        cursor: pointer;
        background-color: white;
        color: #34373D;
        transition: .25s ease-in-out;
    }
    .loading{
        background-color: #33ad33;
        border: .25rem solid #105b10;
        text-align: center;
        padding: .5rem;
    }
    .error{
        background-color: #ad3333;
        border: .25rem solid #5b1010;
        text-align: center;
        padding: .5rem;
    }
    .deleteButton{
        background-color: #34373D;
        border: none;
        border: 1px solid #34373D;
        padding-block: .75rem;
        padding-inline: .75rem;
        border-radius: .75rem;
        color: white;
    }

    .deleteButton:hover{
        cursor: pointer;
        background-color: #ad3333;
        color: white;
        transition: .25s ease-in-out;
    }
    .editButton{
        background-color: #34373D;
        border: none;
        border: 1px solid #34373D;
        padding-block: .75rem;
        padding-inline: .75rem;
        border-radius: .75rem;
        color: white;
    }

    .editButton:hover{
        cursor: pointer;
        background-color: #c6be27;
        color: white;
        transition: .25s ease-in-out;
    }
`

export default GlobalStyled
