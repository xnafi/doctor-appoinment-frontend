import { NextResponse } from "next/server";

type AppointmentPayload = {
    patientName?: string;
    phone?: string;
    age?: number;
    message?: string;
    note?: string;
};

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as AppointmentPayload;
        const deviceId = req.headers.get("x-device-id")?.trim();
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

        if (!body?.patientName?.trim()) {
            return NextResponse.json(
                { success: false, message: "patientName is required" },
                { status: 400 },
            );
        }

        if (!body?.phone?.trim()) {
            return NextResponse.json(
                { success: false, message: "phone is required" },
                { status: 400 },
            );
        }

        if (!deviceId) {
            return NextResponse.json(
                { success: false, message: "x-device-id header is required" },
                { status: 400 },
            );
        }

        if (!apiBaseUrl) {
            return NextResponse.json(
                { success: false, message: "API base URL is not configured" },
                { status: 500 },
            );
        }

        if (!Number.isInteger(body?.age) || (body?.age ?? -1) < 0) {
            return NextResponse.json(
                { success: false, message: "age must be a valid non-negative integer" },
                { status: 400 },
            );
        }

        const upstreamResponse = await fetch(`${apiBaseUrl}/api/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Device-ID": deviceId,
            },
            body: JSON.stringify({
                patientName: body.patientName?.trim(),
                phone: body.phone?.trim(),
                age: body.age,
                message: body.message?.trim() || undefined,
                note: body.note?.trim() || undefined,
            }),
        });

        const responseJson = (await upstreamResponse.json().catch(() => null)) as
            | { message?: string; error?: string; data?: unknown }
            | null;

        if (!upstreamResponse.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        responseJson?.message ||
                        responseJson?.error ||
                        "Failed to create appointment",
                },
                { status: upstreamResponse.status },
            );
        }

        return NextResponse.json({
            success: true,
            message: "Appointment request received",
            data: responseJson?.data,
        });
    } catch {
        return NextResponse.json(
            { success: false, message: "Invalid request payload" },
            { status: 400 },
        );
    }
}
