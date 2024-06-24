import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { Response } from 'express';


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('addadmin')
    @UsePipes(new ValidationPipe())
    addAdmin(@Body() admin: AdminDTO): object {
        return this.adminService.registerAdmin(admin);
    }

    @Get('alladmins')
    showAllAdmin(): object {
        return this.adminService.showAllAdmins();
    }

    @Get('getById/:id')
    getAdminById(@Param('id', ParseIntPipe) id: number): object {
        return this.adminService.getAdminById(id);
    }

    @Get('getByNameAddress')
    getAdminByNameAndAddress(@Query('name') name: string, @Query('address') address: string): object {
        return this.adminService.getAdminByNameAndAddress(name, address);
    }

    @Delete('delete/:id')
    deleteAdminById(@Param('id', ParseIntPipe) id: number): object {
        return this.adminService.deleteAdminById(id);
    }

    @Put('put/:id')
    updateAdmin(@Param('id', ParseIntPipe) id: number, @Body() admin: AdminDTO): object {
        return this.adminService.updateAdmin(id, admin);
    }

    @Patch('patch/:id')
    partialUpdateAdmin(@Param('id', ParseIntPipe) id: number, @Body() admin: Partial<AdminDTO>): object {
        return this.adminService.partialUpdateAdmin(id, admin);
    }

    @Post('addimage')
    @UseInterceptors(FileInterceptor('imageFile', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
                cb(null, true);
            } else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 30000 },
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`);
            },
        }),
    }))

    addImage(@Body() myobj: object, @UploadedFile() file: Express.Multer.File) {
        console.log(file);
        console.log(myobj);
        return myobj;
    }

    @Get('/getimage/:name')
    getImage(@Param('name') filename: string, @Res() res: Response) {
        res.sendFile(filename, { root: './uploads' });
    }
}
