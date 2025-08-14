import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/database/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, name, createdAt, updatedAt } = body;
        
        if (!email || !name) {
            return NextResponse.json(
                { error: "Missing required fields" }, 
                { status: 400 }
            );
        }
        const existingUser = await prisma.user.findUnique({
            where: { email }});

        if (existingUser) {
            return NextResponse.json(existingUser, { status: 200 });}


        const user = await prisma.user.create({
            data: {
                email,
                name,
                createdAt: new Date(createdAt),
                updatedAt: new Date(updatedAt)
            }
        });

        return NextResponse.json(user, { status: 201 });
        
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { error: "Internal server error" }, 
            { status: 500 }
        );
    }
}