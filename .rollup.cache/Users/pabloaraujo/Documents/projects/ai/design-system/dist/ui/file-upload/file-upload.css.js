import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '@/tokens/tokens.css';
export const fileUploadRoot = style({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '120px',
    padding: tokens.space[6],
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderRadius: tokens.radius.md,
    transition: tokens.transition.base,
    cursor: 'pointer',
    ':hover': {
        opacity: 0.8,
    },
    ':focus-within': {
        outline: '2px solid var(--colors-border-focus)',
        outlineOffset: '2px',
    },
    selectors: {
        '&[data-drag-over="true"]': {
            borderColor: 'var(--colors-border-primary)',
            backgroundColor: 'var(--colors-background-secondary)',
            transform: 'scale(1.01)',
        },
        '&[data-disabled="true"]': {
            opacity: 0.6,
            cursor: 'not-allowed',
            pointerEvents: 'none',
        },
    },
});
export const variants = styleVariants({
    outline: {
        borderColor: 'var(--colors-border-secondary)',
        backgroundColor: 'transparent',
    },
    filled: {
        borderColor: 'var(--colors-border-secondary)',
        backgroundColor: 'var(--colors-background-secondary)',
    },
});
export const sizes = styleVariants({
    small: {
        minHeight: '80px',
        padding: tokens.space[4],
        fontSize: tokens.fontSize.sm,
    },
    medium: {
        minHeight: '120px',
        padding: tokens.space[6],
        fontSize: tokens.fontSize.base,
    },
    large: {
        minHeight: '160px',
        padding: tokens.space[8],
        fontSize: tokens.fontSize.lg,
    },
});
export const disabled = style({
    opacity: 0.6,
    cursor: 'not-allowed',
    ':hover': {
        opacity: 0.6,
    },
});
export const error = style({
    borderColor: 'var(--colors-border-error)',
    selectors: {
        '&[data-drag-over="true"]': {
            borderColor: 'var(--colors-border-error)',
            backgroundColor: 'var(--colors-background-error)',
        },
    },
});
export const hiddenInput = style({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
});
export const trigger = style({});
export const triggerContent = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space[2],
    lineHeight: 1,
});
export const triggerDisabled = style({
    pointerEvents: 'none',
});
export const list = style({
    width: '100%',
    marginTop: tokens.space[4],
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space[2],
});
export const item = style({
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space[3],
    padding: tokens.space[3],
    borderRadius: tokens.radius.md,
    border: '1px solid var(--colors-border-secondary)',
    backgroundColor: 'var(--colors-background-primary)',
    transition: tokens.transition.base,
    ':hover': {
        borderColor: 'var(--colors-border-primary)',
        backgroundColor: 'var(--colors-background-secondary)',
    },
});
export const itemError = style({
    borderColor: 'var(--colors-border-error)',
    backgroundColor: 'var(--colors-background-error)',
});
export const preview = style({
    width: '40px',
    height: '40px',
    borderRadius: tokens.radius.sm,
    objectFit: 'cover',
    border: '1px solid var(--colors-border-secondary)',
    flexShrink: 0,
});
export const fileIcon = style({
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.sm,
    backgroundColor: 'var(--colors-background-secondary)',
    color: 'var(--colors-text-secondary)',
    flexShrink: 0,
});
export const fileInfo = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space[1],
    minWidth: 0,
});
export const fileName = style({
    fontSize: tokens.fontSize.sm,
    fontWeight: tokens.fontWeight.medium,
    color: 'var(--colors-text-primary)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});
export const fileDetails = style({
    fontSize: tokens.fontSize.xs,
    color: 'var(--colors-text-secondary)',
    display: 'flex',
    gap: tokens.space[2],
});
export const fileSize = style({});
export const fileType = style({
    textTransform: 'uppercase',
});
export const deleteButton = style({
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.sm,
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--colors-text-secondary)',
    cursor: 'pointer',
    transition: tokens.transition.fast,
    flexShrink: 0,
    ':hover': {
        backgroundColor: 'var(--colors-background-error)',
        color: 'var(--colors-text-error)',
    },
    ':focus': {
        outline: '2px solid var(--colors-border-focus)',
        outlineOffset: '2px',
    },
});
export const dropZoneContent = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.space[3],
    textAlign: 'center',
});
export const dropZoneIcon = style({
    color: 'var(--colors-text-secondary)',
    fontSize: tokens.fontSize['2xl'],
});
export const dropZoneText = style({
    color: 'var(--colors-text-primary)',
    fontSize: tokens.fontSize.sm,
    fontWeight: tokens.fontWeight.medium,
});
export const dropZoneHint = style({
    color: 'var(--colors-text-secondary)',
    fontSize: tokens.fontSize.xs,
});
export const emptyState = style({
    padding: tokens.space[8],
    textAlign: 'center',
    color: 'var(--colors-text-secondary)',
});
export const progressBar = style({
    width: '100%',
    height: '4px',
    backgroundColor: 'var(--colors-background-secondary)',
    borderRadius: tokens.radius.full,
    overflow: 'hidden',
    marginTop: tokens.space[2],
});
export const progressFill = style({
    height: '100%',
    backgroundColor: 'var(--colors-border-primary)',
    transition: 'width 0.3s ease-in-out',
});
export const errorMessage = style({
    color: 'var(--colors-text-error)',
    fontSize: tokens.fontSize.xs,
    marginTop: tokens.space[2],
});
export const helperText = style({
    color: 'var(--colors-text-secondary)',
    fontSize: tokens.fontSize.xs,
    marginTop: tokens.space[2],
    textAlign: 'center',
});
