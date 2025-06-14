import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../lib/hooks/contextHooks/useAuthContext';
import { SignUpFormType } from '../../lib/types/forms/SignUpForm';
import { useDefaultErrorHandler } from '../../lib/hooks/useDefaultErrorHandler';

type SignUpProps = {}

const SignUp:React.FC<SignUpProps> = () => {
  const { signUp, isSignUpPending, signUpError } = useAuthContext();
  useDefaultErrorHandler(signUpError);
  const {
    handleSubmit,
    register,
  } = useForm<SignUpFormType>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    }
  })
  return (
    <Box component={'form'} height={'100%'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <Box
        border={2}
        borderColor={'primary.main'}
        height={'70vh'}
        width={'25rem'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        padding={'2rem'}
        gap={'1rem'}
        borderRadius={'2rem'}
        justifyContent={'space-between'}
      >
        <Typography variant='h4'>Sign Up</Typography>
        <TextField
          label='Email'
          variant='outlined'
          autoComplete='email'
          fullWidth
          {...register('email', {required: true})}
        />
        <TextField
          label='Name'
          variant='outlined'
          autoComplete='name'
          fullWidth
          {...register('name', {required: true})}
        />
        <TextField
          label='Password'
          variant='outlined'
          type='password'
          autoComplete='password'
          fullWidth
          {...register('password', {required: true})}
        />
        <TextField
          label='Confirm Password'
          variant='outlined'
          type='password'
          autoComplete='confirm-password'
          fullWidth
          {...register('confirmPassword', {required: true})}
        />
        <Button variant='contained' disabled={isSignUpPending} loading={isSignUpPending} onClick={handleSubmit(signUp)}>Sign Up</Button>
      </Box>
    </Box>
  )
}

export default SignUp