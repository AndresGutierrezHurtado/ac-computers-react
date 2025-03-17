import { feedbackTemplate } from "@/hooks/emailTemplates";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request) {
    try {
        const { user_email, email_subject, email_message } = await request.json();

        const resend = new Resend(process.env.EMAIL_API);

        await resend.emails.send({
            from: "AC Computers <onboarding@resend.dev>",
            to: "andres52885241@gmail.com",
            subject: ` ${email_subject} Formulario de contacto | AC Computers`,
            html: feedbackTemplate(user_email, email_subject, email_message),
        });

        return NextResponse.json(
            { success: true, message: "Correo enviado correctamente", data: null },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Hubo un error al enviar el correo", data: null },
            { status: 500 }
        );
    }
}
