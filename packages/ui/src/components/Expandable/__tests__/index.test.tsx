import { Expandable } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Expandable', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<Expandable>Sample Expandable</Expandable>))

  test('renders correctly opened', () =>
    shouldMatchEmotionSnapshot(
      <Expandable opened>Sample Expandable</Expandable>,
    ))

  test('renders correctly with minHeight', () =>
    shouldMatchEmotionSnapshot(
      <Expandable minHeight={5}>Sample Expandable</Expandable>,
    ))

  test('renders correctly with className', () =>
    shouldMatchEmotionSnapshot(
      <Expandable className="test">Sample Expandable</Expandable>,
    ))
})