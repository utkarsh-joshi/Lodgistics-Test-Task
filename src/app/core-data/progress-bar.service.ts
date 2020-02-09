import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  constructor(private loadingCtrl: LoadingController) { }
  show(message = "") {
    this.loadingCtrl.create({
      spinner: 'bubbles',
      message: message,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    }).then(loading => loading.present());
  }

  async hide() {
    let overLay = await this.loadingCtrl.getTop();
    if (!overLay) {
      setTimeout(() => {
        this.loadingCtrl.dismiss()
      }, 3000);
    } else {
      this.loadingCtrl.dismiss()
    }
  }
}
