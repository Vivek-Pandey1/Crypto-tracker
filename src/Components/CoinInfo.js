import { CircularProgress, createTheme, InputLabel, makeStyles, MenuItem, Select, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { Chart as ChartJS } from 'chart.js/auto';
// eslint-disable-next-line
import { Chart }            from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from './api';

const useStyles = makeStyles(()=>({
    container:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:25,
        padding:20,
        borderTop:'solid grey 1px'
        },
        subtile:{
            display:'flex',
            justifyContent:'flex-end',
        }
}));

export const CoinInfo = ({coin}) => {
    const [historicaldata, sethistoricaldata] = useState('');
    const [days, setdays] = useState(1);
    const {currency} = CryptoState();
    const fetchData = async ()=>{
        const {data} = await axios.get(HistoricalChart(coin.id,days,currency));
        sethistoricaldata(data.prices)
    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line 
    }, [currency,days])
    const darkTheme = createTheme({
        palette:{
            primary:{
                main:'#fff'
            },
            type:'dark'
        },
    })
  
    const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
        <div className={classes.container}>
            {!historicaldata ?(<CircularProgress style={{color:'rgb(255, 153, 51)'}} size={250} thickness={1}/>):
            (
                <>
                <Line  data={{
                labels: historicaldata.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicaldata.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "rgb(255, 153, 51)",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            /> 
                </>
            )}
           
        </div>
        <div className={classes.subtile}>
            <div style={{marginRight: 50,}}>
        <InputLabel id="demo-select-small"> Chart for last </InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              style={{ width:100, heigth: 20,marginLeft:0}}
              value={days}
              size="small"
              onChange={(e)=>setdays(e.target.value)}
            >
              <MenuItem value={1}>24 hours</MenuItem>
              <MenuItem value={30}>30 Days</MenuItem>
              <MenuItem value={90}>3 Months</MenuItem>
              <MenuItem value={365}>1 Year</MenuItem>
              <MenuItem value={'max'}>Max</MenuItem>
            </Select>
            </div>
            </div>
    </ThemeProvider>
  ) 
}
