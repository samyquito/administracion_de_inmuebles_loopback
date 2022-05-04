import {AuthenticationStrategy} from '@loopback/authentication';
import {injectable, /* inject, */ BindingScope, Provider} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {GeneralData} from '../config/general_date';
import fetch from 'node-fetch';

/*
 * Fix the service type. Possible options can be:
 * - import {AdminStrategy} from 'your-module';
 * - export type AdminStrategy = string;
 * - export interface AdminStrategy {}
 */

@injectable({scope: BindingScope.TRANSIENT})
export class AdminStrategy implements AuthenticationStrategy {
  name: string = 'admin';
  constructor(/* Add @inject to inject parameters */) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let rol_admin = GeneralData.administratorRole;
      let url_token=GeneralData.url_validator_token;
     let r = "";
     let b=`{
      "token": ${token},
      "roleId": ${rol_admin},
    }`;
      await fetch(url_token,
        {
          method: 'POST',
          body:b,
        }
      ).then(async (res: any) => {
          r = await res.text()
          console.log(r)
        })
      console.log("R: " + r)
      if(r){
          let perfil: UserProfile = Object.assign({
            admin: "OK"
          });
          return perfil;
        }else{
          throw new HttpErrors[401]("El rol del token no es válido");
        }
    } else {
      throw new HttpErrors[401]("La request no tiene un token");
    }
    return undefined
  }
}
