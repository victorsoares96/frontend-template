import { Stack, SxProps, Theme } from '@mui/material';

interface Props {
  endIcon?: boolean;
  icon: React.ReactNode;
  sx?: SxProps<Theme>;
  value: string | React.ReactNode;
}

function TextIconLabel({ icon, value, endIcon = false, sx, ...other }: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        typography: 'body2',
        ...sx,
      }}
      {...other}
    >
      {!endIcon && icon}
      {value}
      {endIcon && icon}
    </Stack>
  );
}

TextIconLabel.defaultProps = {
  endIcon: false,
  sx: {},
};

export default TextIconLabel;
