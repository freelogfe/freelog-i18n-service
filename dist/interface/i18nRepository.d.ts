import { PlainObject } from '.';
export interface II18nRepositorySerive {
    getAllI18nData(): Promise<PlainObject>;
    getI18nDataByPath(): Promise<PlainObject>;
    getI18nByDirPath(dirPath: string): PlainObject;
}
