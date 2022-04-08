import React from 'react';
import { updateUser } from '../../store/users';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Formik, Form, useField } from 'formik';
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import * as yup from 'yup';

const MyTextField = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      fullWidth={true}
      {...field}
      helperText={errorText}
      error={!!errorText}
      className="textfield"
      style={{ width: 350 }}
      id="outlined-basic"
      label={label}
      variant="outlined"
      type={type}
    />
  );
};

const validationSchema = yup.object({
  firstName: yup.string().required('firstname is required').min(1).max(15),
  lastName: yup.string().min(2).max(25),
  password: yup.string().min(3).max(15),
  dateOfBirth: yup.string().max(10),
  bio: yup.string().max(150),
  phoneNumber: yup.string().max(10),
  email: yup
    .string()
    .email('must be a valid email')
    .required('email is required')
    .max(25),
  imageUrl: yup.string().max(200),
});

const UserForm = ({ handleCloseFormModal }) => {
  const id = useSelector((state) => state.auth.id);
  const currUser = useSelector(
    (state) => state.users.find((user) => user.id === id) || {}
  );
  const currPassword = currUser.password;
  const history = useHistory();
  const dispatch = useDispatch();

  const updateToast = () => toast.success('Profile updated');

  return (
    <div className="form">
      {injectStyle()}
      <Card sx={{ maxWidth: 420 }}>
        <CardMedia
          className="form-img"
          component="img"
          height="260"
          image={currUser.imageUrl}
          style={{ objectFit: 'cover', display: 'block' }}
        />
        <CardContent>
          <div>
            {' '}
            <Formik
              initialValues={{
                id: currUser.id || 1,
                email: currUser.email || '',
                firstName: currUser.firstName || '',
                lastName: currUser.lastName || '',
                // dateOfBirth: currUser.dateOfBirth || '',
                // phoneNumber: currUser.phoneNumber || '',
                imageUrl: currUser.imageUrl || '',
                bio: currUser.bio || '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              validate={(values) => {
                const errors = {};
                values.password !== values.confirmPassword
                  ? (errors.confirmPassword = 'Passwords do not match')
                  : '';
                return errors;
              }}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true); // before async call
                if (data.password === '') {
                  dispatch(updateUser({ ...data, password: currPassword }));
                } else {
                  dispatch(updateUser(data));
                }
                setSubmitting(false); //after async call
              }}
            >
              {({ isSubmitting }) => (
                <Form className="form-fields">
                  <Grid container direction={'column'} spacing={2}>
                    <Grid item>
                      <MyTextField label="Email" name="email" type="input" />
                    </Grid>
                    <Grid item>
                      <MyTextField
                        label="First Name"
                        name="firstName"
                        type="input"
                      />
                    </Grid>
                    <Grid item>
                      <MyTextField
                        label="Last Name"
                        name="lastName"
                        type="input"
                      />
                    </Grid>
                    <Grid item>
                      <MyTextField label="Bio" name="bio" type="input" />
                    </Grid>
                    <Grid item>
                      <MyTextField
                        label="Photo URL"
                        name="imageUrl"
                        type="input"
                      />
                    </Grid>
                    <Grid item>
                      <MyTextField
                        label="New Password"
                        name="password"
                        type="password"
                      />
                    </Grid>
                    <Grid item>
                      <MyTextField
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                      />
                    </Grid>
                    <Grid item className="form-btns">
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        sx={{ color: 'black', width: '50%' }}
                        onClick={() => updateToast()}
                        variant="outlined"
                      >
                        SUBMIT
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleCloseFormModal()}
                        sx={{ color: 'black', width: '50%' }}
                        variant="outlined"
                      >
                        CANCEL
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserForm;
