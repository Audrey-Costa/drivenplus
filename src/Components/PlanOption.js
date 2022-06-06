import styled from 'styled-components'


export default function PlanOption({image, price}){
    return (
        <Container>
            <div><img src={image} alt="Driven+ Plan Logo" /></div>
            <div><h1>R$ {price.replace('.', ',')}</h1></div>
        </Container>
    )
}

const Container = styled.div`
    width: 290px;
    height:180px;
    display: flex;
    background: #0E0E13;
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    margin-bottom: 8px;

    div{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    img{
        width: 110px;
        height: 90px;
    }
    
    h1{ 
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
    }
`