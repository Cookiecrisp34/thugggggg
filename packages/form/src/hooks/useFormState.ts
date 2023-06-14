import type { FieldValues } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

type UseFormStateParams = {
  subscription?: Record<string, boolean>
}

/**
 * @deprecated
 * @todo rename to useFormStateDeprecated
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useFormState = <TFieldValues extends FieldValues>(
  _params?: UseFormStateParams,
) => {
  const { formState, watch } = useFormContext<TFieldValues>()

  return {
    dirtySinceLastSubmit: formState.isDirty,
    submitErrors: formState.errors.root,
    values: watch(),
    hasValidationErrors: !formState.isValid,
    pristine: !formState.isDirty,
    errors: formState.errors,
    initialValues: formState.defaultValues,
    touched: formState.touchedFields,
    submitting: formState.isSubmitting,
    invalid: !formState.isValid,
    valid: formState.isValid,
  }
}
