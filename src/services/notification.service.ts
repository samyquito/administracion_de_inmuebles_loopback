import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import fetch from 'node-fetch';
import {GeneralData} from '../config/general-data';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificationService {
  constructor(/* Add @inject to inject parameters */) { }
  async sendSmsMessage(message: string, destination: string): Promise<string> {
    let url_notificactions = GeneralData.URL_NOTIFICATIONS_SMS;

    let r = 'KO';

    var formBody = [];

    let encodedKey = encodeURIComponent('message');
    let encodedValue = encodeURIComponent(message);
    formBody.push(encodedKey + '=' + encodedValue);

    encodedKey = encodeURIComponent('destination');
    encodedValue = encodeURIComponent(destination);
    formBody.push(encodedKey + '=' + encodedValue);

    encodedKey = encodeURIComponent('hash_validator');
    encodedValue = encodeURIComponent(GeneralData.hash_validator_notifications);
    formBody.push(encodedKey + '=' + encodedValue);

    let form = formBody.join('&');

    await fetch(url_notificactions, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: form,
    }).then(async (res: any) => {
      r = await res.text();
      console.log(r);
    });
    return r;
  }
}
