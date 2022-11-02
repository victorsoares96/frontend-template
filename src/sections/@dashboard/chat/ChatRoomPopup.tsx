import { Avatar, DialogContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Iconify from '@/components/Iconify';
import { DialogAnimate } from '@/components/animate';

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(1.5),
}));

interface ChatRoomPopupProps {
  participant: {
    name: string;
    avatar: string;
    position: string;
    address: string;
    phone: string;
    email: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatRoomPopup({ participant, isOpen, onClose }: ChatRoomPopupProps) {
  const { name, avatar, position, address, phone, email } = participant;

  return (
    <DialogAnimate fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogContent sx={{ pb: 5, textAlign: 'center' }}>
        <Avatar
          alt={name}
          src={avatar}
          sx={{
            mt: 5,
            mb: 2,
            mx: 'auto',
            width: 96,
            height: 96,
          }}
        />
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
          {position}
        </Typography>

        <RowStyle>
          <Iconify
            icon="eva:pin-fill"
            sx={{ mr: 1, width: 16, height: 16, color: 'text.disabled' }}
          />
          <Typography variant="body2">{address}</Typography>
        </RowStyle>
        <RowStyle>
          <Iconify
            icon="eva:phone-fill"
            sx={{ mr: 1, width: 16, height: 16, color: 'text.disabled' }}
          />
          <Typography variant="body2">{phone}</Typography>
        </RowStyle>
        <RowStyle>
          <Iconify
            icon="eva:email-fill"
            sx={{ mr: 1, width: 16, height: 16, color: 'text.disabled' }}
          />
          <Typography variant="body2">{email}</Typography>
        </RowStyle>
      </DialogContent>
    </DialogAnimate>
  );
}
