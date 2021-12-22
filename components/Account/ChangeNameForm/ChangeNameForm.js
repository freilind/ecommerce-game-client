import React, { useState } from "react";
import { Form, Button, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateNameApi } from "../../../api/user";

export default function ChangeNameForm(props) {
  const { userTest, user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: _initialValues(user.name, user.lastname),
    validationSchema: Yup.object(_validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateNameApi(user.id, formData, logout);
      if (!response || response?.statusCode >= 400) {
        toast.error("Error updating name and lastname.");
      } else {
        setReloadUser(true);
        toast.success("Names and lastname updated.");
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-name-form">
      <h4>Change your name and lastname</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            disabled={userTest}
            name="name"
            placeholder="New name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Form.Input
            disabled={userTest}
            name="lastname"
            placeholder="New lastname"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Group>
        <Button
          disabled={userTest}
          type="submit"
          className="submit"
          loading={loading}
        >
          Change name
          <span>
            <Icon name="user outline" />
          </span>
        </Button>
      </Form>
    </div>
  );
}

const _initialValues = (name, lastname) => ({
  name: name || "",
  lastname: lastname || "",
});

const _validationSchema = () => ({
  name: Yup.string()
    .required()
    .min(4, "must be at least 4 characters")
    .max(20, "must be at most 20 characters"),
  lastname: Yup.string()
    .required()
    .min(4, "must be at least 4 characters")
    .max(20, "must be at most 20 characters"),
});
