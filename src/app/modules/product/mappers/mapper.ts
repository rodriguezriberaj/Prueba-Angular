export interface Mapper<Model, Dto> {
    dtoToModel(datos: Dto): Model;
    modelToDto(modelo: Model | Partial<Model>): Dto;
  }
  