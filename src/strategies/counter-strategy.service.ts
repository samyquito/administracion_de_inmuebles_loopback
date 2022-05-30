import {AuthenticationStrategy} from '@loopback/authentication';
import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {GeneralData} from '../config/general-data';

const fetch = require('node-fetch');

/*
 * Fix the service type. Possible options can be:
 * - import {AdminStrategy} from 'your-module';
 * - export type AdminStrategy = string;
 * - export interface AdminStrategy {}
 */

@injectable({scope: BindingScope.TRANSIENT})
export class CounterStrategy implements AuthenticationStrategy {
  name: string = 'counter';
  constructor(/* Add @inject to inject parameters */) { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let rol_admin = GeneralData.counterRole;
      let url_token = GeneralData.url_validator_token;
      let r = "";
      let body = {
        token:token,
        roleId: rol_admin
      };
      await fetch(url_token,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers:{'Content-Type':'application/json'},
        }
      ).then(async (res: any) => {
        r = await res.text()
        console.log(r)
      })
      console.log("R: " + r)
      switch (r) {
        case 'OK':
          let perfil: UserProfile = Object.assign({
            admin: 'OK',
          });
          return perfil;

        case 'KO':
          throw new HttpErrors[401]('El rol del token no es válido');
        case 'EX':
          throw new HttpErrors[402](
            'Hay un error verificando el token, posiblemente ha expirado',
          );

        default:
          throw new HttpErrors[404](
            'Ha ocurrido un fallo en la validación del token',
          );
          break;
      }
    } else {
      throw new HttpErrors[401]('La request no tiene un token');
    }
  }
}
