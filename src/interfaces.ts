'use strict';

export interface User {
  name: string;
  screen_name: string;
  icon:  string;
}

export interface Post {
  number: number,
  name: string,
  full_name?: string,
  wip?: boolean,
  body_md?: string,
  body_html?: string,
  created_at?: string,
  message?: string,
  url?: string,
  updated_at?: string,
  tags?: string[],
  category?: string,
  revision_number?: number,
  created_by?: User,
  updated_by?: User,
  kind?: string,
  comments_count?: number,
  tasks_count?: number,
  done_tasks_count?: number,
  stargazers_count?: number,
  watchers_count?: number,
  star?: boolean,
  watch?: boolean
}
