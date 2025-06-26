import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import User from "../../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const { email, newPassword } = await request.json();

        if (!email || !newPassword) {
            return NextResponse.json(
                { error: "Email and new password are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });

    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({ message: "Failed to reset password" }, { status: 500 });
    }
} 