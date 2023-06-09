/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

type Tag = {
  id: number,
  user_id: number,
  name: string,
  sign: string,
  deleted_at: string | null,
  kind: "expenses" | "income"
}
type Resources<T = any> = {
  resources: T[]
  pager:{
    page: number,
    per_page: number,
    count: number
  }
}
type User = {
  id:numberl;
  email:string
}

type Item = {
  id: number,
  user_id: number,
  amount: number,
  tag_ids: number[],
  tags?:Tag[],
  happen_at: string,
  kind: "expenses" | "icome",
}

type Resource<T> = {
  resource:T
}
type ResourceError = {
  errors:Record<string,string[]>
}
type FormErrors<T> = {[k in keyof typeof T]:string[]}