import { AppStoreLogo, GooglePlayLogo } from 'phosphor-react';
import { useMemo, LinkHTMLAttributes, ComponentType, useCallback } from 'react';

import { Button } from '@/screen/components/ui/Button';

export type StoreButtonType = 'ios' | 'android';

export type StoreButtonVariant = 'green';

export interface StoreButtonProps extends LinkHTMLAttributes<HTMLLinkElement> {
  type: StoreButtonType;
  variant?: StoreButtonVariant;
}

type ButtonConfig = {
  title: string;
  icon: ComponentType<{ className?: string }>;
};

const configs: {
  [Key in StoreButtonType]: ButtonConfig;
} = {
  ios: {
    title: 'App Store',
    icon: AppStoreLogo,
  },
  android: {
    title: 'Play Store',
    icon: GooglePlayLogo,
  },
};

const defaultVariantClasses = 'bg-white bg-opacity-20';

const variantsClasses: {
  [Key in StoreButtonVariant]: string;
} = {
  green: 'bg-favorite',
};

export const StoreButton = ({
  type,
  variant,
  ...rest
}: StoreButtonProps): JSX.Element => {
  const config = useMemo((): ButtonConfig => {
    const cfg = configs[type];

    if (!cfg) {
      throw new Error('Tipo não inserido ou incorreto.');
    }

    return cfg;
  }, [type]);

  const variantClasses = useMemo(
    (): string => variantsClasses[variant as any] || defaultVariantClasses,
    [variant],
  );

  const handleClick = useCallback(() => {
    //
  }, []);

  return (
    <Button
      {...rest}
      onClick={handleClick}
      className={`flex text-white items-center rounded-full ${variantClasses}`}
    >
      <div className="mr-4">
        <config.icon className="w-7 h-auto" />
      </div>

      <span>{config.title}</span>
    </Button>
  );
};
