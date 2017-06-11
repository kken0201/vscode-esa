'use strict';

import * as vscode from 'vscode';

export default function openMdWithContent(content: string) {
    return vscode.workspace.openTextDocument({language: 'markdown'}).then(doc => {
      return vscode.window.showTextDocument(doc);
    }).then(editor => {
      let startPos = new vscode.Position(1,0);
      editor.edit(edit => {
        edit.insert(startPos, content);
      });
    });
}