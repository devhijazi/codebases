import { useOutClick } from '@hitechline/reactools';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { VscListSelection } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useAuth } from '@/resources/hooks/useAuth';
import { actions } from '@/store/modules/auth/actions';
import { Divider } from '@screen/components/ui/Divider';

import { Drawer, Handles as DrawerHandles } from './fragments/Drawer';
import {
  Container,
  Button,
  ProfileButton,
  ProfileHeader,
  Dropdown,
  DropdownWrapper,
} from './styles';

export function Header(): JSX.Element {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { employee } = useAuth();
  const dispatch = useDispatch();
  const drawerRef = useRef<DrawerHandles>(null);

  const openDrawer = useCallback(() => {
    drawerRef.current?.open();
  }, []);

  const {
    ref: outClick,
    addListener,
    removeListener,
  } = useOutClick<HTMLDivElement>();

  const openDropdown = useCallback(() => {
    setTimeout(() => {
      setDropdownVisible(true);
    }, 0);
  }, []);

  const closeDropdown = useCallback(() => {
    setDropdownVisible(false);
  }, []);

  useEffect(() => {
    addListener(closeDropdown);

    return () => {
      removeListener(closeDropdown);
    };
  }, [closeDropdown, addListener, removeListener]);

  return (
    <Container ref={outClick} className="padding-x">
      <Drawer ref={drawerRef} />

      <Button onClick={openDrawer}>
        <VscListSelection color="white" />
      </Button>

      <img src="/assets/logo.png" alt="Marinetes Logo" />

      <ProfileButton onClick={dropdownVisible ? closeDropdown : openDropdown}>
        <img src="/assets/icons/user_icon.svg" alt="User Logo" />
      </ProfileButton>

      {dropdownVisible && (
        <DropdownWrapper>
          <Dropdown>
            <ProfileHeader>
              <img
                src="https://cdn.dribbble.com/users/1338391/screenshots/15264109/media/1febee74f57d7d08520ddf66c1ff4c18.jpg?compress=1&resize=400x300"
                alt="User Photography"
              />

              <strong>{employee?.full_name}</strong>
            </ProfileHeader>

            <Link to="/">
              <AiOutlineUser />
              Meus dados
            </Link>

            <Divider />

            <Link to="/">
              <FiSettings />
              Configurações
            </Link>

            <Divider />

            <Link to="/" onClick={() => dispatch(actions.logOut({}))}>
              <FiLogOut />
              Sair
            </Link>
          </Dropdown>
        </DropdownWrapper>
      )}
    </Container>
  );
}
