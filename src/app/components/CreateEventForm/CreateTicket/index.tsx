import { Formik, FormikHelpers } from "formik";
import { ChangeEvent } from "react";

// Interface the values
interface Values {
  price: number;
}
interface Errors {
  price?: string;
}
// Set initial Values
const initialValues = {
  price: 0,
};
// Set the form validation
const formikFormValidation = (values: Values): Errors => {
  const errors: Errors = {};
  if (values.price <= 0) {
    errors.price = "Price Needs to be greater than 0";
  }

  return errors;
};

const submitHandler = (
  values: Values,
  { setSubmitting }: FormikHelpers<Values>
) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

interface CreateTicketProps {
  next: () => void;
  back: () => void;
}

export const CreateTicket = ({ next, back }: CreateTicketProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={formikFormValidation}
      onSubmit={submitHandler}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full max-w-xs">
            <input
              className={`input input-bordered w-full max-w-xs ${
                errors.price && "input-error"
              }`}
              type="number"
              required
              name="price"
              placeholder="9.99"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price > 0 ? values.price : ""}
            />
            <label className="label">
              {errors.price && touched.price && (
                <span className="label-text-alt text-red-400">
                  {errors.price}
                </span>
              )}
            </label>
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};
