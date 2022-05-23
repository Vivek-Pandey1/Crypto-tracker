import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import {Carousel} from './Carousel';

const useStyles = makeStyles(()=>({
    bg:{
        backgroundImage:'url(https://img.freepik.com/free-vector/abstract-technological-background_23-2148897676.jpg?t=st=1653283108~exp=1653283708~hmac=473a0374ce54d6d44905f7cf365601fc343608c78fb7310a5035989c1c5d4ff0&w=1380)',
        width:'100%',
        backgroundSize:'cover'},

    bannerContent:{
        height:400,
        display:'flex',
        flexDirection:'column',
        paddingTop:25,
        justifyContent:'space-around',

    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      },
      carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
      },
}));

export const Banner = () => {
    const classes = useStyles();

  return (
     
    <div className={classes.bg}>
        <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel/>
        </Container>
    </div>
    
  )
}
