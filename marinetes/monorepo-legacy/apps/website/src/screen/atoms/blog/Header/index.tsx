import { mergeClassNames } from '@hitechline/reactools';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useRouter } from 'next/router';
import { MagnifyingGlass } from 'phosphor-react';
import { useState, useRef, useEffect, useCallback, FormEvent } from 'react';

import styles from './styles.module.css';

interface Props {
  category?: string;
}

const sectionVariants: Variants = {
  reset: {
    rotate: 0,
  },
  start: {
    translateX: [1, -10, 0],
    transition: {
      repeat: Infinity,
      duration: 0.2,
    },
  },
};

export const Header = ({ category }: Props): JSX.Element => {
  const controls = useAnimation();
  const inputRef = useRef<HTMLInputElement>(null);

  const { push } = useRouter();

  const [inShake, updateInShake] = useState(false);

  const shaky = useCallback(() => {
    updateInShake(true);

    setTimeout(() => {
      updateInShake(false);
    }, 1000 * 0.8);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const search = inputRef.current?.value;

      if (!search) {
        shaky();
        return;
      }

      push(`/blog/s?query=${search}`);
    },
    [push, shaky],
  );

  useEffect(() => {
    if (!inShake) {
      return;
    }

    controls.start('start');

    // eslint-disable-next-line consistent-return
    return () => {
      controls.stop();
      controls.set('reset');
    };
  }, [controls, inShake]);

  return (
    <header>
      <h1 className="font-bold text-4xl ">
        Blog{' '}
        {category && (
          <>
            <span>-</span>
            <span>{category}</span>
          </>
        )}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6">
        <motion.section
          animate={controls}
          variants={sectionVariants}
          className="relative w-full max-w-xl"
        >
          <input
            ref={inputRef}
            className={mergeClassNames(styles.input, {
              shake: inShake,
            })}
            type="text"
            placeholder="Pesquise algum assunto..."
          />

          <button type="submit" className={styles['submit-button']}>
            <MagnifyingGlass size={16} weight="light" color="#7a7a7a" />
          </button>
        </motion.section>
      </form>
    </header>
  );
};
