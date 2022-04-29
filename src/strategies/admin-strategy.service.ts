import {AuthenticationStrategy} from '@loopback/authentication';
import {injectable, /* inject, */ BindingScope, Provider} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {GeneralData} from '../config/general_date';

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
    let url_token =''; //`${Keys.url_validar_token}?${Keys.arg_token}=${token}&${Keys.arg_rol_token}=${Keys.rol_administrador}`//
     /* let r = "";
      await fetch(url_token)
        .then(async (res: any) => {
          r = await res.text()
          console.log(r)
        })
      console.log("R: " + r)
      switch (r) {
        case "OK":
          let perfil: UserProfile = Object.assign({
            admin: "OK"
          });
          return perfil;
          break;
        case "KO":
          throw new HttpErrors[401]("El rol del token no es válido");
          break;
        case "":
          throw new HttpErrors[401]("El token no es válido");
          break;
      }*/
    } else {
      throw new HttpErrors[401]("La request no tiene un token");
    }
    return undefined
  }

}
