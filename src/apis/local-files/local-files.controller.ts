import { Router } from "express";
import upload from "../../etc/upload";
import { LocalFilesService } from "./local-files.service";

const localFilesService = LocalFilesService.getInstance();
export const LocalFilesController = Router();

LocalFilesController.post("/", upload.single("file"), (req, res, next) => {
    const file = req.file;
    if (file) {
        const info = localFilesService.create({ diskPath: file.path, fileName: file.filename });
        let url = `${req.protocol}://${req.headers.host}/local-files/${info.id}`;
        res.status(201).send({ url });
    } else {
        res.status(400).send({ message: "File upload error!" });
    }
});

LocalFilesController.get("/:id", (req, res, next) => {
    const info = localFilesService.getLocalFileInfo(+req.params.id);
    if (info) {
        res.status(200).sendFile(info.diskPath, { root: "." });
    } else {
        res.status(404).send({ message: "File not found" });
    }
});