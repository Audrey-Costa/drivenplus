import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from 'react'
import axios from "axios"
import styled from 'styled-components'
import Button from "./Button"
import Input from "./Input"
import UserContext from '../Context/UserContext'
import {FiArrowLeft} from 'react-icons/fi'

export default function Update(){
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate()
    const [formData, setFormData] = useState(
        {
            email: '',
            name: '',
            cpf: user.cpf,
            currentPassword: '',
            newPassword: ''
        }
    )

    function save(e){
        e.preventDefault();
        if(formData.currentPassword === user.password){
            console.log("senha correta", formData)
                const promise = axios.put('https://mock-api.driven.com.br/api/v4/driven-plus/users/', formData, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })

                promise.then(response => {
                    setUser({...user, name: response.data.name, cpf: response.data.cpf, email: response.data.email, password: response.data.password})
                    navigate('/home')
                })

                promise.catch(error => alert("Erro de salvamento!"))
        }else{
            alert("Senha incorreta!")
        }
    }

    function inputChange(e){
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <Container>
            <Link style={{textDecoration: "none"}} to={`/users/${user.id}`}><FiArrowLeft/></Link>
            <form onSubmit={save}>
                <Input type={"text"} formData={formData.name} inputChange={inputChange} inputName={"name"} placeholder={user.name}/>
                <Input type={"text"} formData={formData.cpf} inputChange={inputChange} inputName={"cpf"}  placeholder={user.cpf} disabled={true}/>
                <Input type={"text"} formData={formData.email} inputChange={inputChange} inputName={"email"} placeholder={user.email}/>
                <Input type={"password"} formData={formData.currentPassword} inputChange={inputChange} inputName={"currentPassword"} placeholder={"Senha atual"}/>
                <Input type={"password"} formData={formData.newPassword} inputChange={inputChange} inputName={"newPassword"} placeholder={"Nova Senha"}/>
                <Button type={`submit`}>SALVAR</Button>
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
        color: #FFFFFF;
    }

    svg{
        position: absolute;
        top: 30px;
        left: 30px;
        color: #FFFFFF;
        font-size: 40px;
    }

    form input:nth-child(2){
        color: #7E7E7E;
        background-color: #ebebeb;
    }
`