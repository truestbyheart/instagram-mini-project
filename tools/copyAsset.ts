import * as shell from "shelljs";

/*
* @author Daniel Mwangila
* @description copies the views file into the dist folder for production.
* @reference https://developer.okta.com/blog/2018/11/15/node-express-typescript
* The TypeScript compiler does the work of generating the JavaScript files and copies them to the dist folder.
* However, it does not copy the other types of files the project needs to run, such as the EJS view templates.
* */
shell.cp( "-R", "./views", "dist/" );
shell.cp("-R", "./public", "dist");
