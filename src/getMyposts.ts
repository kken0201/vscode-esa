import * as vscode from 'vscode';
import getPosts from './getPosts';

const config = vscode.workspace.getConfiguration('esa');

export default function getMyPosts() {
  if (!config.myName) {
    vscode.window.showWarningMessage("Please set the Your ID");
  }
  getPosts(`@${config.myName}`);
}

