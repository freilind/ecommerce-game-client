import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerApi } from "../../../api/user";
import { toast } from "react-toastify";

const RegisterForm = ({ showLoginForm }) => {
  const [loading, setLoading] = useState(false);

  const _onSubmit = async (formData) => {
    setLoading(true);
    const response = await registerApi(formData);
    if (response?.jwt) {
      toast.success("Register success.");
      showLoginForm();
    } else {
      toast.error("Error register user.");
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: _initialValues(),
    validationSchema: Yup.object(_validationSchema()),
    onSubmit: _onSubmit,
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="Name"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Last name"
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        name="username"
        type="text"
        placeholder="Username"
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Email"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Password"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={showLoginForm}>
          Sign in
        </Button>
        <Button
          type="submit"
          className="submit"
          disabled={loading}
          loading={loading}
        >
          Register
        </Button>
      </div>
    </Form>
  );
};

const _initialValues = () => ({
  name: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
});

const _validationSchema = () => ({
  name: Yup.string().required(),
  lastname: Yup.string().required(),
  username: Yup.string().required().min(6).max(20),
  email: Yup.string().email().required().max(60),
  password: Yup.string().required().min(6).max(20),
});

export default RegisterForm;
