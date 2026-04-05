const {S3Client, PutObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3');
const rand = require('random-key');
require('dotenv').config();

const s3Client = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    endpoint: process.env.AWS_ENDPOINT_URL,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

 const proxyDomain = process.env.proxyDomain;

exports.imageUploadFile = async (file) => {
    try {
        const fileName = file.originalname;
        const Key = `uploads/product/${rand.generate()}_${fileName}`;
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: Key,
            Body: file.buffer,
            ContentType: file.mimetype,
        }

        const data = await s3Client.send(new PutObjectCommand(params));
        const url = `${proxyDomain}/${Key}`;
        console.log('success',data);
        return {url,Key};
    } catch (error) {
        console.error(error)
        return error.message;
    }
}

exports.deleteImage = async (key) => {
    try {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key
        }

        const command = new DeleteObjectCommand(params);
        const result = await s3Client.send(command);
        console.log(result);
        return {
            success: true,
            message: `Deleted ${key}`
        }
    } catch (error) {
        console.error(error);
        return error.message
    }
}