import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { forwardRef, memo, useCallback } from 'react'
import recursivelyGetChildrenString from '../../helpers/recursivelyGetChildrenString'
import { colors, fonts, radii } from '../../theme'
import { Box } from '../Box'
import { Tooltip } from '../Tooltip'

const styles = {
  main: css({
    color: colors.gray700,
    fontWeight: 400,
    marginBottom: 0,
    marginTop: 0,
  }),
  ellipsis: css({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }),
  hero: css({
    color: colors.gray950,
    fontSize: 35,
    lineHeight: '41px',
    marginBottom: 72,
  }),
  lead: css({
    color: colors.gray950,
    fontSize: 25,
    lineHeight: '25px',
    marginBottom: 0,
  }),
  'lead-block': css({
    marginBottom: 16,
    marginTop: 48,
  }),
  'lead-text': css({
    marginBottom: 24,
  }),
  title: css({
    color: colors.gray950,
    fontSize: 21,
    lineHeight: '24px',
  }),
  bodyA: css({
    color: colors.gray700,
    fontSize: 16,
    lineHeight: '24px',
  }),
  bodyB: css({
    color: colors.gray550,
    fontSize: 14,
    lineHeight: '18px',
  }),
  bodyC: css({
    color: colors.gray700,
    fontSize: 14,
    lineHeight: '22px',
  }),
  bodyD: css({
    color: colors.gray700,
    fontSize: 14,
    lineHeight: '20px',
  }),
  tiny: css({
    color: colors.gray550,
    fontSize: 12,
    lineHeight: '16px',
  }),
  description: css({
    color: colors.gray950,
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 500,
  }),
  samplecode: css({
    backgroundColor: colors.gray100,
    color: colors.gray700,
    fontSize: 12,
    lineHeight: '16px',
    padding: 4,
  }),
  badge: css({
    backgroundColor: colors.gray100,
    color: colors.gray700,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '16px',
    padding: '6px 12px',
    borderRadius: 20,
  }),
  link: css`
    color: #3f6ed8;
    :hover {
      text-decoration: underline;
    }
  `,
  clamp: maxLines => css`
    -webkit-line-clamp: ${maxLines};
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  `,
  command: css`
    font-family: ${fonts.monospace};
    font-size: 13px;
    font-weight: 500;
    border-radius: ${radii.default};
    color: ${colors.gray700};
    background-color: ${colors.gray100};
    padding: 3px 5px;
  `,
}

const variantTags = {
  default: 'div',
  hero: 'h1',
  lead: 'h2',
  'lead-block': 'h2',
  'lead-text': 'h2',
  title: 'h3',
  bodyA: 'p',
  bodyB: 'p',
  bodyC: 'p',
  bodyD: 'p',
  tiny: 'small',
  samplecode: 'code',
  command: 'code',
  description: 'p',
  link: 'div',
}

const textColors = {
  inherit: 'inherit',
  alert: colors.orange,
  white: colors.white,
  darkBlack: colors.gray950,
  lightBlack: colors.gray700,
  darkGrey: colors.gray550, // TODO: deprecated, to be removed soon
  grey: colors.gray350, // TODO: deprecated, to be removed soon
  darkGray: colors.gray550,
  gray: colors.gray350,
  light: colors.gray100,
  green: colors.green,
  red: colors.red,
  warning: colors.warning,
  blue: colors.blue,
  violet: colors.primary,
  primary: colors.primary,
  lightPrimary: colors.gray200,
  gold: colors.gold,
}

const Text = ({
  onMouseEnter = undefined,
  onFocus = undefined,
  tooltipProps = {},
  variant,
  children,
  as,
  color,
  align,
  lineHeight,
  maxLines = 0,
  ellipsis,
  fontWeight,
  ref,
  ...props
}) => {
  const variantStyles = ['lead-block', 'lead-text'].includes(variant)
    ? [styles.lead, styles[variant]]
    : [styles[variant]]

  return (
    <Box
      ref={ref}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      {...tooltipProps}
      {...props}
      as={as || variantTags[variant]}
      css={[
        styles.main,
        ...variantStyles,
        color && css({ color: textColors[color] }),
        align && css({ textAlign: align }),
        ellipsis && styles.ellipsis,
        lineHeight && css({ lineHeight }),
        fontWeight && css({ fontWeight }),
        maxLines && maxLines > 0 && styles.clamp(maxLines),
      ]}
    >
      {children}
    </Box>
  )
}

const TextWithTooltip = props => {
  const isTruncated = useCallback((target = {}) => {
    // If the text is really truncated
    const { offsetWidth, scrollWidth } = target
    return offsetWidth < scrollWidth
  }, [])

  const finalStringChildren = recursivelyGetChildrenString(props.children)

  return (
    <Tooltip text={finalStringChildren} maxWidth={650}>
      {({
        width,
        onMouseEnter = () => {},
        onFocus = () => {},
        ...tooltipProps
      }) => (
        <Text
          onMouseEnter={ev => {
            if (isTruncated(ev.currentTarget)) {
              onMouseEnter(ev)
            }
          }}
          onFocus={ev => {
            if (isTruncated(ev.currentTarget)) {
              onFocus(ev)
            }
          }}
          tooltipProps={tooltipProps}
          {...props}
        />
      )}
    </Tooltip>
  )
}

const Typography = forwardRef((props, ref) => {
  const Component = props.ellipsis ? TextWithTooltip : Text
  return <Component ref={ref} {...props} />
})

const typographyVariants = Object.keys(variantTags)

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(typographyVariants),
  as: PropTypes.string,
  color: PropTypes.oneOf(Object.keys(textColors)),
  align: PropTypes.string,
  ellipsis: PropTypes.bool,
  maxLines: PropTypes.number,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontWeight: PropTypes.number,
}

Typography.defaultProps = {
  as: null,
  color: null,
  align: null,
  ellipsis: false,
  maxLines: 0,
  lineHeight: null,
  fontWeight: null,
  variant: 'default',
}

const MemoizedTypography = memo(Typography)

export { MemoizedTypography as Typography, typographyVariants }
