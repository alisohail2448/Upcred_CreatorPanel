import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { login, loginWithGoogle } from "src/services/authRequests";
import useAuth from "src/adapters/authAdapters";
import { useState } from "react";
import GoogleLoginButton from "src/components/googleLoginButton";
import { API_RESPONSE_MESSAGE } from "src/constants/api";
import { MESSAGES } from "src/constants/messages";
import { useSnackbar } from "notistack";

const Login = () => {
  const { } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [userNotExist, setUserNotExist] = useState(false);
  const [passwordIsIncorrect, setPasswordIsIncorrect] = useState(false);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Username/Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: ({ username, password }, action) => {
      login({ email: username, password: password })
        .then((response) => {
          console.log("login response", response);
          router.push("/profile");
        })
        .catch((error) => {
          console.log("error", error);
          if (error?.response?.data?.message === "Creator matching query does not exist.") {
            action.setSubmitting(false);
            setUserNotExist(true)
            setPasswordIsIncorrect(false)
          }
          if (error?.response?.data?.message === "Password is incorrect !!") {
            action.setSubmitting(false);
            setPasswordIsIncorrect(true)
            setUserNotExist(false);
          }

        });
    },
  });

  const signInWithGoogle = async (codeResponse) => {
    if (!codeResponse.credential) {
      enqueueSnackbar(MESSAGES.ERROR.LOGIN_FAILURE, { variant: "error" });
      return;
    }
    const data = {
      token: codeResponse?.credential,
    }
    const res = await loginWithGoogle(data);
    if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      enqueueSnackbar(MESSAGES.SUCCESS.LOGIN_SUCCESS, { variant: "success" });
      router.push("/profile");
    } else {
      enqueueSnackbar(MESSAGES.ERROR.LOGIN_FAILURE, { variant: "error" });
    }
  }


  return (
    <>
      <Head>
        <title>Creator Login | Upcred </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: "100%",
          backgroundImage: 'url("https://beta-brand.upcred.ai/login-bg-new.gif")',
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="/assets/icons/logo_new.png" style={{ height: "50px" }} />
          <Typography
            sx={{
              // textTransform: "capitalize",
              background:
                "linear-gradient(156deg, rgba(86,74,227,1) 0%, rgba(60,80,215,1) 31%, rgba(30,163,123,1) 64%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "600",
              fontSize: "12px",
              ml: 2,
            }}
          >
            Creator Panel v1.0
          </Typography>
        </Box>
        <Container sx={{ width: { xs: "350px", md: "450px", sm: "400px", lg: "500px" } }}>
          <Card
            sx={{
              px: 5,
              py: { xs: "4px", sm: "10px", md: "15px", lg: "20px" },
              background:
                "linear-gradient(135.7deg, rgba(33, 33, 33, 0.73) -1.25%, rgba(0, 55, 39, 0.62) 23.88%, rgba(51, 51, 51, 0.27) 100%)",
              borderRadius: "41px",
              boxShadow: "rgb(0 0 0 / 25%) 0px 4px 24px -1px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: { xs: "10px", sm: "10px", md: "0px", lg: "0px" },
              }}
            >
              <img src="https://beta-brand.upcred.ai/white-logo.svg" alt="" />
            </Box>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
              action="null"
            >
              <Box sx={{ my: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography
                  variant="h4"
                  color="white"
                  sx={{ fontSize: { xs: "18px", sm: "22px", md: "25px", lg: "32px" }, my: 1 }}
                >
                  Login to your account
                </Typography>
              </Box>
              <TextField
                style={{ color: "white" }}
                size="medium"
                error={Boolean(formik.touched.username && formik.errors.username)}
                fullWidth
                helperText={formik.touched.username && formik.errors.username}
                label="Username / Email"
                margin="dense"
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.username}
                variant="outlined"
                InputLabelProps={{
                  style: { color: "white" },
                }}
                InputProps={{
                  sx: {
                    borderRadius: "14px",
                    color: "white",
                  },
                }}
              />
              <TextField
                size="medium"
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="dense"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
                InputLabelProps={{
                  style: { color: "white" },
                }}
                InputProps={{
                  sx: {
                    borderRadius: "14px",
                    color: "white",
                  },
                }}
              />
              {userNotExist ? (
                <Typography
                  style={{ color: "red", textAlign: "center", fontSize: "14px", fontWeight: "500" }}
                >
                  User doesn't exist!
                </Typography>
              ) : (
                " "
              )}
              {passwordIsIncorrect ? (
                <Typography
                  style={{ color: "red", textAlign: "center", fontSize: "14px", fontWeight: "500" }}
                >
                  Password is incorrect !!
                </Typography>
              ) : (
                " "
              )}
              <Box>
                <FormGroup>
                  <FormControlLabel
                    color="secondary"
                    sx={{ color: "white" }}
                    control={<Checkbox style={{ color: "#e1e1e1" }} defaultChecked={false} />}
                    label={
                      <Typography
                        sx={{ fontSize: { xs: "14px", md: "16px", sm: "14px", lg: "16px" } }}
                      >
                        Remember me
                      </Typography>
                    }
                  />
                </FormGroup>
              </Box>
              <Box sx={{ py: { xs: "10px", sm: "13px", md: "12px", lg: "12px" } }}>
                <Button
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="small"
                  type="submit"
                  variant="outlined"
                  sx={{
                    borderRadius: 0.5,
                    border: "none",
                    background:
                      "linear-gradient(156deg, rgb(86, 74, 227) 0%, rgb(60, 80, 215) 31%, rgb(30, 163, 123) 64%)",
                    fontWeight: "600",
                    fontSize: { xs: "14px", sm: "15px", md: "16px", lg: "16px" },
                    color: "white",
                  }}
                >
                  Sign In Now
                </Button>
              </Box>
              <Box
                sx={{
                  pb: 1,
                  pt: { xs: "3px", md: "4px", sm: "4px", lg: "5px" },
                }}
              >
                <Typography
                  align="center"
                  variant="body1"
                  color="white"
                  sx={{
                    fontSize: {
                      xs: "12px",
                      sm: "14px",
                      md: "15px",
                      lg: "15px",
                      cursor: "pointer",
                    },
                    margin: "10px"
                  }}
                >
                  or
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <GoogleLoginButton callback={signInWithGoogle} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: { xs: "10px" },
                }}
              >
                <Typography
                  color="white"
                  variant="body2"
                  sx={{
                    fontSize: { xs: "12px", sm: "14px", md: "15px", lg: "15px" },
                    textAlign: "center",
                  }}
                >
                  Don&apos;t have an account?{" "}
                  <NextLink href="/register">
                    <Link
                      to="/register"
                      variant="subtitle2"
                      underline="hover"
                      sx={{
                        cursor: "pointer",
                        color: "white",
                        fontSize: { xs: "13px", sm: "14px", md: "15px", lg: "15px" },
                      }}
                    >
                      Create an account
                    </Link>
                  </NextLink>
                </Typography>
              </Box>
            </form>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;

// export async function getServerSideProps(context) {
//   const provider = await getProviders();
//   console.log("provider", provider);
// }
