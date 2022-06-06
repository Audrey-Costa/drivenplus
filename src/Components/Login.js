import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import axios from "axios"
import UserContext from "../Context/UserContext"
import styled from "styled-components"
import Button from "./Button"
import Input from "./Input"
import Logo from "../Images/Driven+.png"

export default function Login(){
    const {setUser, setPlanData} = useContext(UserContext)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    function login(e){
        e.preventDefault();
        const promise = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', {...formData});

        promise.then(response => {
            setUser(response.data);
            if(response.data.membership){
                setPlanData(response.data.membership)
                navigate('/home');
            }else{
                navigate('/subscriptions');
            }
        });
        promise.catch(error=> {alert("Email ou senha incorretos!")});
    }

    function inputChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return (
        <Container>
            <IMG src={Logo} alt="Logo Driven Plus" />
            <form onSubmit={login}>
                <Input type={"text"} formData={formData.email} inputName={"email"} inputChange={inputChange} placeholder={"E-mail"}/>
                <Input type={"password"} formData={formData.password} inputName={"password"} inputChange={inputChange} placeholder={"Senha"}/>
                <Button type={'submit'}>ENTRAR</Button>
            </form>
            <Link style={{color: "#52B6FF"}} to={`/sign-up`}><h1>Não possui uma conta? Cadastre-se</h1></Link>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #0E0E13;

    h1{
        font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-decoration-line: underline;
    color: #FFFFFF;
    }
`

const IMG = styled.img`
    margin-top: 68px;
    margin-bottom: 32px;
`