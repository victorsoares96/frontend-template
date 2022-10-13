import { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Collapse, List } from '@mui/material';

import { getActive } from '..';
import { NavItemRoot, NavItemSub } from './NavItem';

interface NavListRootProps {
  isCollapse: boolean;
  list: any;
}

interface NavListSubProps {
  list: {
    children: any[];
    info: React.ReactNode;
    path: string;
    title: string;
  };
}

function NavListSub({ list }: NavListSubProps) {
  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <Fragment>
        <NavItemSub item={list} onOpen={() => setOpen(!open)} open={open} active={active} />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 3 }}>
            {(list.children || []).map((item) => (
              <NavItemSub key={item.title} item={item} active={getActive(item.path, pathname)} />
            ))}
          </List>
        </Collapse>
      </Fragment>
    );
  }

  return <NavItemSub item={list} active={active} />;
}

export function NavListRoot({ list, isCollapse }: NavListRootProps) {
  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <Fragment>
        <NavItemRoot
          item={list}
          isCollapse={isCollapse}
          active={active}
          open={open}
          onOpen={() => setOpen(!open)}
        />

        {!isCollapse && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {(list.children || []).map((item: any) => (
                <NavListSub key={item.title} list={item} />
              ))}
            </List>
          </Collapse>
        )}
      </Fragment>
    );
  }

  return <NavItemRoot item={list} active={active} isCollapse={isCollapse} />;
}
