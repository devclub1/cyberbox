import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { File } from '../models/File';
import FileRepository from '../repositories/FileRepository';
import archiver from 'archiver';
import { join } from 'path';
import { ReadStream } from 'node:fs';
import fs from 'fs';

interface ResponseFile {
    name: string
    content: ReadStream | archiver.Archiver
}

@Service()
export default class FileService {
    constructor(@InjectRepository() private fileRepository: FileRepository) { }

    public async getFileById(uuid: string): Promise<File> {
        return this.fileRepository.findOne(uuid);
    }

    public async downloadFile(uuid: string): Promise<ResponseFile> {
        const file = await this.fileRepository.findOne(uuid);
        if (!file) {
            return undefined;
        }
        if (file.directory) {
            const archive = archiver('zip');
            archive.directory(join(file.path, file.name), file.name);
            archive.finalize().catch(err => {
                // handle err
            });
            const result: ResponseFile = {name: file.name + '.zip', content: archive};
            return result;
        }
        else {
            const fileToDownload = fs.createReadStream(join(file.path, file.name + file.extension));
            const result: ResponseFile = {name: file.name + file.extension, content: fileToDownload};
            return result;
        }
    }
}