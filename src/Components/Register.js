import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"
import Button from "./Button"
import Input from "./Input"
import axios from "axios"

export default function Register(){
    const [formData, setFormData] = useState(
        {
            email: '',
            name: '',
            cpf: '',
            password: ''
        }
    )
    
    const navigate = useNavigate();
    function register(e){
        e.preventDefault();
        const promise = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up', {...formData})


        promise.then(response => console.log(response));
        promise.catch(error => console.log(error.response))

        navigate('/')
    }

    function inputChange(e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    

    return (
        <Container>
            <form onSubmit={register}>
                <Input formData={formData.name} inputChange={inputChange} inputName={"name"} placeholder={"Nome"}/>
                <Input formData={formData.cpf} inputChange={inputChange} inputName={"cpf"}  placeholder={"CPF"}/>
                <Input formData={formData.email} inputChange={inputChange} inputName={"email"} placeholder={"E-mail"}/>
                <Input formData={formData.password} inputChange={inputChange} inputName={"password"} placeholder={"Senha"}/>
                <Button type={'submit'}>Cadastrar</Button>
            </form> 
            <Link style={{textDecoration: "none", color: "#52B6FF"}} to={"/"}><h1>Já possui uma conta? Entre</h1></Link>
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
    background: #000000;

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