'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import getAllPosts from './getPosts';
import getMyPosts from './getMyPosts';

const config = vscode.workspace.getConfiguration('esa');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('"vscode-esa" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    // let getPostsCmd = vscode.commands.registerCommand('extension.getPosts', getPosts);
    let getPostsCMD =  vscode.commands.registerCommand('extension.getAllPosts', () => {
        getAllPosts();
    });
    let getMyPostsCMD =  vscode.commands.registerCommand('extension.getMyPosts', () => {
        getMyPosts();
    });

    context.subscriptions.push(getPostsCMD);
    context.subscriptions.push(getMyPostsCMD);
}

// this method is called when your extension is deactivated
export function deactivate() {
}