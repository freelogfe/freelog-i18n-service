declare module 'path-to-regexp'
declare module 'is-type-of'
declare module 'fs-extra'
declare module 'egg-freelog-database/lib/database/mongo-base-operation'

declare module 'path' {
  export function normalize(p: string): string
  export function join(...paths: string []): string
  export function resolve(...paths: string []): string
}

declare module 'object-path' {
  export function get(obj: Object, keys: string |  string []): string
  export function has(obj: Object, keys: string |  string []): boolean
  export function del(obj: Object, keys: string |  string []): void
  export function set(obj: Object, ...params: any []): void
  export function empty(obj: Object, ...params: any []): void
}