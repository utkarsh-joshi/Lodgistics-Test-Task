import { Injectable } from '@angular/core';
import { NetworkApiService } from './network-api.service';



@Injectable({
  providedIn: 'root'
})
export class UserDataProviderService {

  employees: {
    ids: string[],
    byIds: Employee,
  }

  constructor(private networkApiCtrl: NetworkApiService) { }

  async getEmployees() {
    if (!this.employees || this.employees.ids.length == 0) {
      try {
        let employeesArray = await this.fetchEmployees();
        const { keys, byIds } = transformById(employeesArray, "id");
        this.employees = { ids: keys, byIds: byIds };
        console.log("trnsformed empolyess", this.employees);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.resolve(this.employees);
  }

  private async fetchEmployees() {
    try {
      let response = await this.networkApiCtrl.getData();
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        return Promise.resolve(response.data.data);
      } else {
        return Promise.reject("Error");
      }
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }

  }

}


function transformById(data: any[], key: string) {
  let keys: string[] = [];
  let byIds: any = {}
  data.forEach(element => {
    keys.push(element[key]);
    byIds[element[key]] = element;
  });
  return { keys, byIds }
}
