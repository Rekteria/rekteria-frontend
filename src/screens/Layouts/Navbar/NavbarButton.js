import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(({ spacing, palette }) => ({
    root: {
      alignSelf: 'stretch'
    },
    button: {
      color: 'white',
      textTransform: 'none',
      alignSelf: 'stretch',
      height: '100%',
      paddingBottom: 3,
      borderBottomWidth: 3,
      borderBottomStyle: 'solid',
      borderBottomColor: 'transparent',
      borderRadius: 0,
      margin: spacing(0, 1),
      '&:hover,&:focus,&:active': {
        borderBottomColor: palette.primary.main,
        color: "white",
      }
    },
    buttonActive: {
      borderBottomColor: palette.primary.main,
    }
  })
)

const NavbarButton = ({ label, to, className, ...props }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Button
        className={clsx(classes.button, className)}
        component={RouterLink}
        to={to}
        partiallyActive
        disableRipple
        activeClassName={classes.buttonActive}
        // color="inherit"
        {...props}
      >
        <Typography color='inherit' variant='button'>{label}</Typography>
      </Button>
    </div>
  )
}

export default NavbarButton
