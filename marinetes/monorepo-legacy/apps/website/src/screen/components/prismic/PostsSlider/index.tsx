import { mergeRefs, mergeClassNames } from '@hitechline/reactools';
import NextImage from 'next/image';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import SwiperCore, { SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useBlogPosts } from '@/engine/hooks/blog/useBlogPosts';
import { Link } from '@/screen/components/forward/Link';
import { Button } from '@/screen/components/ui/Button';
import NavigationLeft from '@means/assets/svg/navigation-left.svg';
import NavigationRight from '@means/assets/svg/navigation-right.svg';

import { PostOnLoad } from './PostOnLoad';
import styles from './styles.module.css';

const SWIPER_OPTIONS: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 40,
  watchOverflow: true,
  resizeObserver: true,
  pagination: {
    dynamicBullets: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
  },
};

export const PostsSlider = (): JSX.Element => {
  const swiperRef = useRef<SwiperCore>(null);

  const { loading, posts } = useBlogPosts(1);

  const [swiperDetails, updateSwiperDetails] = useState({
    canNext: false,
    canPrev: false,
  });

  const slides = useMemo(() => {
    if (loading || !posts.length) {
      return (
        <SwiperSlide>
          <PostOnLoad />
        </SwiperSlide>
      );
    }

    return posts.map(({ id, banner, title, description, uid }) => (
      <SwiperSlide key={id}>
        <div className="w-full h-full flex flex-col mx-auto max-w-lg sm:max-w-xl md:max-w-1xl lg:max-w-2xl">
          <NextImage
            src={banner}
            width="1280"
            height="720"
            alt="Banner"
            className="rounded-2xl"
            objectFit="cover"
          />

          <p className="text-2xl font-bold mt-6 text-center text-neutral-700">
            {title}
          </p>

          <div className="mt-auto">
            <p className="text-center mt-8 text-zinc-400">{description}</p>
          </div>

          <Button
            asProp={Link}
            href={`/blog/p/${uid}`}
            className="flex justify-center items-center mt-4 bg-favorite text-white"
          >
            LER MAIS
          </Button>
        </div>
      </SwiperSlide>
    ));
  }, [loading, posts]);

  const goNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const goPrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const updateSwiper = (): void => {
    if (!swiperRef.current) {
      return;
    }

    const { activeIndex, params, slides: swiperSlides } = swiperRef.current;
    const { length } = swiperSlides;
    const { slidesPerView } = params;

    const inIndex = activeIndex + (slidesPerView as number);

    updateSwiperDetails({
      canNext: inIndex < length,
      canPrev: activeIndex > 0,
    });
  };

  useEffect(() => {
    updateSwiper();
  }, [loading, posts]);

  useEffect(() => {
    const currentSwiperRef = swiperRef.current;

    currentSwiperRef?.on('slideChange', updateSwiper);

    return () => {
      currentSwiperRef?.off('slideChange', updateSwiper);
    };
  }, []);

  return (
    <div className="items-center flex gap-10">
      <button
        type="button"
        className={styles['navigation-button']}
        onClick={goPrev}
        disabled={!swiperDetails.canPrev}
      >
        <NavigationLeft className="w-14" />
      </button>

      <Swiper onSwiper={mergeRefs([swiperRef])} {...SWIPER_OPTIONS}>
        {slides}
      </Swiper>

      <button
        type="button"
        onClick={goNext}
        disabled={!swiperDetails.canNext}
        className={mergeClassNames(styles['navigation-button'], 'right')}
      >
        <NavigationRight className="w-14" />
      </button>
    </div>
  );
};
