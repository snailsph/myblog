#! /usr/bin/env node

var program = require('commander');

program.version('0.0.1').option('-C, --chdir [value]', '设置服务器节点','/home/conan/server');

program
    .command('help')
    .description('显示使用帮助')
    .action(function(){
        program.outputHelp();
    });

program
    .command('create [dir]')
    .description('创建一个空的博客')
    .action(require("../lib/cmd_create"));

program
    .command('preview [dir]')
    .description('实时预览')
    .action(require('../lib/cmd_preview'));

program
    .command('build [dir]')
    .description('生成整站静态html')
    .option('-o,--output <dir>','生成静态html存放目录')
    .action(require('../lib/cmd_build'));

program.parse(process.argv);