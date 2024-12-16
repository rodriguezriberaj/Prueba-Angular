import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { Mapper } from "./mapper";
import { ProductDto } from "../dtos/product-dto";
import { DateUtils } from "../../../shared/utils/date";

@Injectable()
export class ProductMapper implements Mapper<Product, ProductDto> {
  dtoToModel(data: ProductDto): Product {
    return {
      description: data.description,
      releaseDate: new Date(data.date_release),
      revisionDate: new Date(data.date_revision),
      id: data.id,
      logo: data.logo,
      name: data.name,
    };
  }

  modelToDto(model: Partial<Product>): ProductDto
  modelToDto(model: Product): ProductDto {
    return {
      date_release: DateUtils.format(model.releaseDate),
      date_revision: DateUtils.format(model.revisionDate),
      description: model.description,
      id: model.id,
      logo: model.logo,
      name: model.name,
    };
  }
}
