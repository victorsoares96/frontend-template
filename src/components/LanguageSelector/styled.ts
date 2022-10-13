import {
  MenuItem as MuiMenuItem,
  NativeSelect as MuiNativeSelect,
  Select as MuiSelect,
  alpha,
  styled,
} from '@mui/material';

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({}));

const NativeSelect = styled(MuiNativeSelect)(({ theme }) => ({
  '&.MuiInputBase-root': {
    backgroundColor: alpha(theme.palette.common.black, 0.06),
    borderRadius: '12px',
    fontSize: '14px',

    '&::before': {
      borderBottom: 'none !important',

      '::hover': {
        borderBottom: 'none',
      },
    },

    '& .MuiNativeSelect-select': {
      textAlign: 'center',
      paddingRight: '0',
      padding: '10px 20px',

      '&:focus': {
        borderRadius: '12px',
      },
    },

    '&::after': {
      borderBottom: 'none',
    },

    '& .MuiSvgIcon-root': {
      display: 'none',
    },
  },

  '& .MuiSelect-select': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: '12px',
    // color: theme.palette.common.white,
    padding: theme.spacing(1, 2),
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color']),

    '&:focus': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
}));

const Select = styled(MuiSelect)(({ theme }) => ({
  '&.MuiInputBase-root': {
    borderRadius: '12px',
    fontSize: '14px',

    '&::before': {
      borderBottom: 'none !important',

      '::hover': {
        borderBottom: 'none',
      },
    },

    '&::after': {
      borderBottom: 'none',
    },

    '& .MuiSvgIcon-root': {
      display: 'none',
    },
  },

  '& .MuiSelect-select': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: '12px',
    // color: theme.palette.common.white,
    padding: theme.spacing(1, 2),
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color']),

    '&:focus': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
}));

export { MenuItem, Select, NativeSelect };
