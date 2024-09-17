import { parseISO, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useCallback, useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '@/modules/services/api';
import { LoadingButton } from '@/screen/components/ui/LoadingButton';

import { PageContext } from '../../PageContext';
import { Container, LastEmailSentTitle, AttendContainer } from './styles';

export const Actions = (): JSX.Element => {
  const { diarist, retrieveDiarist } = useContext(PageContext);

  const [isActivating, updateIsActivating] = useState(false);
  // const [isSendAttendEmail, updateIsSendAttendEmail] = useState(false);
  const [isSendCompleteRegisterEmail, updateIsSendCompleteRegisterEmail] =
    useState(false);

  const activate = useCallback(async () => {
    if (isActivating) {
      return;
    }

    updateIsActivating(true);

    try {
      await api.post(`diarists/${diarist.id}/approve`);

      await retrieveDiarist().catch(() => {
        //
      });

      toast.success('Diarista foi ativada com sucesso.');
    } catch (error) {
      toast.error('Ocorreu um erro ao ativar a diarista.');
    } finally {
      updateIsActivating(false);
    }
  }, [isActivating, diarist.id, retrieveDiarist]);

  // const sendAttendEmail = useCallback(async () => {
  //   if (isSendAttendEmail) {
  //     return;
  //   }

  //   updateIsSendAttendEmail(true);

  //   try {
  //     await api.post(`diarists/${diarist.id}/send-attend-email`);

  //     await retrieveDiarist().catch(() => {
  //       //
  //     });

  //     toast.success('Ir ao Escritório: E-mail enviado com sucesso.');
  //   } catch (error) {
  //     toast.error('Ir ao Escritório: Houve um erro ao enviar o e-mail.');
  //   } finally {
  //     updateIsSendAttendEmail(false);
  //   }
  // }, [isSendAttendEmail, diarist.id, retrieveDiarist]);

  const sendCompleteRegisterEmail = useCallback(async () => {
    if (isSendCompleteRegisterEmail) {
      return;
    }

    updateIsSendCompleteRegisterEmail(true);

    try {
      await api.post(`diarists/${diarist.id}/send-complete-register-email`);

      await retrieveDiarist().catch(() => {
        //
      });

      toast.success('Completar Registro: E-mail enviado com sucesso.');
    } catch (error) {
      toast.error('Completar Registro: Houve um erro ao enviar o e-mail.');
    } finally {
      updateIsSendCompleteRegisterEmail(false);
    }
  }, [isSendCompleteRegisterEmail, diarist.id, retrieveDiarist]);

  const lastAttendEmailSent = useMemo((): string | null => {
    const lastAttendEmailSentDate = diarist.status.last_attend_email_sent_date;

    if (!lastAttendEmailSentDate) {
      return null;
    }

    return formatDistance(parseISO(lastAttendEmailSentDate), new Date(), {
      addSuffix: true,
      locale: ptBR,
    });
  }, [diarist]);

  return (
    <Container>
      {!diarist.status.approved && (
        <LoadingButton type="button" loading={isActivating} onClick={activate}>
          ATIVAR
        </LoadingButton>
      )}

      {lastAttendEmailSent && (
        <LastEmailSentTitle>
          ÚLTIMO EMAIL ENVIADO -{' '}
          <strong>{lastAttendEmailSent.toUpperCase()}</strong>
        </LastEmailSentTitle>
      )}

      <AttendContainer>
        {diarist.status.type === 'pending' && (
          <LoadingButton
            type="button"
            loading={isSendCompleteRegisterEmail}
            onClick={sendCompleteRegisterEmail}
          >
            E-MAIL PARA COMPLETAR REGISTRO
          </LoadingButton>
        )}

        {/* <LoadingButton
          type="button"
          loading={isSendAttendEmail}
          onClick={sendAttendEmail}
        >
          E-MAIL PARA IR AO ESCRITÓRIO
        </LoadingButton> */}
      </AttendContainer>
    </Container>
  );
};
