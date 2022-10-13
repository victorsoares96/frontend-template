import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getActive } from '..';
import { NavItemRoot, NavItemSub } from './NavItem';
import { PaperStyle } from './style';

interface NavListRootProps {
  list: any;
}

interface NavListSubProps {
  list: any;
}

function NavListSub({ list }: NavListSubProps) {
  const menuRef = useRef(null);

  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <Fragment>
        <NavItemSub
          ref={menuRef}
          open={open}
          item={list}
          active={active}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />

        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          {(list.children || []).map((item) => (
            <NavListSub key={item.title} list={item} />
          ))}
        </PaperStyle>
      </Fragment>
    );
  }

  return <NavItemSub item={list} active={active} />;
}

export function NavListRoot({ list }: NavListRootProps) {
  const menuRef = useRef(null);

  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(false);

  const hasChildren = list.children;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (hasChildren) {
    return (
      <Fragment>
        <NavItemRoot
          open={open}
          item={list}
          active={active}
          ref={menuRef}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />

        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          {(list.children || []).map((item) => (
            <NavListSub key={item.title} list={item} />
          ))}
        </PaperStyle>
      </Fragment>
    );
  }

  return <NavItemRoot item={list} active={active} />;
}
