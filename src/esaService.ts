'use strict';

const request =  require('request-promise-native');
import * as vscode from 'vscode';
import { Post } from './interfaces';

export default class EsaService {
  constructor(private token: string, private teamName: string) {
    this.token = token;
    this.teamName = teamName;
  }

  private showStatusBarMsg(msg: string) {
    vscode.window.setStatusBarMessage(msg, 2000);
  }

  private showInformationMsg(msg: string) {
    vscode.window.showInformationMessage(msg);
  }

  getPosts(query: string = '') {
    this.showStatusBarMsg('Requesting posts......');
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

  createPost(post: Post) {
    return request({
      url: `https://api.esa.io/v1/teams/${this.teamName}/posts`,
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      json: true,
      form: {
        post: {
          ...post,
          wip: true
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

  updatePost(post: Post) {
    return request({
      url: `https://api.esa.io/v1/teams/${this.teamName}/posts/${post.number}`,
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      json: true,
      form: {
        post: post
      }
    })
    .then(function(response) {
      console.log(response);
      this.showInformationMsg(`Update Post "${response.name}"`);
      return response;
    }.bind(this))
    .catch(function (err) {
      this.showInformationMsg(err);
    }.bind(this));
  }
}