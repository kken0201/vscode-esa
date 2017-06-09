import * as vscode from 'vscode';
import EsaService from './esaService';
import openMdWithContent from './openMdWithContent';

const config = vscode.workspace.getConfiguration('esa');

export default function getPosts(query: string = '') {
    if (!config.teamName || !config.token) {
        vscode.window.showInformationMessage('Check readme for details.')
        vscode.window.showWarningMessage("Please set the token & API url first");
        return;
    }
    vscode.window.setStatusBarMessage("Requesting posts .....", 2);

    const esaClient = new EsaService(config.token, config.teamName, config.myName);

    return esaClient.getPosts(query)
        .then(res => res)
        .catch(err => console.log(err));
}