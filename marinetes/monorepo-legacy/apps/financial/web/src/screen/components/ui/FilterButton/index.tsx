import { useOutClick } from '@hitechline/reactools';
import { useCallback, useEffect, useState } from 'react';
import { HiOutlineAdjustments } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import { Container, Content, Dropdown, DropdownWrapper } from './styles';

export function FilterButton(): JSX.Element {
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
    <Container ref={outClick}>
      <Content onClick={dropdownVisible ? closeDropdown : openDropdown}>
        <HiOutlineAdjustments size={25} color="white" />
      </Content>

      {dropdownVisible && (
        <DropdownWrapper>
          <Dropdown>
            <Link to="/">Ativas</Link>
            <Link to="/">Pré-cadastradas</Link>
            <Link to="/">Data de registro</Link>
          </Dropdown>
        </DropdownWrapper>
      )}
    </Container>
  );
}
