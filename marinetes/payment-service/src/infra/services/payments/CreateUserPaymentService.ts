import { Customer } from '@marinetesio/asaas-sdk';
import {
  UserPaymentRepository,
  UserRepository,
} from '@marinetesio/database/typeorm/mysql';
import { BadRequestError, UserNotFoundError } from '@marinetesio/errors';
import {
  UserPayment,
  UserPaymentMethod,
  User,
} from '@marinetesio/types/model/model';
import { v4 as uuid } from 'uuid';

import { Service } from '@/core/infra/http/Service';
import { asaas } from '@/infra/asaas';
import { formatDateISO8601 } from '@/utils/formatDateISO8601';
import { convertDecimalToUnit, convertUnitToDecimal } from '@/utils/price';

export interface CreateUserPaymentServiceRequest {
  userId: string;
  method: UserPaymentMethod;
  value: number;
}

export type CreateUserPaymentServiceResponse = UserPayment;

export class CreateUserPaymentService implements Service {
  async #getAsaasCustomer(user: User): Promise<Customer> {
    const customerFounded = await asaas.resources.customers.list({
      cpfCnpj: user.document,
    });

    if (customerFounded.data.length > 0) {
      return customerFounded.data[0];
    }

    const customerCreated = await asaas.resources.customers.create({
      name: user.full_name,
      email: user.email,
      cpfCnpj: user.document,
      notificationDisabled: true,
      groupName: 'users',
      externalReference: user.id,
    });

    return customerCreated;
  }

  async execute(
    request: CreateUserPaymentServiceRequest,
  ): Promise<CreateUserPaymentServiceResponse> {
    const { userId, method, value } = request;

    const user = await UserRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    const asaasCustomer = await this.#getAsaasCustomer(user);

    const paymentId = uuid();

    switch (method) {
      case 'pix': {
        const valueInDecimal = convertUnitToDecimal(value);

        const asaasPixFee = 1.99;
        const asaasValue = valueInDecimal + asaasPixFee;

        const charge = await asaas.resources.charges.createWithPix({
          customer: asaasCustomer.id,
          billingType: 'PIX',
          dueDate: formatDateISO8601(new Date()),
          value: asaasValue,
          description: 'Depósito.',
          externalReference: paymentId,
        });

        const pixQrCode = await asaas.resources.charges.getPixQRCode(charge.id);

        const payment = UserPaymentRepository.create({
          id: paymentId,
          asaas_payment_id: charge.id,
          method,
          total_value: convertDecimalToUnit(charge.value),
          net_value: convertDecimalToUnit(charge.netValue),
          status: charge.status.toLowerCase(),
          pix_qr_code_base64: pixQrCode.encodedImage,
          pix_copy_and_paste: pixQrCode.payload,
          user: {
            id: user.id,
          },
        });

        await payment.save();

        return payment;
      }

      default: {
        throw new BadRequestError();
      }
    }
  }
}
