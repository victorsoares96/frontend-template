import { Theme, Typography } from '@mui/material';
import { SxProps, styled } from '@mui/material/styles';

import Image from './Image';

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}));

interface Props {
  title: string;
  img?: string;
  description?: string;
  sx?: SxProps<Theme>;
}

export default function EmptyContent({ title, description, img, ...other }: Props) {
  return (
    <RootStyle {...other}>
      <Image
        disabledEffect
        visibleByDefault
        alt="empty content"
        src={
          img ||
          'https://minimal-assets-api.vercel.app/assets/illustrations/illustration_empty_content.svg'
        }
        sx={{ height: 240, mb: 3 }}
      />

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </RootStyle>
  );
}

EmptyContent.defaultProps = {
  img: undefined,
  description: undefined,
  sx: {},
};
