import { AsaasClient } from '@marinetesio/asaas-sdk';

import { environment } from '@/config/environment';

export const asaas = new AsaasClient({
  apiKey: environment.asaasMarinetesApiKey,
  environment: environment.asaasMode,
});
