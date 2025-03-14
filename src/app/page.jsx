"use client";
import { SessionProvider, signIn, useSession } from "next-auth/react";

export default function Home(props) {
    return (
        <SessionProvider session={props.session}>
            <div>
                <h1>Inicio</h1>
                <Auth />
            </div>
        </SessionProvider>
    );
}

function Auth() {
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

    return <p>Iniciaste sesion como {session.user.user_name}</p>;
}
