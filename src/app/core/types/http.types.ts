export interface ParamsPagination {
  page: number;
  pageSize: number;
  filter?: any;
}

export interface PaginationResponse<T> {
  sucess: boolean;
  code: number;
  body:
    | {
        pageSize: number;
        totalRecords: number;
        data: T;
      }
    | any;
  error?: string;
}

export interface HttpResponse<T> {
  success: boolean;
  body?: T;
  message: string;
  error?: {
    errorCode: number;
    errorMessage: string;
    data: any;
    errorMessageDetail: string;
  };
}
