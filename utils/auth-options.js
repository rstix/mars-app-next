import connectDB from '@/config/database';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    // CredentialsProvider({
    //   name: 'Credentials',
    //   id: 'credentials',
    //   credentials: {
    //     email: { label: 'Email', type: 'text' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials, req) {
    //     await connectDB();
    //     // const user = await User.findOne({ email: profile.email });
    //     const user = await User.findOne({
    //       email: credentials?.email,
    //     }).select('+password');

    //     if (!user) throw new Error('Wrong Email');

    //     const passwordMatch = await bcrypt.compare(
    //       credentials.password,
    //       user.password
    //     );

    //     if (!passwordMatch) throw new Error('Wrong Password');
    //     return user;
    //   },
    // }),
  ],
  callbacks: {
    // called on successful sign in
    async signIn({ profile }) {
      await connectDB();
      // check if user exists
      const user = await User.findOne({ email: profile.email });
      // if not, then add user to database
      if (!user) {
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      return true;
    },
    // modifies the session object
    async session({ session }) {
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
};
