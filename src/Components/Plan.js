import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import UserContext from '../Context/UserContext'
import Input from './Input'
import Button from './Button'
import {FiArrowLeft} from 'react-icons/fi'
import {FaMoneyBillWave, FaWindowClose} from 'react-icons/fa'
import {HiOutlineClipboardList} from 'react-icons/hi'
import { Triangle } from  'react-loader-spinner'

export default function Plan(){
    const navigate = useNavigate();
    const [data, setData] = useState("");
    const [modal, setModal] = useState(false);
    const {user, setPlanData} = useContext(UserContext);
    const {ID_DO_PLANO} = useParams();
    const planId = Number(ID_DO_PLANO);
    const [formData, setFormData] = useState({
        membershipId: planId,
        cardName: "",
        cardNumber: "",
        securityNumber: "",
        expirationDate: ""
    });
    
    useEffect(
        ()=>{ 
            const promise = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${ID_DO_PLANO}`, {
                headers: {
                Authorization: `Bearer ${user.token}`
                }
            })

            promise.then(response => {
                setData(response.data);
            })
            },[])

    function modalToggle(){
        setModal(!modal)
    }

    function sign(e){
        e.preventDefault();
        modalToggle()
    }

    function confirm(){
        const promise = axios.post(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`, {...formData}, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })

        promise.then(response => {
            setPlanData(response.data.membership)
            navigate('/home')
        })

        promise.catch(error => {
            if(error.response.status === 422){
            alert("Dados inválidos, confira as informações, e tente novamente.")
            modalToggle()
            }
        })
    }

    function inputChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function back(){
        navigate('/subscriptions')
    }

    return (
        <Container>
            <FiArrowLeft onClick={back}/>
            {data === "" ? <Triangle color="#FF4791" height={200} width={200} margin-left={300}/> : 
            <>
                <Modal style={modal ? {display: 'flex'} : {display: 'none'}}>
                    <FaWindowClose onClick={modalToggle}/>
                    <div>
                        <p>Tem certeza que deseja assinar o plano {data.name} (R$ {data.price.replace('.', ',')})?</p>
                        <div>
                            <Button onClick={modalToggle}>Não</Button>
                            <Button onClick={confirm}>Sim</Button>
                        </div>
                    </div>
                </Modal>
                <img src={data.image} alt="Logo do plano" />
                <h1>{data.name}</h1>
                <div>
                    <h2><HiOutlineClipboardList/> Benefícios:</h2>
                    <ol>
                        {data.perks.map((element, indice)=><li key={indice}><h3>{indice + 1}. {element.title}</h3></li>)}
                    </ol>
                </div>
                <div>
                    <h2><FaMoneyBillWave/> Preço:</h2>
                    <h3>R$ ${data.price.replace('.', ',')} cobrados mensalmente</h3>
                </div>
            </>}
            <form onSubmit={sign}>
                <Input type={"text"} formData={formData.cardName} inputName={"cardName"} inputChange={inputChange} placeholder={"Nome impresso no cartão"}/>
                <Input type={"text"} formData={formData.cardNumber} inputName={"cardNumber"} inputChange={inputChange} placeholder={"Digitos do cartão"}/>
                <div><Input type={"text"} formData={formData.securityNumber} inputName={"securityNumber"} inputChange={inputChange} placeholder={"Código de segurança"}/>
                <Input type={"text"} formData={formData.expirationDate} inputName={"expirationDate"} inputChange={inputChange} placeholder={"Código de segurança"}/></div>
                <Button type={'submit'}>ASSINAR</Button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #0E0E13;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > svg{
        position: absolute;
        font-size: 40px;
        top: 30px;
        left: 30px;
        color: #FFFFFF

    }

    img{
        margin-bottom: 12px;
    }
    
    > div{
        width: 80vw;
        margin-bottom: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    > div:nth-child(2){
        align-items: center;
        color: #FF4791;
    }


    h1{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        text-align: center;
        color: #FFFFFF;
        margin-bottom: 12px;
    }

    h2{
        margin-right: 5px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        color: #FFFFFF;
    }

    h3{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: start;
        color: #FFFFFF;
    }

    form{
        display: flex;
        justify-content: center;
        align-items: center;
        
        div{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        div > input{
            width: 37vw;
            margin: 1.4vw;
        }
    }
`

const Modal = styled.span`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba( 0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;

    svg{
        position: absolute;
        font-size: 30px;
        top: 35px;
        right: 35px;
        color: #FFFFFF;
    }

    > div{
        width: 66vw;
        height: 31vh;
        background-color: #FFFFFF;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    p{
        margin-top: 3vh;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: #000000;
    }

    div > div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 3.8vh;
    }

    button{
        width: 25vw;
        height: 7.8vh;
        margin: 10px 7px;
        border-radius: 8px;
    }

    button:first-child{
        background-color: #CECECE;
    }
`