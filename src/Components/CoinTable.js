import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { CoinList } from './api';

const useStyles =makeStyles(()=>({
    row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
      },
      pagination: {
        "& .MuiPaginationItem-root": {
          color: "gold",
        },
      },
}))
export const CoinTable = () => {
    const { currency, symbol } = CryptoState();
    const[coin,setCoin]= useState([]);
    const[loading,setLoading]=useState(false);
    const [search, setSearch] = useState('')
    const classes = useStyles();
        const fetchCoin= async()=>{
            setLoading(true)
            const{data}= await axios.get(CoinList(currency));
            setCoin(data)
            setLoading(false)
        }
        useEffect(()=>{
            fetchCoin();
            // eslint-disable-next-line
        },[currency])
        
        const darkTheme = createTheme({
            palette: {
              primary: {
                main: "#fff",
              },
              type: "dark",
            },
          });
          const handleSearch = () => {
            return coin.filter(
              (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
            );
          };
          function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        
  return (
    <div>
        <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign:'center'}}>
                <TextField  label='Search a coin' variant="outlined"
          style={{ marginTop: 20,marginBottom:20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)} />
          <TableContainer>
              {loading?(<LinearProgress style={{ backgroundColor: "gold"}} />):(
                  <Table>
                      <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                      <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "center" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
                      </TableHead>
                      <TableBody>{handleSearch().map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() =>Navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}</TableBody>
                  </Table>
              )}
          </TableContainer>
            </Container>
        </ThemeProvider>
    </div>
  )
}
