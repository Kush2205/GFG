import {NextRequest , NextResponse} from "next/server";
import {prisma} from "@repo/database/prisma";

export async function POST(req:NextRequest , res: NextResponse){
    const {email , platform , platformId} =await req.json();
    
    if(!email || !platform || !platformId){
        return NextResponse.json({error: "Missing required fields"}, {status: 400});
    }

    try {
        const user = await prisma.user.findUnique({
            where: {email}
        });

        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        // Map platform to the correct field name
        let updateData: any = {};
        switch(platform) {
            case 'github':
                updateData.github = platformId;
                break;
            case 'leetcode':
                updateData.leetcode = platformId;
                break;
            case 'codeforces':
                updateData.codeforces = platformId;
                break;
            default:
                return NextResponse.json({error: "Invalid platform"}, {status: 400});
        }

        const updatedUser = await prisma.user.update({
            where: {email},
            data: updateData
        });

        return NextResponse.json(updatedUser, {status: 200});
        
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }

}
