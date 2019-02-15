import cx from "classnames";
import Head from "next/head";
import * as React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface ILayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Layout = ({
  children,
  className,
  title = "Hostmaker",
}: ILayoutProps) => {
  return (
    <div className="page">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.css" />
        <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.js" />
      </Head>

      <Header />

      <div className={cx(className, "content")}>
        {children}
      </div>

      <Footer />

      <style jsx={true}>{`
        .page {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .content {
          position: relative;
          flex-grow: 2;
          background-color: #ddd;
        }
      `}</style>

      <style jsx={true} global={true}>{`
        html,
        body {
          height: 100%;
          margin: 0;
          padding: 0;
          font-size: 14px;
          line-height: 1.5;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, \
                       "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          color: #222;
          background-color: #fff;
        }

        #__next {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Layout;
