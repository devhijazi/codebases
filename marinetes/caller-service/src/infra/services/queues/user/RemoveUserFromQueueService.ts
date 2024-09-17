import { Service } from '@/core/infra/Service';
import { userQueue } from '@/infra/queue/queues/UserQueue';
import { hasConnectionByEntityId } from '@/infra/websocket/utils/connection';
import { Events } from '@/infra/websocket/utils/constants';
import { emitToEntity } from '@/infra/websocket/utils/event';

import { GetDiaristJobByDiaristIdService } from '../diarist/GetDiaristJobByDiaristIdService';
import { GetUserJobByUserIdService } from './GetUserJobByUserIdService';

export interface RemoveUserFromQueueServiceRequest {
  userId: string;
}

export class RemoveUserFromQueueService implements Service {
  async execute(request: RemoveUserFromQueueServiceRequest): Promise<void> {
    const { userId } = request;

    const getUserJobByUserId = new GetUserJobByUserIdService();

    const { userJob, userJobData } = await getUserJobByUserId.execute({
      userId,
    });

    if (userJobData.accpetedMatching && userJobData.relatedDiaristId) {
      const getDiaristJobByDiaristId = new GetDiaristJobByDiaristIdService();

      try {
        const { diaristJob, diaristJobData } =
          await getDiaristJobByDiaristId.execute({
            diaristId: userJobData.relatedDiaristId,
          });

        await diaristJob.updateData({
          ...diaristJobData,
          accpetedMatching: false,
          relatedUserId: null,
        });

        const hasDiaristConnected = hasConnectionByEntityId(
          diaristJobData.diaristId,
        );

        if (hasDiaristConnected) {
          emitToEntity(diaristJobData.diaristId, Events.solicitationCanceled);
        }
      } catch {
        //
      }
    }

    await userQueue.remove(userJob.id as string);
  }
}
