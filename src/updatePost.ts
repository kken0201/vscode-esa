'use strict';

import * as vscode from 'vscode';
import getPosts from './getPosts';
import EsaService from './esaService';
import { addMetaData, exactMetaData } from './postConverter';
import { Post } from './interfaces'

const config = vscode.workspace.getConfiguration('esa');

export default function updatePost() {
  if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId === 'markdown'){
    const content = exactMetaData(vscode.window.activeTextEditor.document.getText()) as Post;
    console.log(content);
    if (content.number !== 0 && content.name !== '') {
      const postData = { ...content };
      const esaClient = new EsaService(config.token, config.teamName);
      esaClient.updatePost(postData)
        .catch(res => console.log(res));
    } else {
      vscode.window.showWarningMessage('Not found required Metadata from this Markdown file.');
    }
  } else {
    vscode.window.showWarningMessage('Markdown file is not open. Please open and focus the Markdown file you want to update.');
  }
}