import type { Story } from '@storybook/react'
import { List } from '..'
import { columns, data as sourceData } from './resources'

export const RowExpandable: Story = () => (
  <List columns={columns}>
    {sourceData.map(planet => (
      <List.Row
        key={planet.id}
        id={planet.id}
        isDisabled={planet.id === 'saturn'}
        expandable="Planet description"
      >
        <List.Cell>{planet.name}</List.Cell>
        <List.Cell>{planet.perihelion}AU</List.Cell>
        <List.Cell>{planet.aphelion}AU</List.Cell>
      </List.Row>
    ))}
  </List>
)

RowExpandable.parameters = {
  docs: {
    storyDescription:
      'A row can be expanded in order to display more content/details. For that you must to add a `List.Expandable`.\n\nThe prop `autoclose` allows to automatically close the expanded rows when expanding a row.\n\nIt is recommand to use the property `showExpandArrow` if to indicate that user can click on the row to expand it.\n\nThe content of List.Expandable is only rendered if row is expanded.',
  },
}
