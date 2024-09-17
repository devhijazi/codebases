import { BadRequestError } from '@marinetesio/errors';

import { Service } from '@/core/infra/Service';
import { diaristQueue } from '@/infra/queue/queues/DiaristQueue';

import { GetDiaristJobByDiaristIdService } from '../queues/diarist/GetDiaristJobByDiaristIdService';
import { CreateUserMatchingService } from '../queues/user/CreateUserMatchingService';
import { GetUserJobByUserIdService } from '../queues/user/GetUserJobByUserIdService';

export interface SolicitationDeniedServiceRequest {
  diaristId: string;
}

export class SolicitationDeniedService implements Service {
  async execute(request: SolicitationDeniedServiceRequest): Promise<void> {
    const { diaristId } = request;

    const getDiaristJobByDiaristId = new GetDiaristJobByDiaristIdService();

    const { diaristJob, diaristJobData } =
      await getDiaristJobByDiaristId.execute({
        diaristId,
      });

    if (!diaristJobData.accpetedMatching || !diaristJobData.relatedUserId) {
      throw new BadRequestError();
    }

    const getUserJobByUserId = new GetUserJobByUserIdService();

    const { userJob, userJobData } = await getUserJobByUserId.execute({
      userId: diaristJobData.relatedUserId,
    });

    await userJob.updateData({
      ...userJobData,
      accpetedMatching: false,
      relatedDiaristId: null,
    });

    await diaristQueue.remove(diaristJob.id as string);

    try {
      const createUserMatching = new CreateUserMatchingService();

      await createUserMatching.execute({ userJob, userJobData });
    } catch {
      //
    }
  }
}
