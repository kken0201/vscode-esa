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
  vscode.window.showQuickPick(options).then(result => {
    switch (result) {
      case 'Open From Latest Posts':
        return getPosts();
      case 'Open From My Posts':
        if (config.myName === '') throw '';
        return getPosts(`@${config.myName}`);
    }
  }).then(json => {
    const posts = json.posts.map((post) => {
      return {
        description: post.name,
        detail: post.created_at,
        label: post.number,
        data: post as Post
      }
    });
    return vscode.window.showQuickPick(posts);
  }).then(selected => {
    if (!selected) {
        throw '';
    }
    return selected;
  }).then(selected => {
    openMdWithContent(addMetaData(selected.data));
  });
}
