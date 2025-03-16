import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../lib/hooks/contextHooks/useAuthContext'
import { LogInFormType } from '../../lib/types/forms/LoginForm'

type LoginProps = {}

const Login: React.FC<LoginProps> = () => {
  const { login } = useAuthContext();
  const {
    handleSubmit,
    register,
  } = useForm<LogInFormType>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  return (
    <Box component={'form'} height={'100%'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <Box
        border={2}
        borderColor={'primary.main'}
        height={'50vh'}
        width={'25rem'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        padding={'2rem'}
        gap={'1rem'}
        borderRadius={'2rem'}
        justifyContent={'space-between'}
      >
        <Typography variant='h4'>Login</Typography>
        <TextField
          label='Email'
          variant='outlined'
          autoComplete='email'
          fullWidth
          {...register('email', {required: true})}
        />
        <TextField
          label='Password'
          variant='outlined'
          type='password'
          autoComplete='password'
          fullWidth
          {...register('password', {required: true})}
        />
        <Button variant='contained' onClick={handleSubmit(login)}>Login</Button>
      </Box>
    </Box>
  )
}

export default Login