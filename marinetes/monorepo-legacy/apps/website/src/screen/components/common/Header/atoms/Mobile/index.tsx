/* eslint-disable import/order */
import { mergeClassNames } from '@hitechline/reactools';
// import Logo from '@means/assets/png/logo.png';
import Hamburger from '@/means/assets/svg/hamburger.svg';

import { useState, useCallback, useMemo } from 'react';
import { RegisterButton } from '@/screen/components/ui/RegisterButton';
import { links } from '@means/data/header';
import { Link } from '@screen/components/forward/Link';
import { BlockScroll } from '@/screen/styles/BlockScroll';

import styles from './styles.module.css';

export const Mobile = (): JSX.Element => {
  const [dropdownVisible, updateDropdownVisible] = useState(false);

  const closeDropdown = useCallback(() => {
    updateDropdownVisible(false);
  }, []);

  const handleDropdown = useCallback(() => {
    updateDropdownVisible(oldValue => !oldValue);
  }, []);

  const dropdown = useMemo(
    () => (
      <div className={styles.dropdown}>
        <div className="overflow-y-auto pretty-scrollbar bowl-content py-18 flex flex-col h-full items-center ">
          <nav className="flex font-bold flex-col align-center uppercase space-y-14 text-center text-2xl">
            {links.map(({ href, title }) => (
              <Link key={href} href={href} onClick={closeDropdown}>
                {title}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <RegisterButton onClick={closeDropdown} />
          </div>
        </div>
      </div>
    ),
    [closeDropdown],
  );

  return (
    <div
      className={mergeClassNames(styles.wrapper, {
        'dropdown-visible': dropdownVisible,
      })}
    >
      <div className="bowl-content flex justify-between h-full items-center">
        <Link className="flex" href="/">
          <img
            src="/images/small_logo.png"
            alt="Marinetes Clean House"
            className="w-10"
          />
        </Link>

        <button type="button" onClick={handleDropdown}>
          <Hamburger className="w-8 h-auto -rotate-180" />
        </button>
      </div>

      {dropdownVisible && (
        <>
          {dropdown}
          <BlockScroll />
        </>
      )}
    </div>
  );
};
