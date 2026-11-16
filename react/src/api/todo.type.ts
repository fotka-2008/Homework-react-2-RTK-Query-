export interface IResponse {
  data: IData[] | boolean
  errors: string[]
  statusCode: number
}

export interface IData {
  id: number | string
  isCompleted: boolean
  images: IImage[]
  name: string
  description: string
}

export interface IEditTodo {
  id: number
  name: string
  description: string
}

export interface IImage {
  id: number
  imageName: string
}
