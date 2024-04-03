import * as fs from "fs";
import * as path from "path";

export default class Db {
    private static db: Db;
    static getInstance() {
        if (!this.db) this.db = new Db();
        return this.db;
    }

    private baseFolder: string;
    constructor() {
        this.baseFolder = "data";
        if (!fs.existsSync(this.baseFolder)) {
            fs.mkdirSync(this.baseFolder);
        }
    }

    set BaseFolder(path: string) {
        this.baseFolder = path;
        if (!fs.existsSync(this.baseFolder)) {
            fs.mkdirSync(this.baseFolder);
        }
    }
    
    createDataFile(name: string) {
        const filepath = path.join(this.baseFolder, `${name}.json`);
        if (fs.existsSync(filepath)) {
            throw new Error("File already existed!");
        }
        fs.writeFileSync(filepath, "[]");
    }

    loadDataFile<T>(name: string) {
        const filepath = path.join(this.baseFolder, `${name}.json`);
        if (!fs.existsSync(filepath)) {
            this.createDataFile(name);
        }
        const strData = fs.readFileSync(filepath).toString();
        return JSON.parse(strData) as Array<T>;
    }

    updateDataFile(name: string, data: any[]) {
        const filepath = path.join(this.baseFolder, `${name}.json`);
        if (!fs.existsSync(filepath)) {
            throw new Error("File not found!");
        }
        const strData = JSON.stringify(data);
        fs.writeFileSync(filepath, strData);
    }
}