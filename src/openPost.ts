import * as vscode from 'vscode';
import openMdWithContent from './openMdWithContent';
import getPosts from './getPosts';

const config = vscode.workspace.getConfiguration('esa');

export default function openPost() {
  const options = [
    "Open From My Posts",
    "Open From Latest Posts",
  ];
  vscode.window.showQuickPick(options).then(result => {
    switch (result) {
      case 'Open From Latest Posts':
        return getPosts();
      case 'Open From My Posts':
        return getPosts(`@${config.myName}`);
    }
  }).then(json => {
    const posts = json.posts.map((post) => {
      return {
        description: post.name,
        detail: post.created_at,
        label: post.number,
        body: post.body_md
      }
    });
    return vscode.window.showQuickPick(posts);
  }).then(selected => {
    if (!selected) {
        throw "";
    }
    return selected;
  }).then(selected => {
    openMdWithContent(selected.body);
  });
}
