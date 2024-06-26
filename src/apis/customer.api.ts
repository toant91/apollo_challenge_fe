import httpRequest from "../configs/http.config";
import { IApiResponse, IDataPagination } from "../types/api.type";
import { ICustomer, ICustomerDto } from "../types/customer.type";
import { IPaginateQueryParams } from "../types/query.type";

export const getCustomers = (
  params: IPaginateQueryParams & { keys?: string[] }
) => {
  return httpRequest.get<IApiResponse<IDataPagination<ICustomer[]>>>(
    "/api/v1/customers",
    {
      params,
    }
  );
};

export const getCustomer = (id: number | string) => {
  return httpRequest.get<IApiResponse<ICustomer>>("/api/v1/customers/" + id);
};

export const createCustomer = (customer: ICustomerDto) => {
  const formData: any = {};
  formData.name = customer.name;
  formData.tags = [];
  if (customer.tags && customer.tags.length) {
    customer.tags.forEach((tag) => {
      if (typeof tag === "string") {
        formData.tags.push(tag);
      } else {
        formData.tags.push(tag.title);
      }
    });
  }
  return httpRequest.post<IApiResponse<ICustomer>>(
    "/api/v1/customers",
    formData
  );
};

export const updateCustomer = (id: number | string, customer: ICustomerDto) => {
  const formData: any = {};
  formData.name = customer.name;
  formData.tags = [];
  if (customer.tags && customer.tags.length) {
    customer.tags.forEach((tag) => {
      if (typeof tag === "string") {
        formData.tags.push(tag);
      } else {
        formData.tags.push(tag.title);
      }
    });
  }
  return httpRequest.put<IApiResponse<ICustomer>>(
    "/api/v1/customers/" + id,
    formData
  );
};

export const deleteCustomer = (id: number | string) => {
  return httpRequest.delete<IApiResponse<boolean>>("/api/v1/customers/" + id);
};
