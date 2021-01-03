import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import FileRepository from '../repositories/FileRepository';

@Service()
export default class FileService {
    constructor(@InjectRepository() private fileRepository: FileRepository) { }

    public async getFileById(uuid: string) {
        return this.fileRepository.findOne(uuid);
    }
}