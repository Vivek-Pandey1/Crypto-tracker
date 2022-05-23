import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/node_modules/@material-ui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "rgb(255, 153, 51)",
    cursor: "pointer",
    fontWeight: "bold",
    fontFamily:'Montserrat'
  },
}));

const Header = () => {
    const{currency,setCurrency}=CryptoState();
    
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              className={classes.title}
            >
              Crypto Tracker
            </Typography>
            <Select
              variant="outlined"
              style={{ width:90, heigth: 10, marginRight: 15 }}
              value={currency}
            
              onChange={(e)=>setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
