import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const password = process.env.SEED_PASSWORD;
if (!password || password.length < 8) {
    console.error("Set SEED_PASSWORD (8+ characters) in .env before seeding.");
    process.exit(1);
}

async function main() {
    const passwordHash = await bcrypt.hash(password, 12);
    const consentAt = new Date();

    // Fields every demo user shares. All values are fake.
    const base = {
        passwordHash,
        dateOfBirth: new Date("1998-05-15"),
        city: "Pune",
        consentAt,
        onboardingStep: 4,
        onboardingComplete: true,
    };

    await prisma.user.upsert({
        where: { email: "admin@lifelink.test" },
        update: {},
        create: { ...base, email: "admin@lifelink.test", role: "ADMIN", fullName: "Seed Admin", gender: "OTHER", phone: "9000000001" },
    });

    await prisma.user.upsert({
        where: { email: "doctor@lifelink.test" },
        update: {},
        create: {
            ...base,
            email: "doctor@lifelink.test",
            role: "DOCTOR",
            fullName: "Dr. Seed Doctor",
            gender: "FEMALE",
            phone: "9000000002",
            doctorProfile: {
                create: {
                    licenseNumber: "MH-SEED-0001",
                    hospitalName: "Seed City Hospital",
                    approvalStatus: "VERIFIED", // pre-approved so you can test the doctor dashboard
                    reviewedAt: new Date(),
                },
            },
        },
    });

    await prisma.user.upsert({
        where: { email: "donor@lifelink.test" },
        update: {},
        create: {
            ...base,
            email: "donor@lifelink.test",
            role: "DONOR",
            fullName: "Seed Donor",
            gender: "MALE",
            bloodGroup: "O_NEG",
            phone: "9000000003",
            donorProfile: { create: {} },
        },
    });

    await prisma.user.upsert({
        where: { email: "receiver@lifelink.test" },
        update: {},
        create: {
            ...base,
            email: "receiver@lifelink.test",
            role: "RECEIVER",
            fullName: "Seed Receiver",
            gender: "FEMALE",
            bloodGroup: "A_POS",
            phone: "9000000004",
            receiverProfile: { create: {} },
        },
    });

    console.log("Seed done: admin, doctor, donor and receiver created.");
}

main()
    .catch((e) => {
        console.error("Seed failed:", e.message);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());