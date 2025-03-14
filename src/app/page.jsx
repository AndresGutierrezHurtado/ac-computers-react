"use client";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
        return (
            <>
                <button onClick={() => signIn("google")} className="btn mx-3">
                    Iniciar sesion con Google
                </button>
                <button onClick={() => signIn("facebook")} className="btn mx-3">
                    Iniciar sesion con Facebook
                </button>
            </>
        );
    }

    return (
        <section className="w-full px-3">
            <div className="w-full max-w-[1200px] mx-auto">
                <h1 className="text-5xl font-extrabold">Bienvenido {session.user.user_name}!</h1>
            </div>
        </section>
    );
}
