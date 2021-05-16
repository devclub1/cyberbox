import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { File } from '../models/File';

@Service()
@EntityRepository(File)
export default class FileRepository extends Repository<File> {

}