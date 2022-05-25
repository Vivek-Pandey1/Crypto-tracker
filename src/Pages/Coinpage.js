import { Container, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Components/api';
import { CryptoState } from '../CryptoContext';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../Components/Banner/Carousel';
import { CoinInfo } from '../Components/CoinInfo';
const useStyles = makeStyles(()=>({
    info:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
    },
    heading:{
        fontFamily:"Montserrat, sans-serif",
        fontWeight:'bold',
    }
}));
export const Coinpage = () => {
    const {id}=useParams();
    const [coin, setcoin] = useState();
    const {currency,symbol}= CryptoState();
    const classes = useStyles();
    const fetchCoin= async()=>{
        const {data}= await axios.get(SingleCoin(id));
        setcoin(data);
    }
    useEffect(()=>{
        fetchCoin();
        // eslint-disable-next-line
    },[currency]);
    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
    
  return (
    <div>
        <Container className={classes.info}>
            <img src={coin?.image.large} alt={coin?.name}  style={{height:200,marginBottom:20,marginTop:20}} />
            <Typography variant="h3" >{coin?.name}</Typography>
           
            <Typography variant='subtitle1'>{  ReactHtmlParser(coin?.description.en.split(".  ")[0])}</Typography>
            <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  
              )}
              
            </Typography>
          </span>
        </Container>
        <CoinInfo coin={coin} />
    </div>
  )
}
