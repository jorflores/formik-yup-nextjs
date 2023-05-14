import React from "react";

/* 
We install Yup, import the Field, Form, and the ErrorMessage components from Formik.
*/

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

/*

Formik makes form validation easy! When paired with Yup, they abstract all the complexities that surround handling forms in React. 
With that we can then go ahead to create the schema we’ll be using for the sign in form using Yup. 
Instead of creating custom validations for each possible input field, which can be tedious, depending on the number of fields there are, 
we can leave that to Yup to handle.


*/
function form3() {
  const initialValues = {
    email: "",
    password: "",
  };

  /*  #####################  Validation Using Formik’s Components And Yup  #####################   */

  /*

Yup works similarly to how we define propTypes in React. We created an object schema with Yup’s object function. We define the shape of the validation object schema and pass it into Yup’s shape() method. The required() method. This method takes a string as an argument, and this string will be the error message. that displays whenever a required field is left blank.

This schema has two properties:

An email property that is a string type and is required.
A password property that is of number type but is not required.


You can check additional validation methods  here: https://github.com/jquense/yup#string

*/

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(4, "Password is too short - should be 4 chars minimum"),
  });

  /*

While using HTML input fields get the job done, Formik’s custom components make things even easier for us, 
and reduce the amount of code we have to write. What are these custom components Formik provides us?

Formik: We’ve been using this for a while now. This is required for the other components to be usable.

Form: A wrapper that wraps the HTML <form/> element. It automatically links the onSubmit method to the form’s submit event.

Field: In the background, this automatically links the form input’s onChange, onBlur and value attributes to 
Formik’s handleChange, handleBlur, and values object respectively. 
It uses the name prop to match up with the state and automatically keeps the state in sync with the input value. 
With this component, we can decide to display it as an input field we want using it’s as property. 

For example, will render a textarea. By default, it renders an HTML input field.

ErrorMessage:  It handles rendering the error message for its respective field based on the value given to the name prop, 
which corresponds to the <Field />’s name prop. It displays the error message if the field has been visited and the error exists. 
By default, it renders a string is the component prop is not specified.

We pass the signInSchema into Formik using the validationSchema prop. 
The Formik team loves the Yup validation library so they created a specific prop for Yup called validationSchema which 
transforms errors into objects and matches against their values and touched functions.


*/
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            <h1>Sign in to continue</h1>
            <Form>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                <ErrorMessage name="email" component="span" className="error" />
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>

              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Sign In
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default form3;
