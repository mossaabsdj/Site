import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { nom, prenom, email, password } = await req.json();

        const existing = await prisma.client.findUnique({ where: { email } });
        if (existing) {
            return new Response(
                JSON.stringify({ message: "Email already exists." }), { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.client.create({
            data: { nom, prenom, email, password: hashedPassword },
        });

        return new Response(
            JSON.stringify({ message: "Account created successfully!" }), { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal server error." }), {
            status: 500,
        });
    }
}