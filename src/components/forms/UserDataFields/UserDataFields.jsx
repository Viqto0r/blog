import _Input from '../_Input/_Input'
import _Select from '../_Select/_Select'
import { countries, genders } from './UserDataFields-config'
import { passwordPattern } from '../validationPatterns'

const UserDataForm = ({
  control,
  errors,
  getValues,
  errorMessages,
  requiredPasswords = true,
}) => {
  const validatePassword = requiredPasswords
    ? {
        notEmpty: (e) => e !== undefined,
        uniqPass: (e) => e !== getValues('oldPassword'),
      }
    : null
  const validateConfirm = requiredPasswords
    ? {
        match: (e) => e === getValues('password'),
      }
    : null

  return (
    <>
      <_Input
        control={control}
        type='password'
        name='password'
        label='Password'
        error={errors.password}
        errorMessage={errorMessages.password}
        status={errors.password && 'error'}
        rules={{
          required: requiredPasswords,
          //pattern: passwordPattern,
          validate: validatePassword,
        }}
        placeholder={'Password'}
      />
      <_Input
        control={control}
        type='password'
        name='confirm'
        label='Confirm password'
        error={errors.confirm}
        errorMessage='Passwords mismatch'
        rules={{
          required: requiredPasswords,
          validate: {
            match: (e) => e === getValues('password'),
          },
        }}
        placeholder={'Confirm password'}
      />
      <_Select
        control={control}
        name='gender'
        error={errors.gender}
        errorMessage='Please select gender'
        label='Gender'
        options={genders}
        rules={{
          required: true,
          validate: { notEmpty: (e) => e !== undefined },
        }}
      />
      <_Select
        control={control}
        name='country'
        label='Country'
        error={errors.country}
        errorMessage='Please select your country!'
        options={countries}
        showSearch={true}
        placeholder='Search your country'
        styles={{ width: 200 }}
        rules={{
          required: true,
          validate: { notEmpty: (e) => e !== undefined },
        }}
      />
      <_Input
        type='number'
        name='phone'
        control={control}
        error={errors.phone}
        errorMessage='Invalid phone'
        label='Phone'
        rules={{
          required: true,
          pattern: /\d{10}/,
          validate: { notEmpty: (e) => e !== undefined },
        }}
        placeholder={'Phone'}
        addonTextBefore='+7'
      />
      <_Input name='website' label='Website' control={control} />
      <_Input name='intro' label='Intro' control={control} />
    </>
  )
}

export default UserDataForm
