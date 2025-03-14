import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import SequelizeAdapter from "@auth/sequelize-adapter";
import * as models from "@/database/models";

const handler = NextAuth({
    debug: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
        }),
    ],
    adapter: SequelizeAdapter(models.connection),
    secret: process.env.SESSION_SECRET,
    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    useSecureCookies: false,
    cookies: {
        sessionToken: {
            name: "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: false,
            },
        },
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "google") {
                if (!profile.email) {
                    throw new Error("La cuenta de Google no tiene email asociado.");
                }

                await models.User.findOrCreate({
                    where: { user_email: profile.email },
                    defaults: {
                        user_email: profile.email,
                        user_name: profile.given_name,
                        user_lastname: profile.family_name,
                        user_password: profile.sub,
                    },
                });
            }
            if (account.provider === "facebook") {
                if (!profile.email) {
                    throw new Error("La cuenta de Facebook no tiene email asociado.");
                }

                await models.User.findOrCreate({
                    where: { user_email: profile.email },
                    defaults: {
                        user_email: profile.email,
                        user_name: profile.first_name,
                        user_lastname: profile.last_name,
                        user_password: profile.id,
                    },
                });
            }
            return true;
        },
        async session({ session, user }) {
            session.user = await models.User.findOne({
                where: { user_email: user.email },
                attributes: {
                    exclude: ["user_password"],
                },
                include: ["role"],
            });

            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
    },
});

export { handler as GET, handler as POST };
