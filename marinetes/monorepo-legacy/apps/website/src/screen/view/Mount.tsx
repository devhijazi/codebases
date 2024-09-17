import { Footer } from '@/screen/components/common/Footer';
import { Header } from '@/screen/components/common/Header';

export const Mount = ({ children }: PropsWithChildren): JSX.Element => (
  <div id="mount">
    <div className="flex w-full min-h-screen flex-col justify-between">
      <Header />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  </div>
);
