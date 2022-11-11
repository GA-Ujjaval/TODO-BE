import { v2 as cloudinary } from 'cloudinary';
import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

import * as dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.API_Key,
    api_secret: process.env.API_Secret,
    secure: true
});

@Injectable()
export class CloudinaryService {
    /** 1st img need to store in folder then give path of img */
    // async uploadImageToCloudinary(file) {
    //     await cloudinary.uploader
    //         .upload("My_logo.png", { folder: 'todo' })
    //         .then(result => console.log(result))
    //         .catch(e => console.log('error', e))
    // }

    async uploadImage(file: any) {//Express.Multer.File,): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream({ folder: 'todo' }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
            toStream(file.buffer).pipe(upload);
        });
    }
    async uploadImageToCloudinary(file: any) {
        return await this.uploadImage(file).then((res: any) => {
            console.log(res)
            return {
                url: res.secure_url,
                public_id: res.public_id
            };
        }).catch(() => {
            throw new BadRequestException('Invalid file type.');
        });
    }
    async removeImgCloudinary(id: any) {
        return new Promise((resolve, reject) => {
            v2.uploader.destroy(id, (error, result) => {
                console.log('removed img', id, result)
                if (error) { resolve('error') }
                resolve(result)
            });
        })
    }

}

