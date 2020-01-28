const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/aws.config.json');

const s3 = new AWS.S3();

module.exports = s3;