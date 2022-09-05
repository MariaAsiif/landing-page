import styled from "styled-components";

export const ViewTableContainer=styled.div `

margin-top:3rem;
padding-left:30px;

h2{
    font-weight:600;
}

 table{
    caption-side: bottom !important; 
    border-collapse: collapse !important;
    font-size:15px !important;
    margin-top:40px;

     th {
        border-color: inherit;
        border-style: none !important;
        border-width: 0;
        font-size:16px;
        font-weight:400;
        color:gray;
        
    }
 }

 tbody, td, tfoot, th, thead, tr {
    border-color: inherit;
    border-style: none !important;
    border-width: 0;
    font-size:18px;
    
}

 tr {
    border-color: inherit; 
    border-style: none !important;
    border-width: 0;
}

.table_row{
    display:flex;
    align-items:center;
    h2{
        font-size:18px;
        font-weight:400;
        margin-top:8px;
        margin-left:10px;
    }
}

`

