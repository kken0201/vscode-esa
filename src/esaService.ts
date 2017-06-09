'use strict';

import * as vscode from 'vscode';
const request = require('request-promise-native');

export default class EsaService {
  constructor(private token: string, private teamName: string) {
    this.token = token;
    this.teamName = teamName;
  }

  private showStatusBarMsg(msg: string) {
    vscode.window.setStatusBarMessage(msg, 2000);
  }

  getPostList(query: string = '') {
    this.showStatusBarMsg("Requesting posts......");

    return request({
      uri: `https://api.esa.io/v1/teams/${this.teamName}/posts`,
      qs: {
        access_token: this.token,
        q: query
      },
      json: true
    }).then(function(response) {
      return response;
    }).catch(function (err) {
      console.log(err);
      this.showStatusBarMsg(err);
    });
  }
}