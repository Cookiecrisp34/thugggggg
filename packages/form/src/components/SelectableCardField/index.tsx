import { SelectableCard } from '@ultraviolet/ui'
import type { FieldState } from 'final-form'
import type { ComponentProps, JSX } from 'react'
import { useFormField } from '../../hooks'
import { useErrors } from '../../providers'
import type { BaseFieldProps } from '../../types'

type SelectableCardValue = NonNullable<
  ComponentProps<typeof SelectableCard>['value']
>

type SelectableCardFieldProps<
  T = SelectableCardValue,
  K = string,
> = BaseFieldProps<T, K> &
  Partial<
    Pick<
      ComponentProps<typeof SelectableCard>,
      | 'disabled'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'value'
      | 'showTick'
      | 'type'
      | 'id'
      | 'children'
      | 'name'
      | 'tooltip'
      | 'label'
      | 'data-testid'
    >
  > & {
    name: string
    required?: boolean
    className?: string
  }

export const SelectableCardField = ({
  name,
  value,
  onChange,
  showTick,
  type,
  disabled,
  children,
  className,
  onFocus,
  onBlur,
  required,
  validate,
  tooltip,
  id,
  label,
  'data-testid': dataTestId,
}: SelectableCardFieldProps): JSX.Element => {
  const { getError } = useErrors()

  const { input, meta } = useFormField(name, {
    disabled,
    required,
    type: type ?? 'radio',
    validate,
    value,
  })

  const error = getError({
    label: name,
    meta: meta as FieldState<unknown>,
    name,
    value: input.value,
  })

  return (
    <SelectableCard
      isError={!!error}
      showTick={showTick}
      checked={input.checked}
      className={className}
      disabled={disabled}
      name={input.name}
      onChange={event => {
        input.onChange(event)
        onChange?.(event)
      }}
      onBlur={event => {
        input.onBlur(event)
        onBlur?.(event)
      }}
      onFocus={event => {
        input.onFocus(event)
        onFocus?.(event)
      }}
      type={type}
      value={input.value}
      id={id}
      tooltip={tooltip}
      label={label}
      data-testid={dataTestId}
    >
      {children}
    </SelectableCard>
  )
}
