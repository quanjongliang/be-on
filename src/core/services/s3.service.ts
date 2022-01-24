import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { ParamsAws } from 'src/entities';
import { AWS_CONSTANTS } from '..';

const s3 = new S3({
  accessKeyId: AWS_CONSTANTS.S3.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONSTANTS.S3.SECRET_ACCESS_KEY,
  region: AWS_CONSTANTS.S3.BUCKET_REGION,
});

const paramsAws = (key: string): ParamsAws => {
  return {
    Bucket: AWS_CONSTANTS.S3.BUCKET_NAME,
    Key: key,
  };
};

@Injectable()
export class S3Service {
  async uploadAWSFile(file: Express.Multer.File) {
    const fileStream = fs.createReadStream(file.path);
    const params = {
      Bucket: AWS_CONSTANTS.S3.BUCKET_NAME,
      Key: `${new Date().getTime()}.${randomUUID()}.${file.originalname}`,
      Body: fileStream,
      ACL: 'public-read',
    };
    const res = await s3.upload(params).promise();
    console.log(res);
    return res;
  }

  async getAWSFileUrl(key: string): Promise<string> {
    return s3.getSignedUrl('getObject', paramsAws(key));
  }

  async deleteAwsFile(key: string): Promise<any> {
    const a = s3.deleteObject(paramsAws(key));
    return a;
  }
}
