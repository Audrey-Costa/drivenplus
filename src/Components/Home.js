import axios from 'axios'
import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import UserContext from '../Context/UserContext'
import Button from './Button'
import {FaUserCircle} from 'react-icons/fa'


export default function Home(){
    const navigate = useNavigate();
    const {user, planData} = useContext(UserContext);
    
    function changePlan(){
        navigate('/subscriptions')
    }
    
    function cancelPlan(){
        const promise = axios.delete('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        navigate('/subscriptions')
    }

    return (
        <Container>
            <img src={planData.image} alt="Logo do Plano" />
            <Link style={{textDecoration: "none"}} to={`/users/${user.id}`}><FaUserCircle/></Link>
            <h1>Olá, {user.name}</h1>
            <div>
                {planData.perks.map((element, index) => <a key={index} href={element.link} target="_blank"><Button>{element.title}</Button></a>)}
            </div>
            <div>
                <Button onClick={changePlan}>Mudar plano</Button>
                <Button onClick={cancelPlan}>Cancelar plano</Button>
            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 90%;
    height: 80%;
    margin-top: 15%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #0E0E13;

    img{
        position: absolute;
        top: 30px;
        left: 30px;
        width: 60px;
        height: 60px;
        color: #FFFFFF;
    }

    svg{
        font-size: 35px;
        position: absolute;
        top: 40px;
        right: 30px;
        color: #FFFFFF;
    }

    h1{
        margin-bottom: 28px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
    }

    > a{
        height: 50px;
        margin-bottom: 8px;
    }

    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    div:nth-child(4){
        padding-top: 60px;
        padding-bottom: 110px;
        overflow-y: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    div:nth-child(4)::-webkit-scrollbar{
        display: none;
    }

    div:nth-child(5){
        position: absolute;
        z-index: 1;
        background-color: #0E0E13;
        bottom: 0px;
    }

    button{
            margin: 4px;
        }
`