import { Injectable, NotFoundException } from "@nestjs/common";
import { AdminDTO } from "./admin.dto";
import { AdminEntity } from "./admin.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AdminService {
    constructor(@InjectRepository(AdminEntity) private adminRepository: Repository<AdminEntity>) {}
    private admins = []

    async registerAdmin(admin: AdminEntity): Promise<AdminEntity> {
        return this.adminRepository.save(admin);
    }

    async showAllAdmins(): Promise<AdminEntity[]> {
        return this.adminRepository.find();
    }

    async getAdminById(id: number): Promise<AdminEntity> {
        return this.adminRepository.findOneBy({id:id});
    }

    getAdminByNameAndAddress(name: string, address: string): object {
        const admin = this.admins.filter(admin => admin.name === name && admin.address === address);
        if (admin.length === 0) {
            return { message: 'Admin not found' };
        }
        return admin;
    }

    async deleteAdminById(id: number): Promise<void> {
        await this.adminRepository.delete(id);
    }

    async updateAdmin(id: number, updatedAdmin: AdminEntity): Promise<AdminEntity> {
        await this.adminRepository.update(id, updatedAdmin);
        return this.adminRepository.findOneBy({id:id});
    }

    partialUpdateAdmin(id: number, partialAdmin: Partial<AdminDTO>): object {
        const index = this.admins.findIndex(admin => admin.id === id);
        if (index === -1) {
            return { message: 'Admin not found' };
        }
        this.admins[index] = { ...this.admins[index], ...partialAdmin };
        return this.admins[index];
    }
}
