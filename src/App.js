import { makeStyles } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import { Coinpage } from "./Pages/Coinpage";
import Homepage from "./Pages/Homepage";
const useStyles = makeStyles(() => ({
  app: {
    backgroundColor: "#14161a",
    color: "White",
    minHeight: "100vh",
  },
}));
function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.app}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<Coinpage/>} exact/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
