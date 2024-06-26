export interface IApiResponse<T> {
  data: T;
  errorMessage?: string;
  success: boolean;
}

export interface IDataPagination<T> {
  content: T;
  pageable: IPageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: ISort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: ISort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
