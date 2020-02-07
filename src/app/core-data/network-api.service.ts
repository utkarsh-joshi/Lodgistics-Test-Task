import { Injectable } from '@angular/core';
import axios from 'axios';
import { Network } from '@ionic-native/network/ngx';
@Injectable({
  providedIn: 'root'
})
export class NetworkApiService {
  isConnectedToNetwork = true;
  private URL : string = "http://dummy.restapiexample.com/api/v1/employees";
  constructor(private network: Network) {
        // watch network for a disconnection
        let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
          console.log('network was disconnected :-(');
          this.isConnectedToNetwork = false;
        });
        // stop disconnect watch
        // disconnectSubscription.unsubscribe();
        // watch network for a connection
        let connectSubscription = this.network.onConnect().subscribe(() => {
          console.log('network connected!');
          // We just got a connection but we need to wait briefly
          // before we determine the connection type. Might need to wait.
          // prior to doing any api requests as well.
          setTimeout(() => {
            if (this.network.type != 'UNKNOWN' && this.network.type != "NONE") {
              console.log('we got a wifi connection, woohoo!');
              this.isConnectedToNetwork = true;
            }
          }, 3000);
        });
   }
 
  async getData(): Promise<any> {
    if (!this.isConnectedToNetwork) {
      return Promise.reject("No internet connectivity")
    }
    return axios.get(this.URL);
  }
}
