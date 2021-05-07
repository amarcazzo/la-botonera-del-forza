import Head from "next/head";
import Image from "next/image";

const Layout = ({ children }: any) => (
  <div>
    <Head>
      <title>#LaBotoneraDelForza</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="header has-text-centered">
      <p className="title m-0">#LaBotoneraDelForza</p>
      <Image src="/assets/forza.png" alt="#ElForza" width="98" height="98" />
    </div>
    {children}
  </div>
);

export default Layout;
