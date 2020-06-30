import { DEFAULT_FILE_FIELD_NAME } from '@/conts';
import { concatQueryParams } from '@/utils';

const API_PATH = '/products';

export type Raw = {
  fields: any,
  file: File,
}

export default class ProductService {
  constructor(private authHttpService: any) {
  }

  create(raw: Raw) {
    return this.authHttpService.post(API_PATH, prepareFormData(raw.fields, raw.file));
  }

  getById(id: string) {
    return this.authHttpService.get(API_PATH + '/' + id);
  }

  getList(query: any) {
    return this.authHttpService.get(API_PATH + '?' + concatQueryParams(query));
  }

  remove(id: string) {
    return this.authHttpService.delete(API_PATH + '/' + id);
  }

  update(id: string, raw: Raw) {
    return this.authHttpService.put(API_PATH + '/' + id, prepareFormData(raw.fields, raw.file));
  }
}

export function prepareFormData(fields: any, file?: File) {
  const fd = new FormData();

  if (file && file instanceof Blob) {
    fd.append(DEFAULT_FILE_FIELD_NAME, file, file.name);
  }

  Object.keys(fields).forEach((field) => fd.append(field, fields[field]));

  return fd;
}
