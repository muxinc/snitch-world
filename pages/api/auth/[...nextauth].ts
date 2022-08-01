import { decryptServiceSecret } from '@/utils/secrets';
import NextAuth, { NextAuthOptions } from 'next-auth';
import OktaProvider from 'next-auth/providers/okta';

const options: NextAuthOptions = {
  providers: [
    // https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/providers/okta.ts
    OktaProvider({
      clientId: process.env.OKTA_CLIENT_ID ?? '',
      clientSecret: process.env.OKTA_CLIENT_SECRET_ENCRYPTED ? decryptServiceSecret(process.env.OKTA_CLIENT_SECRET_ENCRYPTED) : '',
      issuer: process.env.OKTA_ISSUER
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token }) {
      return token
    }
  }
};

export default NextAuth(options);
