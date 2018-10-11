'use strict';

import * as vscode from 'vscode';
import openMdWithContent from './openMdWithContent';
import { addMetaData, exactMetaData } from './postConverter';
import getPosts from './getPosts';
import { Post } from './interfaces';

const config = vscode.workspace.getConfiguration('esa');

export default function openPost() {
  const options = [
    'Open From My Posts',
    'Open From Latest Posts',
  ];
  let postStore = [];
  vscode.window.showQuickPick(options).then(result => {
    switch (result) {
      case 'Open From Latest Posts':
        return getPosts();
      case 'Open From My Posts':
        if (config.myName === '') throw '';
        return getPosts(`@${config.myName}`);
    }
  }).then(json => {
    if(!json){
      throw '';
    }
    postStore = json.posts;
    const posts: vscode.QuickPickItem[] = json.posts.map((post) => {
      return {
        description: post.name,
        detail: post.created_at,
        label: post.number.toString()
      }
    });
    return vscode.window.showQuickPick(posts);
  }).then((selected: vscode.QuickPickItem) => {
    if (!selected) {
        throw '';
    }
    return selected;
  }).then((selected: vscode.QuickPickItem) => {
    postStore.forEach(post => {
      if (post.number.toString() === selected.label) {
        openMdWithContent(addMetaData(post));
      }
    });
  });
}
