import { Checkbox } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode, Ref } from 'react'
import { forwardRef } from 'react'
import type { FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { BaseFieldProps } from '../../types'

type CheckboxFieldProps<TFieldValues extends FieldValues> =
  BaseFieldProps<TFieldValues> &
    Partial<
      Pick<
        ComponentProps<typeof Checkbox>,
        | 'disabled'
        | 'onBlur'
        | 'onChange'
        | 'onFocus'
        | 'progress'
        | 'size'
        | 'value'
        | 'data-testid'
        | 'helper'
        | 'tooltip'
      >
    > & {
      label?: string
      className?: string
      children?: ReactNode
      required?: boolean
    }

export const CheckboxField = forwardRef(
  <TFieldValues extends FieldValues>(
    {
      // validate,
      name,
      // label = '',
      size,
      progress,
      disabled,
      required,
      className,
      children,
      onChange,
      onBlur,
      onFocus,
      // value,
      rules,
      helper,
      tooltip,
      'data-testid': dataTestId,
    }: CheckboxFieldProps<TFieldValues>,
    ref: Ref<HTMLInputElement>,
  ) => (
    <Controller
      name={name}
      rules={{ required, ...rules }}
      render={({ field, fieldState: { error } }) => (
        <Checkbox
          {...field}
          onChange={event => {
            field.onChange(event)
            onChange?.(event)
          }}
          onBlur={event => {
            field.onBlur()
            onBlur?.(event)
          }}
          onFocus={onFocus}
          size={size}
          progress={progress}
          disabled={disabled}
          checked={!!field.value}
          error={error?.message}
          ref={ref}
          className={className}
          // value={input.value}
          required={required}
          data-testid={dataTestId}
          tooltip={tooltip}
          helper={helper}
        >
          {children}
        </Checkbox>
      )}
    />
  ),
)
