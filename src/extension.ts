'use strict';

import * as vscode from 'vscode';
import openPost from './openPost';
import createPost from './createPost';
import updatePost from './updatePost';

const config = vscode.workspace.getConfiguration('esa');

export function activate(context: vscode.ExtensionContext) {
    console.log('"vscode-esa" is now active!');

    let openPostCMD =  vscode.commands.registerCommand('extension.openPost', () => {
        openPost();
    });
    let createPostCMD =  vscode.commands.registerCommand('extension.createPost', () => {
        createPost();
    });
    let updatePostCMD =  vscode.commands.registerCommand('extension.updatePost', () => {
        updatePost();
    });

    context.subscriptions.push(openPostCMD);
    context.subscriptions.push(createPostCMD);
    context.subscriptions.push(updatePostCMD);
}

export function deactivate() {
}