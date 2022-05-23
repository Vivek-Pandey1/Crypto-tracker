import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import {Carousel} from './Carousel';
import bgimg from './bg.jpg'

const useStyles = makeStyles(()=>({
    bg:{
        backgroundImage:`URL(${bgimg})`,
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
            variant="h3"
            style={{
              fontWeight: 'bold',
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
