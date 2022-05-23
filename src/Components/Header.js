import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  ThemeProvider,
  FormControl,
  InputLabel,
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
              variant="h5"
              className={classes.title}
            >
              Crypto Tracker
            </Typography>
            <FormControl  size="small">
            <InputLabel  id="demo-select-small"> Currency </InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              style={{ width:100, heigth: 20,marginLeft:0}}
              value={currency}
              size="small"
              onChange={(e)=>setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
            </FormControl>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
