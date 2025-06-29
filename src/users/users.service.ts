import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    private users = [
        {
            id: 1,
            name: "Sarah Johnson",
            email: "sarah.johnson@email.com",
            role: "admin"
        },
        {
            id: 2,
            name: "Michael Chen",
            email: "michael.chen@email.com",
            role: "user"
        },
        {
            id: 3,
            name: "Emma Williams",
            email: "emma.williams@email.com",
            role: "moderator"
        },
        {
            id: 4,
            name: "James Rodriguez",
            email: "james.rodriguez@email.com",
            role: "user"
        },
        {
            id: 5,
            name: "Lisa Thompson",
            email: "lisa.thompson@email.com",
            role: "user"
        }
    ];

    findAll(role?: '') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users;
    }

    findById(id: number) {
        console.log('gett')
        const user = this.users.find(user => user.id === id)
        return user
    }

    save(user: { name: string, email: string, role: 'admin' | 'user' | 'moderator' }) {
        const highestId = [...this.users].sort((a, b) => b.id = a.id)
        const newUser = {
            id: highestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

}
