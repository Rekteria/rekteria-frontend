import React from "react";
import clsx from 'clsx'
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Divider from '@material-ui/core/Divider';
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    borderColor: "white",
    backgroundColor: "transparent",
    flex: 1
  },
  divider: {
    height: 20,
    margin: 4,
  },
  button: {
    color: theme.palette.secondary.main,
    padding: 6,
  },
}));

const Search = ({ value, onChange, onSubmit, className }) => {
  const classes = useStyles();

  return (
    <Paper component="form" onSubmit={onSubmit} className={clsx(classes.root, className)}>
      <InputBase
        id="character-name-search"
        className={classes.input}
        placeholder="Search of Character"
        value={value}
        onChange={onChange}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="submit"
        disableRipple
        className={classes.button}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
