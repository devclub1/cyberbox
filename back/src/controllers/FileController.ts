import { Response } from 'express';
import { join } from 'path';
import { JsonController, Get, Param, Res } from 'routing-controllers';
import { Inject } from 'typedi';
import { promisify } from 'util';
import FileService from '../services/FileService';

@JsonController('/file')
export class FileController {

    @Inject()
    private fileService: FileService;

    @Get('/:uuid')
    async getFile(@Param('uuid') uuid: string, @Res() res: Response) {
        const result = await this.fileService.getFileById(uuid);
        if (result !== undefined) {
            return res.status(200).send(result);
        } else {
            return res.status(404).json({message: 'File not found'});
        }
    }

    @Get('/:uuid/download')
    async downloadFile(@Param('uuid') uuid: string, @Res() res: Response) {
        const result = await this.fileService.getFileById(uuid);
        if (result !== undefined) {
            const file = join(result.path, result.name + result.extension);
            return await promisify<string, void>(res.download.bind(res))(file);
        } else {
            return res.status(404).json({message: 'File not found'});
        }
    }
}