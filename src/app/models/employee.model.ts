export class Employee {
  public id: number;
  public lastName: string;
  public firstName: string;
  public middleName: string;
  public photo: ArrayBuffer;
  public apointName: string;
  public timeStamp: string;
}

export interface IEmployeeResponse {
  total: number;
  results: Employee[];
}
