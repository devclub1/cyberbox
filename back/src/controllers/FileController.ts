import { Response } from 'express';
import { JsonController, Get, Param, Res } from 'routing-controllers';
import { Inject } from 'typedi';
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
        const result = await this.fileService.downloadFile(uuid);
        if (result !== undefined) {
            return await new Promise<Response>(() => {
                // adding res.attachment will make browsers show the download prompt
                result.content.pipe(res);
                res.attachment(result.name);
                return res;
            });
        } else {
            return res.status(404).json({message: 'File not found'});
        }
    }
}