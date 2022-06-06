import { Link } from "react-router-dom"
import { useContext } from 'react'
import styled from 'styled-components'
import Button from "./Button"
import Input from "./Input"
import UserContext from '../Context/UserContext'
import {FiArrowLeft} from 'react-icons/fi'
import {GiExitDoor} from 'react-icons/gi'

export default function Users(){
    const {user} = useContext(UserContext);

    return (
        <Container>
            <Link style={{textDecoration: "none"}} to={`/home`}><FiArrowLeft/></Link>
            <Link style={{textDecoration: "none"}} to={`/`}><GiExitDoor/></Link>
            <form>
                <Input  placeholder={user.name} disabled={true}/>
                <Input placeholder={user.cpf} disabled={true}/>
                <Input placeholder={user.email} disabled={true}/>
                <Link style={{textDecoration: "none"}} to={`/users/${user.id}/update`}><Button>ATUALIZAR</Button></Link>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: #0E0E13;

    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-decoration-line: underline;
        color: #0E0E13;
    }

    svg{
        position: absolute;
        top: 30px;
        color: #FFFFFF;
        font-size: 40px;
    }

    a:first-child > svg{
        left: 30px;
    }

    a:nth-child(2) > svg{
        right: 30px;
    }

    input{
        background-color: #EBEBEB;
    }
`