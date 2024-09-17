import { Blog } from '@/screen/atoms/home/Blog';
import { Main } from '@/screen/atoms/home/Main';
import { Security } from '@/screen/atoms/home/Security';
import { Stores } from '@/screen/atoms/home/Stores';
import { SEO } from '@/screen/components/forward/SEO';

const Home = (): JSX.Element => (
  <>
    <SEO />

    <div>
      <Main />
      <Stores />
      <Security />
      <Blog />
    </div>
  </>
);

export default Home;
