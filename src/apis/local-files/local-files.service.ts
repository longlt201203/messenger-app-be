import { LocalFile } from "../../db/entities/local-file.entity";
import { ILocalFileRepository, LocalFileRepository } from "../../db/repositories/local-file.repository";
import { CreateLocalFileDto } from "./dto/create-local-file.dto";

export class LocalFilesService {
    private static localFilesService: LocalFilesService;
    static getInstance() {
        if (!this.localFilesService) this.localFilesService = new LocalFilesService();
        return this.localFilesService;
    }

    private localFileRepo: ILocalFileRepository;
    constructor() {
        this.localFileRepo = LocalFileRepository.getInstance();
    }

    create(dto: CreateLocalFileDto) {
        const localFile: LocalFile = {
            id: this.localFileRepo.countAllNoFilter()+1,
            createdAt: new Date().toLocaleString(),
            diskPath: dto.diskPath,
            fileName: dto.fileName
        };
        this.localFileRepo.insert(localFile);
        return localFile
    }

    getLocalFileInfo(id: number) {
        const localFile = this.localFileRepo.findById(id);
        return localFile;
    }
}