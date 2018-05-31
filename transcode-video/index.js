'use strict';

var AWS = require('aws-sdk');
var path = require('path');

var elasticTranscoder = new AWS.ElasticTranscoder({
    region: 'us-east-1'
});


exports.handler = function(event, context, callback){
    
    console.log("Welcome!");
    
    var key = event.Records[0].s3.object.key;
    var sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));
    
    
    //課題１ ドット含む拡張子前のファイル名を取り出す
    var outputKey = path.basename(sourceKey, path.extname(sourceKey));
    
    console.log('key:', key, 'sourceKey:', sourceKey, 'outputKey', outputKey);
    
    //課題２ 拡張子のチェック
    
    var params = {
            PipelineId: '1527151061750-mppihh',
            OutputKeyPrefix: outputKey + '/',
            Input: {
                Key: sourceKey
            },
            Outputs: [
            {
                Key: outputKey + '-1080p' + '.mp4',
                PresetId: '1351620000001-000001'
            },
            {
                Key: outputKey + '-720p' + '.mp4',
                PresetId: '1351620000001-000010'
            },
            {
                Key: outputKey + '-web-720p' + '.mp4',
                PresetId: '1351620000001-100070'
            }
    ]};
    elasticTranscoder.createJob(params, function(error, data){
        if (error){
            callback(error);
        }
    });
};



