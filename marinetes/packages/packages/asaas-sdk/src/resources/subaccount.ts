import type { AsaasClient } from '../Client';

import FormData from 'form-data';

export type DocumentType =
  | 'IDENTIFICATION'
  | 'SOCIAL_CONTRACT'
  | 'ENTREPRENEUR_REQUIREMENT'
  | 'MINUTES_OF_ELECTION'
  | 'CUSTOM';

export type DocumentStatus = 'NOT_SENT' | 'PENDING' | 'APPROVED' | 'REJECTED';

export interface DocumentFile {
  buffer: Buffer;
  filename: string;
  contentType: string;
  size: number;
}

export interface Document {
  id: string;
  status: DocumentStatus;
  type: string;
  title: string;
  responsible: {
    name: string;
    type: string;
  };
  description: string;
}

//

export interface SendDocumentData {
  documentId: string;
  type: DocumentType;
  file: DocumentFile;
}

export interface SendDocumentResponse {
  id: string;
  status: DocumentStatus;
}

//

export interface UpdateDocumentData {
  documentId: string;
  file: DocumentFile;
}

export interface UpdateDocumentResponse {
  id: string;
  status: DocumentStatus;
}

//

export interface VerifyPendingDocumentsResponse {
  rejectReasons: string;
  data: Document[];
}

export class SubAccountResource {
  constructor(private readonly client: AsaasClient) {}

  sendDocuments(data: SendDocumentData): Promise<SendDocumentResponse> {
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('documentFile', data.file.buffer, {
      filename: data.file.filename,
      contentType: data.file.contentType,
      knownLength: data.file.size,
    });

    return this.client._request('myAccount/documents', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  verify(): Promise<VerifyPendingDocumentsResponse> {
    return this.client._request('myAccount/documents');
  }

  update(data: UpdateDocumentData): Promise<UpdateDocumentResponse> {
    const formData = new FormData();
    formData.append('documentFile', data.file.buffer, {
      filename: data.file.filename,
      contentType: data.file.contentType,
      knownLength: data.file.size,
    });

    return this.client._request(
      `myAccount/documents/files/${data.documentId}`,
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }
}
