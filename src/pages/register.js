import React, { useEffect, useState } from "react";
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
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook, Google } from "@mui/icons-material";
import { signup, signupWithGoogle } from "src/services/authRequests";
import { checkCreatorHandle } from "src/services/creatorRequests";
import GoogleLoginButton from "src/components/googleLoginButton";
import { MESSAGES } from "src/constants/messages";
import { API_RESPONSE_MESSAGE } from "src/constants/api";
import { useSnackbar } from "notistack";

const Register = () => {
  // const [username, setUserName] = useState("");
  const [checkingHandle, setCheckingHandle] = useState(false);
  const [handleCheckTimer, setHandleCheckTimer] = useState(null);
  const [handleCheckStatus, setHandleCheckStatus] = useState({
    checked: false,

    available: null,

    msg: "",
  });

  const [checkTheColorOfmsg, setCheckTheColorOfmsg] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    creatorName: "",

    handle: "",

    email: "",

    contactNumber: "",

    countryCode: "",

    gender: "",
  });

  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);
  const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(false)

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      fullName: "",
      password: "",
      policy: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      // username: Yup.string().max(255).required("Username is required"),
      fullName: Yup.string().max(255).required("Name is required"),
      password: Yup.string().max(255).required("Password is required"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: ({ username, fullName, email, password }, action) => {
      signup({ handle: formData.handle, name: fullName, email: email, password: password })
        .then((response) => {
          setEmailAlreadyExist(false);
          console.log("sign up response", response);
          router.push("/login");
        })
        .catch((error) => {
          console.log("error", error);
          if (error?.response?.data?.message === "Creator already exists with this email") {
            action.setSubmitting(false);
            setEmailAlreadyExist(true);
          }
        });
    },
  });

  const checkHandleAvailabilty = async (value) => {
    let checkData = await checkCreatorHandle(value);

    if (checkData) {
      if (checkData?.available) {
        setHandleCheckStatus({
          checked: true,

          available: true,

          msg: "Username is available !",
        });
        setCheckTheColorOfmsg(true);
      } else {
        setHandleCheckStatus({
          checked: true,

          available: false,

          msg: "Username is taken! Choose another",
        });
        setCheckTheColorOfmsg(false);
      }
    } else {
      setHandleCheckStatus({
        checked: false,

        available: null,

        msg: "Netwrok error. Please try again",
      });
    }

    setCheckingHandle(false);
  };

  const handleUserhandleChange = (event) => {
    let { value } = event.target;
    // console.log(value);

    setFormData((d) => ({ ...d, handle: value.toLowerCase() }));

    setHandleCheckStatus({
      checked: false,

      available: null,

      msg: "",
    });

    setCheckingHandle(false);

    checkHandleAvailabilty(value);
  };


  const signUpWithGoogle = async (codeResponse) => {
    if (!codeResponse.credential) {
      enqueueSnackbar(MESSAGES.ERROR.SIGNUP_FAILURE, { variant: "error" });
      return;
    }
    const data = {
      token: codeResponse?.credential,
    }
    const res = await signupWithGoogle(data);
    if (res.response_message === API_RESPONSE_MESSAGE.SUCCESS) {
      enqueueSnackbar(MESSAGES.SUCCESS.SIGNUP_SUCCESS, { variant: "success" });
      router.push("/profile");
    } else {
      enqueueSnackbar(MESSAGES.ERROR.SIGNUP_FAILURE, { variant: "error" });
    }
  }



  return (
    <>
      <Head>
        <title>Creator Join | Upcred </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
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
              py: { xs: "4px", sm: "10px", md: "10px", lg: "10px" },
              background:
                "linear-gradient(135.7deg, rgba(33, 33, 33, 0.73) -1.25%, rgba(0, 55, 39, 0.62) 23.88%, rgba(51, 51, 51, 0.27) 100%)",
              borderRadius: "41px",
              boxShadow: "rgb(0 0 0 / 25%) 0px 4px 24px -1px",
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: { xs: "10px", sm: "10px", md: "0px", lg: "0px" },
                }}
              >
                <img src="https://beta-brand.upcred.ai/white-logo.svg" alt="" />
              </Box>
              <Box
                sx={{
                  my: { xs: "6px", sm: "8px", md: "10px", lg: "10px" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h4"
                  color="white"
                  sx={{
                    fontSize: { xs: "20px", sm: "22px", md: "28px", lg: "28px" },
                    textAlign: "center",
                  }}
                >
                  Use your email to create a new account
                </Typography>
              </Box>
              <TextField
                style={{ color: "white" }}
                size="medium"
                error={formData.handle === " " && formik.touched.username}
                // error={Boolean(formik.touched.username && formik.errors.username)}
                fullWidth
                helperText={formData.handle === "" && formik.errors.username}
                label="Username"
                margin="dense"
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange && handleUserhandleChange}
                // value={formik.values.username}
                // onChange={handleUserhandleChange}
                // value={formData.handle}
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
              <Typography
                style={{
                  color: checkTheColorOfmsg ? "black" : "red",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {handleCheckStatus.msg}
              </Typography>
              <TextField
                size="medium"
                error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                fullWidth
                helperText={formik.touched.fullName && formik.errors.fullName}
                label="Full Name"
                margin="dense"
                name="fullName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fullName}
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
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                margin="dense"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
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
              {emailAlreadyExist ? (
                <Typography
                  style={{ color: "red", textAlign: "center", fontSize: "14px", fontWeight: "500" }}
                >
                  Creator already exists with this email
                </Typography>
              ) : (
                " "
              )}
              <TextField
                style={{ boxShadow: "none" }}
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
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  ml: -1,
                }}
              >
                <Checkbox
                  style={{ color: "#e1e1e1" }}
                  checked={formik.values.policy}
                  name="policy"
                  onChange={formik.handleChange}
                />
                <Typography color="#e1e1e1" variant="body2">
                  I have read the{" "}
                  <NextLink href="#" passHref>
                    <Link color="#81BEF7" underline="always" variant="subtitle2">
                      Terms and Conditions
                    </Link>
                  </NextLink>
                </Typography>
              </Box>
              {Boolean(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>{formik.errors.policy}</FormHelperText>
              )}
              <Box sx={{ py: 1 }}>
                <Button
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="medium"
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: 0.5,
                    background:
                      "linear-gradient(156deg, rgb(86, 74, 227) 0%, rgb(60, 80, 215) 31%, rgb(30, 163, 123) 64%)",
                  }}
                >
                  Sign Up Now
                </Button>
              </Box>
              <Box
                sx={{
                  pb: 1,
                  pt: { xs: "3px", md: "4px", sm: "4px", lg: "2px" },
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
                  <GoogleLoginButton callback={signUpWithGoogle} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: { xs: "10px", lg: "0px" },
                }}
              >
                <Typography color="#e1e1e1" variant="body2">
                  Have an account?{" "}
                  <NextLink href="/login" passHref>
                    <Link style={{ color: "white" }} variant="subtitle2" underline="hover">
                      Sign In
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

export default Register;
