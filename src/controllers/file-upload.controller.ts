import {inject} from '@loopback/core';
import {
  HttpErrors, post,
  Request,
  requestBody,
  response,
  Response,
  RestBindings
} from '@loopback/rest';
import {resolve} from 'dns';
import multer from 'multer';
import path from 'path';
import {GeneralData} from '../config/general_date';

export class FileUploadController {

  constructor() { }

  //@authenticate('admin')
  @post('/upload-file', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'File to upload',
      },
    },
  })

  async fileUploading(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const filePath = path.join(__dirname, GeneralData.filesFolder);
    let res = await this.StoreFileToPath(
      filePath,
      GeneralData.filenameFieldCondominiums,
      request,
      response,
      GeneralData.imageExtensions,
    );
    if (res) {
      const filename = response.req?.file?.filename;
      if (filename) {
        return {file: filename};
      }
    }
    return res;
  }

  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path);
      },
      filename: function (req, file, cb) {
        filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    });
    return storage;
  }

  private StoreFileToPath(
    storePath: string,
    fieldname: string,
    request, Request,
    response: Response,
    acceptedExt: string[],
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);

      const upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
          var ext = path.extname(file.originalname).toUpperCase
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(
            new HttpErrors[400]('Format file not supported');
          );
    },
      limits: {},
      }).single(fieldname);
  upload(request, response, (err: any) => {
    if (err) {
      reject(err);
    }
    resolve(response);
  });
    });
  }

}

