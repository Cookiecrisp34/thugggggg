import type { Meta } from '@storybook/react'
import { PieChart } from '..'

export default {
  component: PieChart,
  decorators: [StoryComponent => <StoryComponent />],
  title: 'Components/Data Display/Chart/PieChart',
  parameters: {
    experimental: true,
  },
} as Meta<typeof PieChart>

export { Playground } from './Playground.stories'
export { Content } from './Content.stories'
export { Legends } from './Legends.stories'
export { PopperDetails } from './PopperDetails.stories'
export { EmptyLegend } from './EmptyLegend.stories'
