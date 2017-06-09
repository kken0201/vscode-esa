import * as vscode from 'vscode';
import getPosts from './getPosts';
import EsaService from './esaService';
import { addMetaData } from './postConverter';
import openMdWithContent from './openMdWithContent'

const config = vscode.workspace.getConfiguration('esa');

function searchCategory(category: string) {
  return getPosts(`category:${category}`);
}

export default function createPost() {
  let postInfo = {
    name: '',
    body: ''
  };

  vscode.window.showInputBox({
    placeHolder: "Search...",
    prompt: "Please enter the category name you want to search"
  })
  .then(searchStr => {
    return searchCategory(searchStr)
  })
  // Category and Name
  .then(res => {
    const options = Array.from(new Set(res.posts.map(item => item.category)));
    return vscode.window.showQuickPick(options);
  })
  .then(categoryStr => {
    return vscode.window.showInputBox({
      value: `${categoryStr}/`,
      prompt: 'Please enter article name(full path).'
    });
  })
  .then(fixedNameStr => {
    return new Promise((resolve, reject) => {
      resolve(postInfo.name = fixedNameStr);
    });
  }).then(() => {
    if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId === "markdown") {
      console.log('When opening markdown file');
    } else {
      const esaClient = new EsaService(config.token, config.teamName, config.myName);
      return esaClient.createPost(postInfo.name, postInfo.body).catch(err => console.log(err));
    }
  }).then((res) => {
    openMdWithContent(addMetaData(res.number));
  });
}
