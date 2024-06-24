import { Injectable, NotFoundException } from "@nestjs/common";
import { AdminDTO } from "./admin.dto";

@Injectable()
export class AdminService {
    private admins = []

    registerAdmin(admin: AdminDTO): object {
        this.admins.push(admin);
        return admin;
    }

    showAllAdmins(): object {
        return this.admins;
    }

    getAdminById(id: number): object {
        const admin = this.admins.find(admin => admin.id === id);
        if (!admin) {
            return { message: 'Admin not found' };
        }
        return admin;
    }

    getAdminByNameAndAddress(name: string, address: string): object {
        const admin = this.admins.filter(admin => admin.name === name && admin.address === address);
        if (admin.length === 0) {
            return { message: 'Admin not found' };
        }
        return admin;
    }

    deleteAdminById(id: number): object {
        const index = this.admins.findIndex(admin => admin.id === id);
        if (index === -1) {
            return { message: 'Admin not found' };
        }
        const admin = this.admins.splice(index, 1);
        return admin;
    }

    updateAdmin(id: number, updatedAdmin: AdminDTO): object {
        const index = this.admins.findIndex(admin => admin.id === id);
        if (index === -1) {
            return { message: 'Admin not found' };
        }
        this.admins[index] = updatedAdmin;
        return updatedAdmin;
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
