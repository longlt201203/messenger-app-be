import { BaseRepository, IBaseRepository } from "../base-repository";
import { LocalFile } from "../entities/local-file.entity";

export interface ILocalFileRepository extends IBaseRepository<LocalFile> {
    findById(id: number): LocalFile | undefined;
}

export class LocalFileRepository extends BaseRepository<LocalFile> implements ILocalFileRepository {
    private static userRepo: ILocalFileRepository;
    static getInstance() {
        if (!this.userRepo) this.userRepo = new LocalFileRepository();
        return this.userRepo;
    }

    constructor() {
        super("local-files");
    }

    findById(id: number) {
        return this.data.find(item => item.id === id);
    }
}