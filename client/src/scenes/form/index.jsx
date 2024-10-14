import {
  Box,
  Button,
  TextField,
  Radio,
  FormControlLabel,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useMemo, useState } from "react";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
// import {
//   Gujarat,
//   Odisha,
//   MadhyaPradesh,
//   Ludhiana,
//   pondicherry,
// } from "./blockList.js";

const url = import.meta.env.VITE_SERVER;

const Form = () => {
  const state = ["Gujarat", "Odisha", "Bhopal", "Ludhiana", "pondicherry"];
  // const [selectedState, setSelectedState] = useState(initialValues.state);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const dropdownItems = useMemo(() => {
  //   console.log(initialValues);

  //   switch (selectedState) {
  //     case "Gujarat":
  //       return Gujarat;
  //     case "Odisha":
  //       return Odisha;
  //     case "Madhya Pradesh":
  //       return MadhyaPradesh;
  //     case "Ludhiana":
  //       return Ludhiana;
  //     case "pondicherry":
  //       return pondicherry;
  //     default:
  //       return [];
  //   }
  // }, [selectedState]);
  // }, [selectedState]);

  const [SubmitedMsg, setSubmittedMsg] = useState("");
  // const [dropdownItems, setDropDownItems] = useState([]);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      setSubmittedMsg("");
      const userPayload = {
        username: values.username,
        email: values.email.toLowerCase().trim(),
        password: values.password,
        sitename: values.sitename,
        role: values.role,
      };

      const { data } = await axios.post(`${url}/user`, userPayload);
      if (data.error) {
        setSubmittedMsg(data.error);
        return;
      }
      setSubmittedMsg("User Created Successfully");
      resetForm();
    } catch (error) {
      // console.log(error);
      // setSubmittedMsg(error.response.data.message);
      setSubmittedMsg("Something went wrong. Please try again later.");
    }
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
    sitename: "",
    role: "user",
  };

  return (
    <Box m="20px">
      {SubmitedMsg ? (
        <Box
          sx={{
            backgroundColor: colors.greenAccent[400],
            width: "75%",
            marginBottom: "20px",
            padding: "5px",
            // radius
            borderRadius: "10px",
          }}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Typography
            variant="h3"
            color={colors.grey[900]}
            align="center"
            alignItems={"center"}
          >
            {SubmitedMsg}
          </Typography>
          <IconButton onClick={() => setSubmittedMsg("")}>
            <CloseIcon
              fontSize="5"
              sx={{ color: colors.grey[900], height: "5" }}
            />
          </IconButton>
        </Box>
      ) : null}

      <Header title="CREATE User" subtitle="Create a New User Account" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },

                  "& .MuiFormLabel-root.Mui-focused": {
                    color: colors.greenAccent[400],
                  },
                  // "& .MuiInputBase-input": { color: "red" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="User Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 3" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 3" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 3" }}
                />
                <Box gridColumn="span 3">
                  <FormControl
                    fullWidth
                    variant="filled"
                    error={!!touched.sitename && !!errors.sitename}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Site Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      fullWidth
                      variant="filled"
                      label="Site Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.sitename}
                      name="sitename"
                      // error={!!touched.sitename && !!errors.sitename}
                      // helperText={touched.sitename && errors.sitename}
                      sx={{ gridColumn: "span 3" }}
                    >
                      <MenuItem value="" disabled>
                        Select Site Name
                      </MenuItem>
                      {state.map((site) => (
                        <MenuItem key={site} value={site}>
                          {site}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {touched.sitename && errors.sitename}
                    </FormHelperText>
                  </FormControl>
                </Box>

                <Box gridColumn="span 4">
                  <Typography variant="h5">User Type</Typography>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={values.role === "user"}
                        onChange={handleChange}
                        value="user"
                        name="role"
                        color="secondary"
                      />
                    }
                    label="User"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        checked={values.role === "admin"}
                        onChange={handleChange}
                        value="admin"
                        name="role"
                        color="secondary"
                      />
                    }
                    label="Admin"
                  />
                </Box>
              </Box>

              <Box display="flex" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  onClick={handleFormSubmit}
                >
                  Create New User
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  // state: yup.string().required("required"),
  sitename: yup.string().required("required"),
});

export default Form;
