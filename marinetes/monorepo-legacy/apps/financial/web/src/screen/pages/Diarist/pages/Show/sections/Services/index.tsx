import { mergeClassNames } from '@hitechline/reactools';
import { useCallback, useMemo, useState } from 'react';

import { ReactComponent as CleaningIcon } from '@resources/assets/cleaning.svg';
import { ReactComponent as FoodIcon } from '@resources/assets/food.svg';
import { ReactComponent as IronBoardIcon } from '@resources/assets/iron-board.svg';
import { ReactComponent as WashingMachineIcon } from '@resources/assets/washing-machine.svg';

import { Container, Icon } from './styles';

interface AcceptedServicesOption {
  id: string;
  selected: boolean;
}

const services = [
  {
    id: 'faxina',
    label: 'Faxina',
    icon: CleaningIcon,
  },
  {
    id: 'Cozinhar',
    label: 'Cozinhar',
    icon: FoodIcon,
  },
  {
    id: 'lavar-roupa',
    label: 'Lavar roupa',
    icon: WashingMachineIcon,
  },
  {
    id: 'passar-roupa',
    label: 'Passar roupa',
    icon: IronBoardIcon,
  },
];

export const Services = (): JSX.Element => {
  const [acceptedServices, updateAcceptedServices] = useState<
    AcceptedServicesOption[]
  >([]);

  const handleGetAcceptedService = useCallback(
    (serviceId: string) =>
      acceptedServices.find(
        acceptedService => acceptedService.id === serviceId,
      ),
    [acceptedServices],
  );

  const handleSelectService = useCallback(
    (serviceId: string) => {
      const acceptedService = handleGetAcceptedService(serviceId);

      if (!acceptedService) {
        const newServiceSelected = {
          id: serviceId,
          selected: true,
        };

        updateAcceptedServices(oldAcceptedServices => [
          ...oldAcceptedServices,
          newServiceSelected,
        ]);

        return;
      }

      updateAcceptedServices(oldAcceptedServices =>
        oldAcceptedServices.filter(
          service => service.id !== acceptedService.id,
        ),
      );
    },
    [handleGetAcceptedService],
  );

  const renderServicesProvidedElement = useMemo(
    () =>
      services.map(({ id, label, icon: SvgIcon }) => (
        <Icon
          key={id}
          className={mergeClassNames({
            selected: !!handleGetAcceptedService(id)?.selected,
          })}
          onClick={() => handleSelectService(id)}
        >
          <SvgIcon />

          <span>{label}</span>
        </Icon>
      )),
    [handleGetAcceptedService, handleSelectService],
  );

  return <Container>{renderServicesProvidedElement}</Container>;
};
