import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "@/styles/globals.css";
import { Session } from "next-auth";

interface CustomPageProps {
  session: Session;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<CustomPageProps>) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
