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

    const esaClient = new EsaService(config.token, config.teamName);

    esaClient.getPostList(query).then((json) => {
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
    })
    
    vscode.window.setStatusBarMessage("Requesting posts .....", 2);
}