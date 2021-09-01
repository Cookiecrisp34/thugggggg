import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  ChangeEvent,
  ClipboardEventHandler,
  FocusEventHandler,
  FunctionComponent,
  KeyboardEvent,
  KeyboardEventHandler,
  useState,
} from 'react'
import Box from '../Box'

const StyledInput = styled.input`
  border: solid 1px
    ${({ 'aria-invalid': error, theme }) =>
      error ? theme.colors.red : theme.colors.gray300};
  font-size: 24px;
  color: ${({ 'aria-invalid': error, theme }) =>
    error ? theme.colors.red : theme.colors.gray700};
  text-align: center;
  border-radius: 4px;
  margin-right: 8px;
  width: 56px;
  height: 64px;

  &:last-child {
    margin-right: 0;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`

const KEY_CODE = {
  backspace: 8,
  down: 40,
  left: 37,
  right: 39,
  up: 38,
}

type VerificationCodeProps = {
  disabled?: boolean
  error?: boolean
  /**
   * Amount of field you want
   */
  fields?: number
  initialValue?: string
  inputId?: string
  inputStyle?: string
  /**
   * Triggered when a field change
   */
  onChange?: (data: unknown) => void
  /**
   * Triggered when all fields are completed
   */
  onComplete?: (data: unknown) => void
  placeholder?: string
  required?: boolean
  /**
   * Type of the fields
   */
  type?: 'text' | 'number'
}

const VerificationCode: FunctionComponent<VerificationCodeProps> = ({
  disabled = false,
  error = false,
  fields = 4,
  initialValue = '',
  inputId = 'verification-code',
  inputStyle = '',
  onChange = () => {},
  onComplete = () => {},
  placeholder = '',
  required = false,
  type = 'number',
  ...props
}) => {
  const valuesArray = Object.assign(
    new Array(fields).fill(''),
    initialValue.substring(0, fields).split(''),
  )
  const [values, setValues] = useState(valuesArray)

  const inputRefs = Array.from({ length: fields }, () =>
    React.createRef<HTMLInputElement>(),
  )

  const triggerChange = (inputValues: string[]) => {
    const stringValue = inputValues.join('')
    if (onChange) {
      onChange(stringValue)
    }
    if (onComplete && stringValue.length >= fields) {
      onComplete(stringValue)
    }
  }

  const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(String(event.target.dataset.id), 10)
    let { value } = event.target
    if (type === 'number') {
      value = event.target.value.replace(/[^\d]/gi, '')
    }
    const newValues = [...values]

    if (
      value === '' ||
      (type === 'number' && !new RegExp(event.target.pattern).test(value))
    ) {
      newValues[index] = ''
      setValues(newValues)

      return
    }

    const sanitizedValue = value[0] // in case more than 1 char, we just take the first one
    newValues[index] = sanitizedValue
    setValues(newValues)
    const nextIndex = Math.min(index + 1, fields - 1)
    const next = inputRefs[nextIndex]

    next?.current?.focus()

    triggerChange(newValues)
  }

  const inputOnKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    const index = Number(event.currentTarget.dataset.id)
    const prevIndex = index - 1
    const nextIndex = index + 1
    const first = inputRefs[0]
    const last = inputRefs[inputRefs.length - 1]
    const prev = inputRefs[prevIndex]
    const next = inputRefs[nextIndex]
    const vals = [...values]

    switch (event.keyCode) {
      case KEY_CODE.backspace:
        event.preventDefault()
        if (values[index]) {
          vals[index] = ''
          setValues(vals)
          triggerChange(vals)
        } else if (prev) {
          vals[prevIndex] = ''
          prev?.current?.focus()
          setValues(vals)
          triggerChange(vals)
        }
        break
      case KEY_CODE.left:
        event.preventDefault()
        prev?.current?.focus()
        break
      case KEY_CODE.right:
        event.preventDefault()
        next?.current?.focus()
        break
      case KEY_CODE.up:
        event.preventDefault()
        first?.current?.focus()
        break
      case KEY_CODE.down:
        event.preventDefault()
        last?.current?.focus()
        break
      default:
        break
    }
  }

  const inputOnFocus: FocusEventHandler<HTMLInputElement> = event =>
    event.target.select()

  const inputOnPaste: ClipboardEventHandler<HTMLInputElement> = event => {
    event.preventDefault()
    const currentIndex = Number(event.currentTarget.dataset.id as string)
    const pastedValue = [...event.clipboardData.getData('Text').split('')].map(
      (copiedValue: string) =>
        // Replace non number char with empty char when type is number
        type === 'number' ? copiedValue.replace(/[^\d]/gi, '') : copiedValue,
    )

    // Trim array to avoid array overflow
    pastedValue.splice(
      fields - currentIndex < pastedValue.length
        ? fields - currentIndex
        : pastedValue.length,
    )

    setValues((vals: string[]) => {
      const newArray = vals.slice()
      newArray.splice(currentIndex, pastedValue.length, ...pastedValue)

      return newArray
    })
  }

  return (
    <Box {...props}>
      {values.map((value: string, index) => (
        <StyledInput
          css={[inputStyle]}
          aria-invalid={error}
          type={type === 'number' ? 'tel' : type}
          pattern={type === 'number' ? '[0-9]*' : undefined}
          // eslint-disable-next-line react/no-array-index-key
          key={`${inputId}-${index}`}
          data-id={index}
          value={value}
          id={inputId ? `${inputId}-${index}` : undefined}
          ref={inputRefs[index]}
          onChange={inputOnChange}
          onKeyDown={inputOnKeyDown}
          onPaste={inputOnPaste}
          onFocus={inputOnFocus}
          disabled={disabled}
          required={required}
          placeholder={placeholder?.[index] ?? ''}
        />
      ))}
    </Box>
  )
}

VerificationCode.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fields: PropTypes.number,
  initialValue: PropTypes.string,
  inputId: PropTypes.string,
  inputStyle: PropTypes.string,
  onChange: PropTypes.func,
  onComplete: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'number']),
}

export default VerificationCode