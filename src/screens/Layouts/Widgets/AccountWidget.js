import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { Route, useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { signIn } from "../../../actions/AccountActions";
import { getImageUrl } from "../../../helpers/Api";
import ProfileAvatar from "../../../assets/img/Profile_Avatar.png";
import NavBg from "../../../assets/img/navbar_bg.png";
import BtnBg from "../../../assets/img/btn_bg.png";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import Paper from "../Paper"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 9
  },
  header: {
    color: "white",
    height: 45,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: [
      [`url(${NavBg})`, "left top", "repeat-x"],
      ["linear-gradient(#216669, #144144)", "center center", "repeat"],
    ],
  },
  content: {
    padding: theme.spacing(2),
  },

  fields: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    background: [[`url(${BtnBg})`, "left top", "repeat-x"]],
  },
  links: {
    display: "flex",
    justifyContent: "space-between",
  },
  error: {
    color: "red",
    display: "flex",
    alignItems: "center",
  },
  avatarNameContainer: {
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    width: "100%",
    border: `${theme.palette.primary.main} solid 2px`,
    borderRadius: "10%",
  },
}));

const ivalidationSchema = Yup.object({
  name: Yup.string()
    .min(6, "Account Name must be at least 6 charaters")
    .max(15, "Must be 15 characters or less")
    .required("Account Name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 charaters")
    .required("Password is required"),
});

const AccountWidget = ({ account }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: ivalidationSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      dispatch(signIn(values))
        .then(() => {
          setIsError(false);
          history.push("/account");
        })
        .catch((err) => {
          const { data } = err.response;
          console.log(data);
          setLoading(false);
          setIsError(true);
          resetForm();
        });
    },
  });

  console.log(account);
  const avatarImg = account?.avatar ? account.avatar : ProfileAvatar;

  return (
    <Paper className={classes.root} onlySmallCorners>
      <div className={classes.header}>
        <Typography variant="h4">Account</Typography>
      </div>

      {account ? (
        <div className={classes.content}>
          <Grid container spacing={2}>
            <Grid
              id="avatar-container"
              container
              item
              xs={12}
              spacing={1}
              className={classes.avatarNameContainer}
            >
              <Grid id="avatar" item xs={4}>
                <img className={classes.avatar} src={avatarImg} alt="avatar" />
              </Grid>
              <Grid id="account-name-container" container item xs={8}>
                <Grid id="account-name" item xs={12}>
                  <Typography variant="h6">{account.name}</Typography>
                </Grid>
                <Grid id="account-links" item xs={12}>
                  <RouterLink to="/account">My Account</RouterLink>
                </Grid>
                <Grid id="account-links" item xs={12}>
                  <RouterLink to="/account/characters/create">
                    Add Character
                  </RouterLink>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              id="coins-container"
              container
              item
              direction="column"
              justify="flex-start"
              alignItems="center"
              xs={12}
              className={classes.avatarNameContainer}
            >
              <Grid id="coins-count" item xs={12}>
                <Typography display="inline">You have </Typography>
                <Typography color='primary' display="inline" variant="h4">
                  {account?.coins}
                </Typography>
                <Typography display="inline"> coins.</Typography>
              </Grid>
              <Grid id="buy-coins" item xs={12}>
                <Button
                  className={classes.button}
                  // component={RouterLink}
                  // to='#'
                  variant="contained"
                  color="primary"
                  disableRipple
                >
                  Buy Coins
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      ) : (
        <form className={classes.content} onSubmit={formik.handleSubmit}>
          <Grid container spacing={0.5}>
            <Grid item xs={12}>
              <TextField
                className={classes.fields}
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                label="Account Name"
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.fields}
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                variant="outlined"
                margin="dense"
              />
            </Grid>
            {isError && (
              <Grid item xs={12} className={classes.error}>
                <Typography>Wrong account name or password!</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                className={classes.button}
                style={{ width: "100%" }}
                variant="contained"
                color="primary"
                disabled={loading}
                disableRipple
                type="submit"
                startIcon={<ExitToAppIcon />}
              >
                Sign in
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.links}>
              <RouterLink to="/forgot">Forgot password?</RouterLink>
              <RouterLink to="/sign-up">Create Account</RouterLink>
            </Grid>
          </Grid>
        </form>
      )}
    </Paper>
  );
};

AccountWidget.propTypes = {
  account: PropTypes.shape({
    avatar: PropTypes.string,
    profileName: PropTypes.string,
    location: PropTypes.string,
    coins: PropTypes.number,
  }),
};

export default AccountWidget;
