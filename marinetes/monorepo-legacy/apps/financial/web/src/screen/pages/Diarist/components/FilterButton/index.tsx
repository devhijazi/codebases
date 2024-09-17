import { useOutClick } from '@hitechline/reactools';
import { useCallback, useEffect, useState } from 'react';
import { HiOutlineAdjustments } from 'react-icons/hi';

import { Checkbox } from '@/screen/components/ui/Checkbox';

import { Container, Content, Dropdown, DropdownWrapper } from './styles';

interface FilterButtonProps {
  activeRegister: boolean;
  preRegister: boolean;
  byDate: boolean;
  onFilterActiveRegister(): void;
  onFilterPreRegister(): void;
  onFilterByDate(): void;
}

export function FilterButton({
  activeRegister,
  preRegister,
  byDate,
  onFilterActiveRegister,
  onFilterPreRegister,
  onFilterByDate,
}: FilterButtonProps): JSX.Element {
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
            <Checkbox
              id="activeRegister"
              label="Ativas"
              checked={activeRegister}
              onChange={onFilterActiveRegister}
            />

            <Checkbox
              id="preRegister"
              label="Pré-cadastradas"
              checked={preRegister}
              onChange={onFilterPreRegister}
            />

            <Checkbox
              id="byDate"
              label="Data de registro"
              checked={byDate}
              onChange={onFilterByDate}
            />
          </Dropdown>
        </DropdownWrapper>
      )}
    </Container>
  );
}
