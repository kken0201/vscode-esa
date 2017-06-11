'use strict';

import * as vscode from 'vscode';
import getPosts from './getPosts';
import EsaService from './esaService';
import { addMetaData, exactMetaData } from './postConverter';
import openMdWithContent from './openMdWithContent';
import { Post } from './interfaces';

const config = vscode.workspace.getConfiguration('esa');

function searchCategory(category: string) {
  return getPosts(`category:${category}`);
}

export default function createPost() {
  let postInfo = {} as Post;

  vscode.window.showInputBox({
    placeHolder: 'Search...',
    prompt: 'Please enter the category name you want to search'
  })
  .then(searchStr => {
    return searchCategory(searchStr)
  })
  // Category and Name
  .then(res => {
    const options = Array.from(new Set(res.posts.map(item => item.category))) as string[];
    return vscode.window.showQuickPick(options);
  })
  .then(categoryStr => {
    return vscode.window.showInputBox({
      value: `${categoryStr}/`,
      prompt: 'Please enter article name(full path).'
    });
  })
  .then(fixedNameStr => {
    console.log(postInfo);
    return new Promise((resolve, reject) => {
      resolve(postInfo.name = fixedNameStr);
    });
  }).then(() => {
    const esaClient = new EsaService(config.token, config.teamName);
    return esaClient.createPost(postInfo).catch(err => console.log(err));
  }).then((res) => {
    openMdWithContent(addMetaData(res));
  });
}
