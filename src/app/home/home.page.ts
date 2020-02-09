import { Component } from '@angular/core';
import { UserDataProviderService } from '../core-data/user-data-provider.service';
import { ProgressBarService } from '../core-data/progress-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  employees: { ids: string[]; byIds: Employee; };

  personImageUrl = "../../assets/imgs/favicon.png";

  constructor(private userDataProviderCtrl: UserDataProviderService, private progresBarService: ProgressBarService) {

  }

  async ngOnInit() {
    try {
      this.progresBarService.show();
      this.employees = await this.userDataProviderCtrl.getEmployees();
      this.progresBarService.hide();
    } catch (error) {
      this.progresBarService.hide();
      console.log(error);
    }

  }


}
