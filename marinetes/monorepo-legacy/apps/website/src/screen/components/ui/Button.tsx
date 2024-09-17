import { makePolymorphicComponent } from '@/screen/components/forward/makePolymorphicComponent';
import { BaseButton } from '@/screen/components/ui/BaseButton';

export const Button = makePolymorphicComponent(
  'button',
  ({ PolymorphicElement, children, ...props }) => (
    <BaseButton {...props} asProp={PolymorphicElement} type="button">
      {children}
    </BaseButton>
  ),
);
