import styled from 'styled-components'


export const ModelStyled = styled.div`

padding-bottom:50px;

`

export const InputFields = styled.div`

label{
    font-size:16px;
    
}

input{
    font-size:18px;
    margin-bottom:10px;
}

select{
    font-size:18px;
    margin-bottom:10px;

}

.btn_submit{
    width:30%;
    height:40px;
    border:1pt solid white;
    background-color:red;
    color:white;
    font-size:16px;

    &:hover{
        background-color:green;
        color:white;
    }
   
}

`