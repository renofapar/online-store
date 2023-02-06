import React from 'react'
import {useSelector} from 'react-redux'
import {Box, Button, Stepper, Step, StepLabel, TextField } from '@mui/material'
import {useForm} from 'react-hook-form'
import * as yup from "yup"
import { shades } from '../../theme'

export const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  const cart = useSelector(state => state.cart.cart)
  const {register, handleSubmit} = useForm()
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const handleFormSubmit = async (value, actions) => {
    setActiveStep(activeStep + 1)
  }
  const makePayment = async () => {

  }
  return <Box width="80%" m="100px auto">
    <Stepper activeStep={activeStep} sx={{m: '20px 0'}}>
      <Step>
        <StepLabel>Billing</StepLabel>
      </Step>
      <Step>
        <StepLabel>Payment</StepLabel>
      </Step>
    </Stepper>
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}
      display="flex" flexDirection="column" justifyContent="space-between" height="450px" mt="60px" maxWidth="320px"
    >
      <TextField  {...register("First name")} placeholder="First name" label="First name" required/>
      <TextField  {...register("Email")} placeholder="Email" label="Email" required/>
      <TextField  {...register("Country")} placeholder="Country" label="Country"/>
      <TextField  {...register("City")} placeholder="City" label="City"/>
      <TextField  {...register("Address")} placeholder="Address" label="Address"/>
      <Button type="submit" variant='outlined' size='large'>submit</Button>
    </Box>
  </Box>
}