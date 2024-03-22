import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../ValidationSchemas";

export async function POST(request : NextRequest){
    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    /* VALIDATION */
    if(!validation.success) 
    return NextResponse.json(validation.error.format(), { status: 400 });

    const newIssue = await prisma.issue.create({
        data: {title : body.title, description : body.description}
    })
    return NextResponse.json(newIssue,{status: 201})    
} 