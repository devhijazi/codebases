import { ShimmerBox } from '@/screen/styles/ShimmerBox';

export const PostOnLoad = (): JSX.Element => (
  <div className="w-full p-4">
    <div className="mx-auto max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
      <ShimmerBox className="w-full h-56 rounded-3xl" />
      <ShimmerBox className="mt-4 h-16 w-full rounded-md" />

      <span className="mx-auto block my-6 h-px bg-green-300 w-2/5" />

      <ShimmerBox className="h-8 mx-auto w-4/5 rounded-md" />
      <ShimmerBox
        className="mt-8 mx-auto w-56 rounded-full"
        style={{
          height: 'var(--wai-min-height)',
        }}
      />
    </div>
  </div>
);
