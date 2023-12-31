import { describe, expect, jest, test } from '@jest/globals'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Breadcrumbs } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Breadcrumbs', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(
      <Breadcrumbs>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item to="/step1/step2">
          I&apos;m a very long long long long long long long long long long long
          long step
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
    ))

  test('renders correctly with selected item', () =>
    shouldMatchEmotionSnapshot(
      <Breadcrumbs selected={1}>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item to="/step1/step2">
          I&apos;m a very long long long long long long long long long long long
          long step
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
    ))

  test('renders correctly with onClick', () => {
    const onClick = jest.fn()

    return shouldMatchEmotionSnapshot(
      <Breadcrumbs>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item to="/step1/step2">
          I&apos;m a very long long long long long long long long long long long
          long step
        </Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={onClick}>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
      {
        transform: async () => {
          const step3 = screen.getByText('Step 3')
          await userEvent.click(step3)
          expect(onClick).toHaveBeenCalledTimes(1)
        },
      },
    )
  })
  test('renders correctly with invalid child', () =>
    shouldMatchEmotionSnapshot(
      <Breadcrumbs selected={1}>Invalid child</Breadcrumbs>,
    ))
})
