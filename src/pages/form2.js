import React from "react";
import { Formik } from "formik";

function form2() {
  /*  #####################  Formik, HTML Input Fields And Custom Validation Rules #####################   */

  /*

Before creating the component, we need to create an initialValues and validate object which we’ll pass as props to the 
Formik component when we set it up. initialValues and validate are code snippets, not normal words.

The decision to do this outside the component is not a technical one, but rather for readability of our code.

*/

  // initialValues: is an object that describes the initial values of the respective form fields.
  // The name given to each key in the initialValues must correspond with the value of the name of the input field we want Formik to watch.

  const initialValues = {
    email: "",
    password: "",
  };

  /*
validate: this accepts a function that handles the form validation. 
The function accepts an object in the form of data values as an argument and validates each property 
in the object based on the rules defined. 

Each key in the values object must correspond with the name of the input field.

  */
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password too short";
    }
    return errors;
  };

  /*

  onSubmit: This handles what happens after the user submits. 
  The onSubmit prop takes a callback function that will only run when there are no errors, meaning the user inputs are valid.

  */

  const submitForm = (values) => {
    console.log(values);
  };

  /*

  Using the render props pattern, we have access to even more props the Formik API provides.

values: This holds the values of the user inputs.

handleChange : This is the input change event handler. It is passed to the input field <input onChange={handleChange}>. 
It handles the changes of the user inputs.

handleSubmit: The form submission handler. It is passed into the form <form onSubmit={props.handleSubmit}>. 
This fires the function passed into the onSubmit prop whenever the form is submitted.

errors: This object holds the validation errors that correspond to each input field, 
and is populated with the definitions we passed into the Yup object schema.

touched:  This is an object that watches if a form field has been touched. 
Each key corresponds to the name of the input elements and has a boolean value.

handleBlur:  This is the onBlur event handler, and it is passed to the input field <input onBlur={handleBlur} />. 
When the user removes focus from an input, this function is called. 
Without it, if there are any errors in the input when it loses focus, the errors will only display when the user tries to submit.

isValid:  Returns true if there are no errors (i.e. the errors object is empty) and false otherwise.

dirty: This prop checks if our form has been touched or not. We can use this to disable our submit button when the form loads initially.



*/

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitForm}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
        } = formik;
        return (
          <div className="container">
            <h1>Sign in to continue</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                {errors.email && touched.email && (
                  <span className="error">{errors.email}</span>
                )}
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                {errors.password && touched.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>

              <button
                type="submit"
                className={dirty && isValid ? "" : "disabled-btn"}
                disabled={!(dirty && isValid)}
              >
                Sign In
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default form2;
