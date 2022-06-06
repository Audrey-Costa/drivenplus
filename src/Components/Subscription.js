import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import PlanOption from './PlanOption';
import axios from "axios"
import UserContext from "../Context/UserContext"
import { Triangle } from  'react-loader-spinner'

export default function Subscription(){
    const {user} = useContext(UserContext)
    const [data, setData] = useState("")

    useEffect(()=>{
        const promise = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
    
        promise.then(response => {
            setData(response.data);
        
        })
    },[]);
    return (
        <Container>
            <h1>Escolha seu Plano</h1>
            {data !== "" ? data.map((element, index) => <Link key={index} style={{textDecoration: "none"}} to={`/subscriptions/${element.id}`}><PlanOption key={index} image={element.image} price={element.price}/></Link>) : <Triangle color="#FF4791" height={200} width={200} />}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: #FFFFFF;
        margin-bottom: 24px;
    }
`