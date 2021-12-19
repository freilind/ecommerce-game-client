import React, { useState } from "react";
import { Form, Button, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateEmailApi } from "../../../api/user";

export default function ChangeEmailForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: _initialValues(),
    validationSchema: Yup.object(_validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateEmailApi(user.id, formData.email, logout);
      if (!response || response?.statusCode >= 400) {
        toast.error("Error updating your email.");
      } else {
        setReloadUser(true);
        toast.success("Email updated.");
        formik.handleReset();
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-email-form">
      <h4>
        Change your e-mail <span>({user.email})</span>
      </h4>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="New e-mail"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatEmail"
            placeholder="Confirm new e-mail"
            onChange={formik.handleChange}
            value={formik.values.repeatEmail}
            error={formik.errors.repeatEmail}
          />
        </Form.Group>
        <Button type="submit" className="submit" loading={loading}>
          Change email
          <span>
            <Icon name="at" />
          </span>
        </Button>
      </Form>
    </div>
  );
}

const _initialValues = () => ({
  email: "",
  repeatEmail: "",
});

const _validationSchema = () => ({
  email: Yup.string()
    .email()
    .required()
    .max(60)
    .oneOf([Yup.ref("repeatEmail")], true),
  repeatEmail: Yup.string()
    .email()
    .required()
    .max(60)
    .oneOf([Yup.ref("email")], true),
});
