import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { loginApi, resetPasswordApi } from "../../../api/user";

const LoginForm = ({ showRegisterForm, onCloseModal }) => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const _onSubmit = async (formData) => {
    setLoading(true);
    const response = await loginApi(formData);
    console.log(response);
    if (response?.jwt) {
      login(response.jwt);
      onCloseModal();
    } else {
      toast.error("Error with credentials.");
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: _initialValues(),
    validationSchema: Yup.object(_validationSchema()),
    onSubmit: _onSubmit,
  });

  const restPassword = () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email().required().max(60);
    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: true });
    } else {
      resetPasswordApi(formik.values.identifier);
    }
  };

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        value="test@test.com"
        type="text"
        placeholder="Email"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        value="test123"
        type="password"
        placeholder="Password"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
          Sign up
        </Button>
        <div>
          <Button
            type="submit"
            className="submit"
            disabled={loading}
            loading={loading}
          >
            Sign in
          </Button>
          <Button type="button" onClick={restPassword}>
            Forgot password?
          </Button>
        </div>
      </div>
    </Form>
  );
};

const _initialValues = () => ({
  identifier: "test@test.com",
  password: "test123",
});

const _validationSchema = () => ({
  identifier: Yup.string().email().required().max(60),
  password: Yup.string().required().min(6).max(20),
});

export default LoginForm;
