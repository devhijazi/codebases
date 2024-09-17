import { useWizard } from '@hitechline/react-wizard';
import { useContext, useCallback, useMemo } from 'react';
import {
  RiArrowDropLeftLine,
  RiArrowDropRightLine,
  RiSaveLine,
} from 'react-icons/ri';

import { WizardContext } from '@/screen/components/forward/Wizard';
import { Spinner } from '@/screen/components/ui/Spinner';

import { Container, IconButton } from './styles';

export const WizardFooter = (): JSX.Element => {
  const { count, current, previous } = useWizard();

  const { emitter, loading } = useContext(WizardContext);

  const next = useCallback(() => {
    emitter.current?.emit('next');
  }, [emitter]);

  const rightIcon = useMemo(
    () =>
      current + 1 === count ? (
        <RiSaveLine className="save" />
      ) : (
        <RiArrowDropRightLine />
      ),
    [count, current],
  );

  return (
    <Container>
      <IconButton disabled={current === 0} onClick={previous}>
        <RiArrowDropLeftLine />
      </IconButton>

      <IconButton disabled={loading} onClick={next}>
        {loading ? <Spinner /> : rightIcon}
      </IconButton>
    </Container>
  );
};
