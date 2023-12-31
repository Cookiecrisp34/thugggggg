import type { Meta } from '@storybook/react'
import { Form, TextInputField } from '../..'
import { mockErrors } from '../../../mocks'

export default {
  component: TextInputField,
  decorators: [
    ChildStory => (
      <Form onRawSubmit={() => {}} errors={mockErrors}>
        {ChildStory()}
      </Form>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A switch field that act like a checkbox',
      },
    },
  },
  title: 'Form/Components/Fields/TextInputField',
} as Meta

export { Playground } from './Playground.stories'
export { Disabled } from './Disabled.stories'
export { Required } from './Required.stories'
export { DynamicRequired } from './DynamicRequired.stories'
export { MinMaxLength } from './MinMaxLength.stories'
export { Regex } from './Regex.stories'
