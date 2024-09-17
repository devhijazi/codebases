export const MONGODB_OBJECT_ID_REGEX = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const validChannel = {
  id: MONGODB_OBJECT_ID_REGEX,
  userId: UUID_REGEX,
  diaristId: UUID_REGEX,
  status: /(NONE|OPEN|CLOSED)/,
  createdAt: /w/,
  updatedAt: /w/,
};

export const validMessage = {
  id: MONGODB_OBJECT_ID_REGEX,
  content: /w/,
  authorId: UUID_REGEX,
  channelId: UUID_REGEX,
  status: /(NONE|NOT_READ|READ)/,
  createdAt: /w/,
  updatedAt: /w/,
};
