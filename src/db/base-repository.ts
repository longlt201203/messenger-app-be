import Db from "./db";

export interface IBaseRepository<T> {
    insert(...data: T[]): void;
    findAllNoFilter(): T[];
    countAllNoFilter(): number;
}

export class BaseRepository<T> implements IBaseRepository<T> {
    protected readonly db: Db;
    protected readonly data: T[];
    constructor(
        protected readonly collectionName: string
    ) {
        this.db = Db.getInstance();
        this.data = this.db.loadDataFile(collectionName);
    }
    
    insert(...data: T[]): void {
        this.data.push(...data);
        this.db.updateDataFile(this.collectionName, this.data);
    }

    findAllNoFilter() {
        return this.data;
    }

    countAllNoFilter() {
        return this.data.length;
    }
}