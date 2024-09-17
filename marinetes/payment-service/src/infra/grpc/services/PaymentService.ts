import { IPaymentService, PaymentService } from '@marinetesio/protos/protobuf';
import {
  DiaristPixDataKeyType,
  UserPixDataKeyType,
} from '@marinetesio/types/model';
import { adaptService } from '@protobuf-ts/grpc-backend';

import { getCustomError } from '@/core/infra/grpc/GrpcResponse';
import { CreateDiaristPixDataService } from '@/infra/services/diarists/CreateDiaristPixDataService';
import { DeleteDiaristPixDataService } from '@/infra/services/diarists/DeleteDiaristPixDataService';
import { GetAllDiaristPixDataService } from '@/infra/services/diarists/GetAllDiaristPixDataService';
import { GetDiaristPixDataService } from '@/infra/services/diarists/GetDiaristPixDataService';
import { UpdateDiaristPixDataService } from '@/infra/services/diarists/UpdateDiaristPixDataService';
import { CreateUserPaymentService } from '@/infra/services/payments/CreateUserPaymentService';
import { GetAllUserPaymentsService } from '@/infra/services/payments/GetAllUserPaymentsService';
import { GetUserPaymentService } from '@/infra/services/payments/GetUserPaymentService';
import { CreateDiaristTransferService } from '@/infra/services/transfers/CreateDiaristTransferService';
import { CreateUserTransferService } from '@/infra/services/transfers/CreateUserTransferService';
import { GetAllDiaristTransfersService } from '@/infra/services/transfers/GetAllDiaristTransfersService';
import { GetAllUserTransfersService } from '@/infra/services/transfers/GetAllUserTransfersService';
import { GetDiaristTransferService } from '@/infra/services/transfers/GetDiaristTransferService';
import { GetUserTransferService } from '@/infra/services/transfers/GetUserTransferService';
import { CreateUserPixDataService } from '@/infra/services/users/CreateUserPixDataService';
import { DeleteUserPixDataService } from '@/infra/services/users/DeleteUserPixDataService';
import { GetAllUserPixDataService } from '@/infra/services/users/GetAllUserPixDataService';
import { GetUserPixDataService } from '@/infra/services/users/GetUserPixDataService';
import { UpdateUserPixDataService } from '@/infra/services/users/UpdateUserPixDataService';
import { GetDiaristWalletService } from '@/infra/services/wallets/GetDiaristWalletService';
import { GetMarinetesWalletService } from '@/infra/services/wallets/GetMarinetesWalletService';
import { GetUserWalletService } from '@/infra/services/wallets/GetUserWalletService';

const implementation: IPaymentService = {
  /**
   * WALLET
   */

  getMarinetesWallet: async () => {
    const getMarinetesWallet = new GetMarinetesWalletService();

    try {
      const wallet = await getMarinetesWallet.execute();

      return {
        wallet: {
          ...wallet,
          created_at: new Date(wallet.created_at).toJSON(),
          updated_at: new Date(wallet.updated_at).toJSON(),
        },
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  getUserWallet: async request => {
    const { user_id } = request;

    const getUserWallet = new GetUserWalletService();

    try {
      const wallet = await getUserWallet.execute({
        userId: user_id,
      });

      return {
        wallet: {
          ...wallet,
          created_at: new Date(wallet.created_at).toJSON(),
          updated_at: new Date(wallet.updated_at).toJSON(),
        },
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  getDiaristWallet: async request => {
    const { diarist_id } = request;

    const getDiaristWallet = new GetDiaristWalletService();

    try {
      const wallet = await getDiaristWallet.execute({
        diaristId: diarist_id,
      });

      return {
        wallet: {
          ...wallet,
          created_at: new Date(wallet.created_at).toJSON(),
          updated_at: new Date(wallet.updated_at).toJSON(),
        },
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  /**
   * DIARIST BANK
   */

  // createDiaristBankData: async request => {
  //   const {
  //     diarist_id,
  //     account,
  //     account_name,
  //     account_digit,
  //     agency,
  //     owner_name,
  //     account_type,
  //     document,
  //     bank_code,
  //     ispb,
  //   } = request;

  //   const createDiaristBankData = new CreateDiaristBankDataService();

  //   const { bankDataId } = await createDiaristBankData.execute({
  //     diaristId: diarist_id,
  //     data: {
  //       account,
  //       accountName: account_name,
  //       accountDigit: account_digit,
  //       agency,
  //       document,
  //       ownerName: owner_name,
  //       bankCode: bank_code,
  //       ispb,
  //       bankAccountType: account_type as DiaristBankDataAccountType,
  //     },
  //   });

  //   return {
  //     bank_data_id: bankDataId,
  //   };
  // },

  // getAllDiaristBankData: async request => {
  //   const { diarist_id } = request;

  //   const getAllDiaristBankData = new GetAllDiaristBankDataService();

  //   const banks = await getAllDiaristBankData.execute({
  //     diaristId: diarist_id,
  //   });

  //   return {
  //     banks: banks.map(bank => ({
  //       ...bank,
  //       bank_code: bank.bank_code ?? undefined,
  //       ispb: bank.ispb ?? undefined,
  //       created_at: new Date(bank.created_at).toJSON(),
  //       updated_at: new Date(bank.updated_at).toJSON(),
  //     })),
  //   };
  // },

  // getDiaristBankData: async request => {
  //   const { bank_data_id } = request;

  //   const getDiaristBankData = new GetDiaristBankDataService();

  //   const bankData = await getDiaristBankData.execute({
  //     bankDataId: bank_data_id,
  //   });

  //   return {
  //     bank_data: {
  //       ...bankData,
  //       bank_code: bankData.bank_code ?? undefined,
  //       ispb: bankData.ispb ?? undefined,
  //       created_at: new Date(bankData.created_at).toJSON(),
  //       updated_at: new Date(bankData.updated_at).toJSON(),
  //     },
  //   };
  // },

  // updateDiaristBankData: async request => {
  //   const {
  //     bank_data_id,
  //     account,
  //     account_name,
  //     account_digit,
  //     agency,
  //     owner_name,
  //     account_type,
  //     document,
  //     bank_code,
  //     ispb,
  //   } = request;

  //   const updateDiaristBankData = new UpdateDiaristBankDataService();

  //   const bankData = await updateDiaristBankData.execute({
  //     bankDataId: bank_data_id,
  //     data: {
  //       account,
  //       accountName: account_name,
  //       accountDigit: account_digit,
  //       agency,
  //       ownerName: owner_name,
  //       bankAccountType: account_type as DiaristBankDataAccountType,
  //       document,
  //       bankCode: bank_code,
  //       ispb,
  //     },
  //   });

  //   return {
  //     bank_data: {
  //       ...bankData,
  //       bank_code: bankData.bank_code ?? undefined,
  //       ispb: bankData.ispb ?? undefined,
  //       created_at: new Date(bankData.created_at).toJSON(),
  //       updated_at: new Date(bankData.updated_at).toJSON(),
  //     },
  //   };
  // },

  // deleteDiaristBankData: async request => {
  //   const { bank_data_id } = request;

  //   const deleteDiaristBankData = new DeleteDiaristBankDataService();
  //   const { bankDataId } = await deleteDiaristBankData.execute({
  //     bankDataId: bank_data_id,
  //   });

  //   return {
  //     bank_data_id: bankDataId,
  //   };
  // },

  /**
   * DIARIST PIX
   */

  createDiaristPixData: async request => {
    const { diarist_id, key, key_type } = request;

    const createDiaristPixData = new CreateDiaristPixDataService();

    try {
      const pixData = await createDiaristPixData.execute({
        diaristId: diarist_id,
        data: {
          key,
          keyType: key_type as DiaristPixDataKeyType,
        },
      });

      return {
        pix_data_id: pixData.id,
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  getAllDiaristPixData: async request => {
    const { diarist_id } = request;

    const getAllDiaristPixData = new GetAllDiaristPixDataService();

    try {
      const pixes = await getAllDiaristPixData.execute({
        diaristId: diarist_id,
      });

      return {
        pixes: pixes.map(pix => ({
          ...pix,
          created_at: new Date(pix.created_at).toJSON(),
          updated_at: new Date(pix.updated_at).toJSON(),
        })),
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  getDiaristPixData: async request => {
    const { pix_data_id } = request;

    const getDiaristPixData = new GetDiaristPixDataService();

    try {
      const pixData = await getDiaristPixData.execute({
        pixDataId: pix_data_id,
      });

      return {
        pix_data: {
          ...pixData,
          created_at: new Date(pixData.created_at).toJSON(),
          updated_at: new Date(pixData.updated_at).toJSON(),
        },
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  updateDiaristPixData: async request => {
    const { key, key_type, pix_data_id } = request;

    const updateDiaristPixData = new UpdateDiaristPixDataService();

    try {
      const pixData = await updateDiaristPixData.execute({
        pixDataId: pix_data_id,
        data: {
          key,
          keyType: key_type as DiaristPixDataKeyType,
        },
      });

      return {
        pix_data: {
          ...pixData,
          created_at: new Date(pixData.created_at).toJSON(),
          updated_at: new Date(pixData.updated_at).toJSON(),
        },
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  deleteDiaristPixData: async request => {
    const { pix_data_id } = request;

    const deleteDiaristPixData = new DeleteDiaristPixDataService();

    try {
      const { pixDataId } = await deleteDiaristPixData.execute({
        pixDataId: pix_data_id,
      });

      return {
        pix_data_id: pixDataId,
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  /**
   * DIARIST TRANSFER
   */

  createDiaristTransfer: async request => {
    const { diarist_id, value, operation_type, pix_data_id, bank_data_id } =
      request;

    const createDiaristTransfer = new CreateDiaristTransferService();

    try {
      const transfer = await createDiaristTransfer.execute({
        diaristId: diarist_id,
        operationType: operation_type as any,
        value,
        bankDataId: bank_data_id,
        pixDataId: pix_data_id,
      });

      return {
        transfer: {
          ...transfer,
          trasnsfer_fee: transfer.trasnsfer_fee ?? undefined,
          diarist_id: transfer.diarist.id,
          bank_data_id: transfer.bank_data_id ?? undefined,
          pix_data_id: transfer.pix_data_id ?? undefined,
          created_at: new Date(transfer.created_at).toJSON(),
          updated_at: new Date(transfer.updated_at).toJSON(),
        },
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  getAllDiaristTransfers: async request => {
    const { diarist_id } = request;

    const getAllDiaristTransfers = new GetAllDiaristTransfersService();

    try {
      const transfers = await getAllDiaristTransfers.execute({
        diaristId: diarist_id,
      });

      return {
        transfers: transfers.map(transfer => ({
          ...transfer,
          trasnsfer_fee: transfer.trasnsfer_fee ?? undefined,
          diarist_id: transfer.diarist.id,
          bank_data_id: transfer.bank_data_id ?? undefined,
          pix_data_id: transfer.pix_data_id ?? undefined,
          created_at: new Date(transfer.created_at).toJSON(),
          updated_at: new Date(transfer.updated_at).toJSON(),
        })),
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  getDiaristTransfer: async request => {
    const { transfer_id } = request;

    const getDiaristTransfer = new GetDiaristTransferService();

    try {
      const transfer = await getDiaristTransfer.execute({
        transferId: transfer_id,
      });

      return {
        transfer: {
          ...transfer,
          trasnsfer_fee: transfer.trasnsfer_fee ?? undefined,
          diarist_id: transfer.diarist.id,
          bank_data_id: transfer.bank_data_id ?? undefined,
          pix_data_id: transfer.pix_data_id ?? undefined,
          created_at: new Date(transfer.created_at).toJSON(),
          updated_at: new Date(transfer.updated_at).toJSON(),
        },
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  /**
   * USER PIX
   */

  createUserPixData: async request => {
    const { user_id, key, key_type } = request;

    const createUserPixData = new CreateUserPixDataService();

    try {
      const { pixDataId } = await createUserPixData.execute({
        userId: user_id,
        data: {
          key,
          keyType: key_type as UserPixDataKeyType,
        },
      });

      return {
        pix_data_id: pixDataId,
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  getAllUserPixData: async request => {
    const { user_id } = request;

    const getAllUserPixData = new GetAllUserPixDataService();

    try {
      const pixes = await getAllUserPixData.execute({
        userId: user_id,
      });

      return {
        pixes: pixes.map(pix => ({
          ...pix,
          created_at: new Date(pix.created_at).toJSON(),
          updated_at: new Date(pix.updated_at).toJSON(),
        })),
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  getUserPixData: async request => {
    const { pix_data_id } = request;

    const getUserPixData = new GetUserPixDataService();

    try {
      const pixData = await getUserPixData.execute({
        pixDataId: pix_data_id,
      });

      return {
        pix_data: {
          ...pixData,
          created_at: new Date(pixData.created_at).toJSON(),
          updated_at: new Date(pixData.updated_at).toJSON(),
        },
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  updateUserPixData: async request => {
    const { key, key_type, pix_data_id } = request;

    const updateUserPixData = new UpdateUserPixDataService();

    try {
      const pixData = await updateUserPixData.execute({
        pixDataId: pix_data_id,
        data: {
          key,
          keyType: key_type as UserPixDataKeyType,
        },
      });

      return {
        pix_data: {
          ...pixData,
          created_at: new Date(pixData.created_at).toJSON(),
          updated_at: new Date(pixData.updated_at).toJSON(),
        },
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  deleteUserPixData: async request => {
    const { pix_data_id } = request;

    const deleteUserPixData = new DeleteUserPixDataService();

    try {
      const { pixDataId } = await deleteUserPixData.execute({
        pixDataId: pix_data_id,
      });

      return {
        pix_data_id: pixDataId,
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  /**
   * USER TRANSFER
   */

  createUserTransfer: async request => {
    const { user_id, value, operation_type, pix_data_id } = request;

    const createUserTransfer = new CreateUserTransferService();

    try {
      const transfer = await createUserTransfer.execute({
        userId: user_id,
        operationType: operation_type as any,
        value,
        pixDataId: pix_data_id,
      });

      return {
        transfer: {
          ...transfer,
          trasnsfer_fee: transfer.trasnsfer_fee ?? undefined,
          user_id: transfer.user.id,
          bank_data_id: transfer.bank_data_id ?? undefined,
          pix_data_id: transfer.pix_data_id ?? undefined,
          created_at: new Date(transfer.created_at).toJSON(),
          updated_at: new Date(transfer.updated_at).toJSON(),
        },
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  getAllUserTransfers: async request => {
    const { user_id } = request;

    const getAllUserTransfers = new GetAllUserTransfersService();

    try {
      const transfers = await getAllUserTransfers.execute({
        userId: user_id,
      });

      return {
        transfers: transfers.map(transfer => ({
          ...transfer,
          trasnsfer_fee: transfer.trasnsfer_fee ?? undefined,
          user_id: transfer.user.id,
          bank_data_id: transfer.bank_data_id ?? undefined,
          pix_data_id: transfer.pix_data_id ?? undefined,
          created_at: new Date(transfer.created_at).toJSON(),
          updated_at: new Date(transfer.updated_at).toJSON(),
        })),
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  getUserTransfer: async request => {
    const { transfer_id } = request;

    const getUserTransfer = new GetUserTransferService();

    try {
      const transfer = await getUserTransfer.execute({
        transferId: transfer_id,
      });

      return {
        transfer: {
          ...transfer,
          trasnsfer_fee: transfer.trasnsfer_fee ?? undefined,
          user_id: transfer.user.id,
          bank_data_id: transfer.bank_data_id ?? undefined,
          pix_data_id: transfer.pix_data_id ?? undefined,
          created_at: new Date(transfer.created_at).toJSON(),
          updated_at: new Date(transfer.updated_at).toJSON(),
        },
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  /**
   * USER PAYMENT
   */

  createUserPayment: async request => {
    const { user_id, value, method } = request;

    const createUserPayment = new CreateUserPaymentService();

    try {
      const payment = await createUserPayment.execute({
        userId: user_id,
        value,
        method: method as any,
      });

      return {
        payment: {
          ...payment,
          user_id: payment.user.id,
          created_at: new Date(payment.created_at).toJSON(),
          updated_at: new Date(payment.updated_at).toJSON(),
        },
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  getAllUserPayments: async request => {
    const { user_id } = request;

    const getAllUserPayments = new GetAllUserPaymentsService();

    try {
      const payments = await getAllUserPayments.execute({
        userId: user_id,
      });

      return {
        payments: payments.map(payment => ({
          ...payment,
          user_id: payment.user.id,
          created_at: new Date(payment.created_at).toJSON(),
          updated_at: new Date(payment.updated_at).toJSON(),
        })),
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },

  getUserPayment: async request => {
    const { payment_id } = request;

    const getUserPayment = new GetUserPaymentService();

    try {
      const payment = await getUserPayment.execute({
        paymentId: payment_id,
      });

      return {
        payment: {
          ...payment,
          user_id: payment.user.id,
          created_at: new Date(payment.created_at).toJSON(),
          updated_at: new Date(payment.updated_at).toJSON(),
        },
      };
    } catch (error) {
      throw getCustomError(error);
    }
  },
};

const [paymentService, paymentImplementation] = adaptService(
  PaymentService,
  implementation,
);

export { paymentImplementation, paymentService };
