// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../../../lib/options";
// import { connectToDatabase } from "../../../../../lib/db";
// import User from "../../../../../models/User";
// import bcrypt from "bcryptjs";

// export async function PUT(request: NextRequest) {
//     try {
//         const session = await getServerSession(authOptions);

//         if (!session || !session.user) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//         }

//         const { username, newPassword } = await request.json();

//         if (!username && !newPassword) {
//             return NextResponse.json(
//                 { error: "Username or new password must be provided" },
//                 { status: 400 }
//             );
//         }

//         await connectToDatabase();
//         const user = await User.findById(session.user.id);

//         if (!user) {
//             return NextResponse.json({ error: "User not found" }, { status: 404 });
//         }

//         if (username) user.username = username;
//         if (newPassword) user.password = await bcrypt.hash(newPassword, 10);

//         await user.save();

//         return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });

//     } catch (error) {
//         console.error("Update profile error:", error);
//         return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
//     }
// }
