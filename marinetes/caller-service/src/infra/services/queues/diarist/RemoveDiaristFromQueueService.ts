import { Service } from '@/core/infra/Service';
import { diaristQueue } from '@/infra/queue/queues/DiaristQueue';
import { hasConnectionByEntityId } from '@/infra/websocket/utils/connection';
import { Events } from '@/infra/websocket/utils/constants';
import { emitToEntity } from '@/infra/websocket/utils/event';

import { GetUserJobByUserIdService } from '../user/GetUserJobByUserIdService';
import { GetDiaristJobByDiaristIdService } from './GetDiaristJobByDiaristIdService';

export interface RemoveDiaristFromQueueServiceRequest {
  diaristId: string;
}

export class RemoveDiaristFromQueueService implements Service {
  async execute(request: RemoveDiaristFromQueueServiceRequest): Promise<void> {
    const { diaristId } = request;

    const getDiaristJobByDiaristId = new GetDiaristJobByDiaristIdService();

    const { diaristJob, diaristJobData } =
      await getDiaristJobByDiaristId.execute({
        diaristId,
      });

    if (diaristJobData.accpetedMatching && diaristJobData.relatedUserId) {
      const getUserJobByUserId = new GetUserJobByUserIdService();

      try {
        const { userJob, userJobData } = await getUserJobByUserId.execute({
          userId: diaristJobData.relatedUserId,
        });

        await userJob.updateData({
          ...userJobData,
          accpetedMatching: false,
          relatedDiaristId: null,
        });

        const hasUserConnected = hasConnectionByEntityId(userJobData.userId);

        if (hasUserConnected) {
          emitToEntity(userJobData.userId, Events.solicitationCanceled);
        }
      } catch {
        //
      }
    }

    await diaristQueue.remove(diaristJob.id as string);
  }
}
