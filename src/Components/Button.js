import styled from "styled-components"

export default function Button(props){
    return <BUTTON type={props.type} onClick={props.onClick}>{props.children}</BUTTON> 
}

const BUTTON = styled.button`
    width: 314px;
    height: 50px;
    margin-top: 8px;
    margin-bottom: 25px;
    background: #FF4791;
    border-radius: 8px;
    border: none;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #FFFFFF;
`