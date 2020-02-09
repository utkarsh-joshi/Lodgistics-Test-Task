import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataProviderService } from '../core-data/user-data-provider.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ProgressBarService } from '../core-data/progress-bar.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.page.html',
  styleUrls: ['./employee-details.page.scss'],
})

export class EmployeeDetailsPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userDataProviderCtrl: UserDataProviderService, private camera: Camera, private progresBarService: ProgressBarService) { }
  empid = null;
  employee_name: string = "";
  employee_age: number = 0;
  employee_salary: number = 0;
  profile_image: string = "";


  ngOnInit() {
    this.empid = this.activatedRoute.snapshot.paramMap.get('empid');
    this.getEmployeeDetailsById(this.empid);
  }

  async getEmployeeDetailsById(empId) {

    let employee = await this.userDataProviderCtrl.employees.byIds[empId];
    this.employee_name = employee.employee_name;
    this.employee_age = employee.employee_age;
    this.employee_salary = employee.employee_salary;
    this.profile_image = employee.profile_image;
  }

  async updateEmployeeDetails() {
    this.progresBarService.show();
    let employee = await this.userDataProviderCtrl.employees.byIds[this.empid];
    employee.employee_age = this.employee_age;
    employee.employee_salary = this.employee_salary;
    employee.profile_image = this.profile_image;
    setTimeout(() => {
      this.progresBarService.hide()
      this.router.navigate(['/home'], { replaceUrl: true });
    }, 3000);

  }


  editProfilePic() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageUri) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = "data:image/jpeg;base64," + imageUri;

      this.profile_image = base64Image;
    }, (err) => {
      // Handle error
    });

  }

}
