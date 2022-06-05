import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
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
            <FaUserCircle/>
            <h1>Olá, {user.name}</h1>
            {planData.perks.map((element, index) => <a key={index} href={element.link} target="_blank"><Button>{element.title}</Button></a>)}
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
        top: 30px;
        right: 30px;
        color: #FFFFFF;
    }

    h1{
        margin-bottom: 50px;
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
        position: absolute;
        bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        button{
            margin: 4px;
        }
    }

`