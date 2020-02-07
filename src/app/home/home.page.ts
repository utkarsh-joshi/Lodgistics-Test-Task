import { Component } from '@angular/core';
import { UserDataProviderService } from '../core-data/user-data-provider.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  employees: { ids: string[]; byIds: Employee; };

  personImageUrl = "../../assets/imgs/favicon.png";

  constructor(private userDataProviderCtrl: UserDataProviderService) {

  }

  async ngOnInit() {

    this.employees = await this.userDataProviderCtrl.getEmployees();


  }




}
