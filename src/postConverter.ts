import * as vscode from 'vscode';

export function addMetaData(id: number, body: string = '') {
  const content =
`{id: ${id}}

${body}`
  return content;
}