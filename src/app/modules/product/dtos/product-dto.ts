import { BaseResponse } from "../../../shared/dtos/base-response";
import { ID } from "../models/base-model";

export type ProductDto = {
  id: ID;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
};

export interface ProductResponse extends BaseResponse<ReadonlyArray<ProductDto>> {}
export interface ProductSaveResponse extends BaseResponse<ProductDto> {}