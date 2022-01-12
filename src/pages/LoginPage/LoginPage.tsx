/* eslint-disable no-debugger */
/* eslint-disable no-console */
import { Grid, Box, Typography, Stack, TextField, Button } from '@mui/material';
import React, { FormEvent, FormEventHandler } from 'react';

const LoginPage: React.FC = () => {
  const onLoginSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent<HTMLFormElement>,
  ): void => {
    e?.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(formData.get('username'));
    console.log(formData.get('password'));
  };

  return (
    <Box height="100vh" id="LoginPage">
      <Grid container height="100vh">
        {/* App name and caption */}
        <Grid item md={6} container flex={1} justifyContent="center" alignItems="center">
          <Stack marginBottom="5em">
            <Typography variant="h3" color="#343434" fontWeight={600}>
              Easy Lay
            </Typography>
            <Typography variant="h6" marginTop="16px" color="#6c6c6c">
              A place to manage the Acima Retailers in few clicks!
            </Typography>
          </Stack>
        </Grid>

        {/* Login form */}
        <Grid item md={6} container justifyContent="center" alignItems="center">
          <Stack component="form" width="350px" onSubmit={onLoginSubmit}>
            <Typography variant="h6" fontWeight={500} marginBottom={3} color="#343434">
              Login
            </Typography>
            <Stack spacing={2.5} marginBottom={2.5}>
              <TextField required label="username" name="username" />
              <TextField required label="password" type="password" name="password" />
            </Stack>
            <Button variant="contained" size="large" fullWidth type="submit">
              Login
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
