// import router from 'next/router';

import { RegisterButton } from '@/screen/components/ui/RegisterButton';
import { links } from '@means/data/header';
import { Link } from '@screen/components/forward/Link';

import styles from './styles.module.css';

export const Desktop = (): JSX.Element => (
  <div className={styles.wrapper}>
    <div className="bowl-content flex items-center">
      <Link href="/" className="flex items-center justify-center">
        <img src="images/small_logo.png" alt="Marinetes" className="w-12" />
      </Link>

      <nav className="font-medium space-x-4 ml-6">
        {links.map(({ href, title }) => (
          <Link key={href} href={href} className="hover:underline">
            {title}
          </Link>
        ))}
      </nav>

      <div className="ml-auto">
        <RegisterButton />
      </div>
    </div>
  </div>
);
