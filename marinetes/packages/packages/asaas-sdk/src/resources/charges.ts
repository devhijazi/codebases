import type { AsaasClient } from '../Client';

export interface PaymentCreateWithCreditCardData {
  customer: string;
  billingType: 'CREDIT_CARD';
  value: number;
  dueDate: string;
  description?: string;
  externalReference?: string;
  installmentCount?: number;
  installmentValue?: number;
  discount?: {
    value: number;
    dueDateLimitDays: number;
    type: string;
  };
  interest?: {
    value: number;
  };
  fine?: {
    value: number;
  };
  postalService?: boolean;
  split?: {
    walletId: string;
    fixedValue?: number;
    percentualValue: number;
  }[];
  creditCard: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };
  creditCardHolderInfo: {
    name: string;
    email: string;
    cpfCnpj: string;
    postalCode: string;
    addressNumber: string;
    addressComplement?: string;
    phone: string;
    mobilePhone?: string;
  };
  creditCardToken?: string;
  authorizeOnly?: boolean;
  remoteIp?: string;
}

export interface PaymentCreateWithPixData {
  customer: string;
  billingType: 'PIX' | 'CREDIT_CARD' | 'BOLETO';
  value: number;
  dueDate: string;
  description?: string;
  externalReference?: string;
  installmentCount?: number;
  installmentValue?: number;
  discount?: {
    value: number;
    dueDateLimitDays: number;
    type: string;
  };
  interest?: {
    value: number;
  };
  fine?: {
    value: number;
  };
  postalService?: boolean;
  split?: {
    walletId: string;
    fixedValue?: number;
    percentualValue: number;
  }[];
}

export interface PaymentCreateResponseData {
  object: string;
  id: string;
  dateCreated: string;
  customer: string;
  value: number;
  netValue: number;
  description: string;
  billingType: 'BOLETO' | 'CREDIT_CARD' | 'PIX';
  dueDate: string;
  status:
    | 'PENDING'
    | 'RECEIVED'
    | 'CONFIRMED'
    | 'OVERDUE'
    | 'REFUNDED'
    | 'RECEIVED_IN_CASH'
    | 'REFUND_REQUESTED'
    | 'REFUND_IN_PROGRESS'
    | 'CHARGEBACK_REQUESTED'
    | 'CHARGEBACK_DISPUTE'
    | 'AWAITING_CHARGEBACK_REVERSAL'
    | 'DUNNING_REQUESTED'
    | 'DUNNING_RECEIVED'
    | 'AWAITING_RISK_ANALYSIS';
  externalReference: string;
  originalValue: string;
  interestValue: string;
  originalDueDate: string;
  paymentDate: string;
  split: {
    id: string;
    walletID: string;
    fixedValue: number;
    percentualValue: number;
    totalValue: number;
    refusalReason: string;
    status:
      | 'PENDING'
      | 'RECEIVED'
      | 'CONFIRMED'
      | 'OVERDUE'
      | 'REFUNDED'
      | 'RECEIVED_IN_CASH'
      | 'REFUND_REQUESTED'
      | 'REFUND_IN_PROGRESS'
      | 'CHARGEBACK_REQUESTED'
      | 'CHARGEBACK_DISPUTE'
      | 'AWAITING_CHARGEBACK_REVERSAL'
      | 'DUNNING_REQUESTED'
      | 'DUNNING_RECEIVED'
      | 'AWAITING_RISK_ANALYSIS';
  }[];
  creditCard: {
    creditCardNumber: string;
    creditCardBrand: string;
    creditCardToken: string;
  };
}

export interface PaymentGetResponseData {
  object: string;
  id: string;
  dateCreated: string;
  customer: string;
  paymentLink: string;
  dueDate: string;
  value: number;
  netValue: number;
  billingType: string;
  canBePaidAfterDueDate: boolean;
  pixTransaction: string | null;
  status:
    | 'PENDING'
    | 'RECEIVED'
    | 'CONFIRMED'
    | 'OVERDUE'
    | 'REFUNDED'
    | 'RECEIVED_IN_CASH'
    | 'REFUND_REQUESTED'
    | 'REFUND_IN_PROGRESS'
    | 'CHARGEBACK_REQUESTED'
    | 'CHARGEBACK_DISPUTE'
    | 'AWAITING_CHARGEBACK_REVERSAL'
    | 'DUNNING_REQUESTED'
    | 'DUNNING_RECEIVED'
    | 'AWAITING_RISK_ANALYSIS';
  description: string;
  externalReference: string;
  originalValue: string | null;
  interestValue: string | null;
  originalDueDate: string;
  paymentDate: string | null;
  clientPaymentDate: string | null;
  installmentNumber: string | null;
  transactionReceiptUrl: null;
  nossoNumero: string;
  invoiceUrl: string;
  bankSlipUrl: string;
  invoiceNumber: string;
  discount: {
    value: number;
    dueDateLimitDays: number;
  };
  fine: {
    value: number;
  };
  interest: {
    value: number;
  };
  deleted: boolean;
  postalService: boolean;
  anticipated: boolean;
  anticipable: boolean;
  chargeback: {
    status: 'REQUESTED' | 'IN_DISPUTE' | 'DISPUTE_LOST' | 'REVERSED' | 'DONE';
    reason:
      | 'ABSENCE_OF_PRINT'
      | 'ABSENT_CARD_FRAUD'
      | 'CARD_ACTIVATED_PHONE_TRANSACTION'
      | 'CARD_FRAUD'
      | 'CARD_RECOVERY_BULLETIN'
      | 'COMMERCIAL_DISAGREEMENT'
      | 'COPY_NOT_RECEIVED'
      | 'CREDIT_OR_DEBIT_PRESENTATION_ERROR'
      | 'DIFFERENT_PAY_METHOD'
      | 'FRAUD'
      | 'INCORRECT_TRANSACTION_VALUE'
      | 'INVALID_CURRENCY'
      | 'INVALID_DATA'
      | 'LATE_PRESENTATION'
      | 'LOCAL_REGULATORY_OR_LEGAL_DISPUTE'
      | 'MULTIPLE_ROCS'
      | 'ORIGINAL_CREDIT_TRANSACTION_NOT_ACCEPTED'
      | 'OTHER_ABSENT_CARD_FRAUD'
      | 'PROCESS_ERROR'
      | 'RECEIVED_COPY_ILLEGIBLE_OR_INCOMPLETE'
      | 'RECURRENCE_CANCELED'
      | 'REQUIRED_AUTHORIZATION_NOT_GRANTED'
      | 'RIGHT_OF_FULL_RECOURSE_FOR_FRAUD'
      | 'SALE_CANCELED'
      | 'SERVICE_DISAGREEMENT_OR_DEFECTIVE_PRODUCT'
      | 'SERVICE_NOT_RECEIVED'
      | 'SPLIT_SALE'
      | 'TRANSFERS_OF_DIVERSE_RESPONSIBILITIES'
      | 'UNQUALIFIED_CAR_RENTAL_DEBIT'
      | 'USA_CARDHOLDER_DISPUTE'
      | 'VISA_FRAUD_MONITORING_PROGRAM'
      | 'WARNING_BULLETIN_FILE';
  };
  refunds: string | null;
}

export interface PaymentGetPixQRCodeResponseData {
  encodedImage: string;
  payload: string;
  expirationDate: string;
}

export interface PaymentDeleteResponse {
  id: string;
  deleted: true;
}

export class ChargeResource {
  constructor(private readonly client: AsaasClient) {}

  createWithCreditCard(
    body: PaymentCreateWithCreditCardData,
  ): Promise<PaymentCreateResponseData> {
    return this.client._request('/payments', {
      method: 'POST',
      body,
    });
  }

  createWithPix(
    body: PaymentCreateWithPixData,
  ): Promise<PaymentCreateResponseData> {
    return this.client._request('/payments', {
      method: 'POST',
      body,
    });
  }

  get(paymentId: string): Promise<PaymentGetResponseData> {
    return this.client._request(`/payments/${paymentId}`);
  }

  getPixQRCode(paymentId: string): Promise<PaymentGetPixQRCodeResponseData> {
    return this.client._request(`/payments/${paymentId}/pixQrCode`);
  }

  delete(paymentId: string): Promise<PaymentDeleteResponse> {
    return this.client._request(`/payments/${paymentId}`, {
      method: 'DELETE',
    });
  }
}
