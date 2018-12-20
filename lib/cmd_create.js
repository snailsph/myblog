var path = require("path");
var utils = require('./utils');
var fse = require('fs-extra');
var moment = require("moment");

function newPost(dir,title,content){
    var data = [
        '---',
        'title:'+title,
        "date:"+moment().format('YYYY-MM-DD'),
        '---',
        '',
        content
    ].join("\r\n");

    var name = moment().format('YYYY-MM') + '/hello-world.md';
    var file = path.resolve(dir,'_posts',name);
    fse.outputFileSync(file,data);
}

module.exports = function(dir){
    dir = dir || '.';
    //创建基础目录
    fse.mkdirsSync(path.resolve(dir,'_layout'));
    fse.mkdirsSync(path.resolve(dir,'_posts'));
    fse.mkdirsSync(path.resolve(dir,'assets'));
    fse.mkdirsSync(path.resolve(dir,'posts'));

    var tpDir = path.resolve(__dirname,'../tpl');
    fse.copySync(tpDir,dir);

    newPost(dir,"hello world","这是我的第一遍文章");
    console.log('ok');
}