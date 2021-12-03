import { CommonContent } from '@subsocial/api/flat-subsocial/dto';
import { HasId } from '@subsocial/api/flat-subsocial/flatteners';

export type Content = HasId & CommonContent;
