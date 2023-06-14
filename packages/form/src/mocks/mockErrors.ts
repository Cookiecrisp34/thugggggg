import type { FormErrors, MetaField } from '../types'

export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export const mockErrors: FormErrors = {
  maxDate: ({ maxDate }) => `Date must be lower than ${maxDate?.toString()}`,
  maxLength: ({ maxLength }) =>
    `This field should have a length lower than ${maxLength}`,
  minDate: ({ minDate }) => `Date must be greater than ${minDate?.toString()}`,
  minLength: ({ minLength }) =>
    `This field should have a length greater than ${minLength}`,
  pattern: ({ regex }) => `This field should match the regex`,
  required: () => 'This field is required',
  max: ({ max }) => `This field is too high (maximum is : ${max})`,
  min: () => 'This field is too low',
  onChange(params: MetaField): string {
    throw new Error('Function not implemented.')
  },
  disabled(params: MetaField): string {
    throw new Error('Function not implemented.')
  },
  value(params: MetaField): string {
    throw new Error('Function not implemented.')
  },
  onBlur(params: MetaField): string {
    throw new Error('Function not implemented.')
  },
  valueAsNumber(params: MetaField): string {
    throw new Error('Function not implemented.')
  },
  valueAsDate(params: MetaField): string {
    throw new Error('Function not implemented.')
  },
  setValueAs(params: MetaField): string {
    throw new Error('Function not implemented.')
  },
  validate(params: MetaField): string {
    throw new Error('Function not implemented.')
  },
  shouldUnregister(params: MetaField): string {
    throw new Error('Function not implemented.')
  },
  deps(params: MetaField): string {
    throw new Error('Function not implemented.')
  },
}
