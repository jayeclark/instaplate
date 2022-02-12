import Head from "next/head";
import Navigation from "./navigation/index";

const Layout = (props) => {
  const title =
    "Instaplate - Restaurant delivery from the company that brought you instacart";


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="true"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
      </Head>
      <header>
        <style jsx>
          {`
            h5 {
              color: #000;
              padding-top: 11px;
            }

            .navbar-brand {
              justify-self: left;
            }
          `}
        </style>
        <Navigation />
      </header>
      <div style={{ paddingTop: "70px" }}>{props.children}</div>
    </>
  );
};

export default Layout;