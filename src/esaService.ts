'use strict';

import * as vscode from 'vscode';
const request = require('request-promise-native');

export default class EsaService {
  constructor(private token: string, private teamName: string, private name: string) {
    this.token = token;
    this.teamName = teamName;
    this.name = name;
  }

  private showStatusBarMsg(msg: string) {
    vscode.window.setStatusBarMessage(msg, 2000);
  }

  private showInformationMsg(msg: string) {
    vscode.window.showInformationMessage(msg);
  }

  getPosts(query: string = '') {
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

  createPost(name: string, body: string = '') {
    // return request().post(`https://api.esa.io/v1/teams/${this.teamName}/posts?access_token=${this.token}`, {
    return request({
      url: `https://api.esa.io/v1/teams/${this.teamName}/posts`,
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      json: true,
      form: {
        post:{
          name: name,
          body_md: body,
          wip: false
        }
      }
    })
    .then(function(response) {
      this.showInformationMsg(`Created Post "${response.name}"`);
      return response;
    }.bind(this))
    .catch(function (err) {
      this.showInformationMsg(err);
    }.bind(this));
  }
}