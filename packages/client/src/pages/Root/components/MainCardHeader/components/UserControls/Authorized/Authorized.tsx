import { Avatar, Button, IconButton, Typography } from '@mui/material';
import { FC, useMemo } from 'react';

import { AvatarAPI } from '../../../../../../../components/AvatarAPI/AvatarAPI';
import { useAuth } from '../../../../../../../hooks/useAuth';
import { usePageContext } from '../../../../../../../hooks/usePageContext';

const Authorized: FC = () => {
  const { userInfo } = usePageContext();
  const { logout } = useAuth();

  const { first_name, second_name, display_name, avatar } = userInfo ?? {};

  const avatarSrc = useMemo(
    () => (!AvatarAPI ? '/' : AvatarAPI + avatar),
    [AvatarAPI, avatar]
  );

  const nameString = useMemo(
    () => (!display_name ? `${first_name} ${second_name}` : display_name),
    [first_name, second_name, display_name]
  );

  return (
    <>
      <Typography component="div" sx={{ mr: 1 }} color="inherit">
        {nameString}
      </Typography>
      <Button variant="outlined" sx={{ color: 'white' }} onClick={logout}>
        Выйти
      </Button>
      <IconButton sx={{ p: 0 }}>
        <Avatar alt="Your profile picture" src={avatarSrc} />
      </IconButton>
    </>
  );
};

export default Authorized;
