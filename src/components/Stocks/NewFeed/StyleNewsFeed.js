import styled from "styled-components";

export const NewsContainer = styled.div`
margin:30px 30px;
background-color: hsla(0deg,0%,var(--bg-light),var(--bg-alpha));
border:1pt solid;
border-color: #eee;
height:100%;



.card_wrapper{
    align-items: stretch;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    width:100%;


    .card_container{
        display:flex;
        @media (max-width: 600px) {
            display:flex;
            flex-direction: column;
            justify-content:center;

            img{
                max-width:100vh;
                margin-left:10px;
            }
          }
    }

    .card_item{
        display:flex;
    
    a{
        background-color: transparent;
        border: 0;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        padding: 0;
        text-align: inherit;
        text-decoration: none !important;
    
        img{
            height:120px;
        }
    }
    }
    
    .content_info{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left:20px;
        height:100%;
    }
    

    .news_info{
        font-size:25px;
        color:black;
        font-weight:500;
    }

    .data_text{
        font-size:16px;
        color:black;
        font-weight:500;
    }
    .date{
        font-size:18px;

    }

    
}










`

