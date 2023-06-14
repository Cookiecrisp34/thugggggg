import type {
  FieldError,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseControllerProps,
  Validate,
} from 'react-hook-form'

// export type FormErrorFunctionParams<InputValue = unknown> = {
//   label: string
//   // name: string
//   // value: InputValue
// }

export type MetaField = {
  min?: number | string
  max?: number | string
  minLength?: number
  maxLength?: number
  regex?: RegExp[]
  minDate?: Date
  maxDate?: Date
  label: string
}

type RequiredErrors = {
  [key in FieldError['type']]: (params: MetaField) => string
}

export type FormErrors = RequiredErrors

export type ValidatorProps = {
  required?: boolean
  min?: number | string
  minLength?: number
  max?: number | string
  maxLength?: number
  regex?: (RegExp | RegExp[])[]
  maxDate?: Date
  minDate?: Date
}

export type BaseFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>
  required?: boolean
  validate?: Validate<PathValue<TFieldValues, Path<TFieldValues>>, TFieldValues>
  rules?: UseControllerProps<TFieldValues>['rules']
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>
  label?: string
}
