import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(() => ({
    root: {
      transition: 'all 0.35s'
    },
    open: {
      transform: 'rotate(180deg)'
    }
}))

const DropdownIcon = (props ) => {
  const classes = useStyles()

  return <ExpandMoreIcon
    className={clsx(classes.root, props.className, { [classes.open]: props.isOpen })}
  />
}

export default DropdownIcon
