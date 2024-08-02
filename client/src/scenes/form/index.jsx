import {
  Box,
  Button,
  TextField,
  Radio,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";

const url = import.meta.env.VITE_SERVER;

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [SubmitedMsg, setSubmittedMsg] = useState("");

  const handleFormSubmit = async (values) => {
    try {
      console.log(values);
      const { data } = await axios.post(`${url}/user`, values);
      console.log(data);
      if (data.error) {
        setSubmittedMsg(data.error);
        return;
      }
      setSubmittedMsg("User Created Successfully");
    } catch (error) {
      console.log(error);
      // setSubmittedMsg(error.response.data.message);
    }
  };

  return (
    <Box m="20px">
      {SubmitedMsg ? (
        <Typography variant="h3" className="mb-2">
          {SubmitedMsg}
        </Typography>
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
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Site Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sitename}
                name="sitename"
                error={!!touched.sitename && !!errors.sitename}
                helperText={touched.sitename && errors.sitename}
                sx={{ gridColumn: "span 3" }}
              />
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
                      // i wan to change color of radio button
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
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  sitename: yup.string().required("required"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
  sitename: "",
  role: "user", // Set the default value for role to "user"
};

export default Form;
