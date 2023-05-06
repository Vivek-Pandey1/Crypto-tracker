import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
 const useStyles = makeStyles(()=>({
     footerbox:{
         display:'flex',
         justifyContent:'center',
         alignItems:'center',
         borderTop:'solid grey 0.5px',
         marginTop:50,
         padding:10,
     }
 }));
 
export const Footer = () => {
    const classes = useStyles();
  return (
    <div className={classes.footerbox}>
        <Typography variant='h7'>Crafted by <a href='https://github.com/Vivek-Pandey1' target="_blank" rel="noreferrer">Vivek Pandey</a> </Typography>
    </div>
  )
}
