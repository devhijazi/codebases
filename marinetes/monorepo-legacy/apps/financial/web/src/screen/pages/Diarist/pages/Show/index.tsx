import type {
  DiaristDocument,
  DiaristUpdateData,
  DiaristAddressUpdateData,
} from '@marinetes/types/dtos/financial/api';
import { useState, useCallback, useEffect, ChangeEvent, useMemo } from 'react';
import { AiOutlineUser, AiOutlineFile } from 'react-icons/ai';
// import { FaConciergeBell } from 'react-icons/fa';
import { FiCreditCard } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { api } from '@modules/services/api';
import { apply } from '@resources/cases/apply';
import { Logged } from '@resources/cases/Logged';
import { StandardLoader } from '@screen/components/ui/StandardLoader';
import { TabNavigator } from '@screen/components/ui/TabNavigator';
import { DefaultLayout } from '@screen/layouts/DefaultLayout';

import { PageContext } from './PageContext';
import { Actions } from './sections/Actions';
import { Address } from './sections/Address';
import { BankData } from './sections/BankData';
import { Documents } from './sections/Documents';
import { PersonalData } from './sections/PersonalData';
// import { Services } from './sections/Services';
import { Container, Content } from './styles';

export const DiaristShow = apply(
  (): JSX.Element => {
    const { push } = useHistory();
    const { id } = useParams<{ id: string }>();

    const [loading, updateLoading] = useState(true);
    const [retrieving, updateRetrieving] = useState(false);

    const [diarist, updateDiarist] = useState<DiaristDocument | null>(null);

    const loadDiarist = useCallback(async () => {
      try {
        const { data } = await api.get<DiaristDocument>(`/diarists/${id}`);

        updateDiarist(data);
        updateLoading(false);
      } catch {
        push('/diarists');
      }
    }, [id, push]);

    const retrieveDiarist = useCallback(async () => {
      try {
        updateRetrieving(true);

        const { data } = await api.get<DiaristDocument>(`/diarists/${id}`);

        updateDiarist(data);
        updateRetrieving(false);
      } catch {
        // nothing
      }
    }, [id]);

    const handlePersonalDataEdit = useCallback(
      async (data: DiaristUpdateData) => {
        try {
          await api.put(`/diarists/${id}`, data);

          await retrieveDiarist();

          toast.success('Dados pessoais atualizados com sucesso.');
        } catch {
          toast.error('Ocorreu um erro!');
        }
      },
      [id, retrieveDiarist],
    );

    const handleAddressEdit = useCallback(
      async (data: DiaristAddressUpdateData) => {
        try {
          await api.put(`/diarists/${id}/address`, data);

          await retrieveDiarist();

          toast.success('Endereço atualizado com sucesso.');
        } catch {
          toast.error('Ocorreu um erro!');
        }
      },
      [id, retrieveDiarist],
    );

    const handleAvatarEdit = useCallback(
      async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files) {
          return;
        }

        const avatar = target.files.item(0);

        if (!avatar) {
          return;
        }

        const data = new FormData();

        data.append('file', avatar);

        try {
          await api.patch(`/diarists/${id}/avatar`, data);

          await retrieveDiarist();

          toast.success('Avatar atualizado com sucesso.');
        } catch {
          toast.error('Ocorreu um erro!');
        }
      },
      [id, retrieveDiarist],
    );

    const tabs = useMemo(
      () => [
        {
          name: 'Ações',
          icon: HiOutlineLocationMarker,
          component: Actions,
        },
        {
          name: 'Dados Pessoais',
          icon: AiOutlineUser,
          component: PersonalData,
        },
        {
          name: 'Endereço',
          icon: HiOutlineLocationMarker,
          component: Address,
        },
        {
          name: 'Documentos',
          icon: AiOutlineFile,
          component: Documents,
        },
        {
          name: 'Dados Bancários',
          icon: FiCreditCard,
          component: BankData,
        },
        // {
        //   name: 'Serviços',
        //   icon: FaConciergeBell,
        //   component: Services,
        // },
      ],
      [],
    );

    useEffect(() => {
      loadDiarist();
    }, [loadDiarist]);

    if (loading || !diarist) {
      return <StandardLoader />;
    }

    return (
      <PageContext.Provider
        value={{
          retrieving,
          diarist,
          retrieveDiarist,
          handlePersonalDataEdit,
          handleAddressEdit,
          handleAvatarEdit,
        }}
      >
        <Container className="bowl-content padding-y">
          <Content>
            <TabNavigator tabs={tabs} />
          </Content>
        </Container>
      </PageContext.Provider>
    );
  },
  {
    layout: DefaultLayout,
    cases: [Logged],
  },
);
