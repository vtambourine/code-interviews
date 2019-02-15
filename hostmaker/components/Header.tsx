import Link from "next/link";

interface IHeaderProps {
  title?: string;
}

const Header = ({
  title = "Hostmaker",
}: IHeaderProps) => (
  <header>
    <Link href="/">
      <a className="home">{title}</a>
    </Link>

    <style jsx={true}>{`
      header {
        padding: 16px 0;
        font-size: 18px;
        font-family: Georgia, "Times New Roman", serif;
        text-transform: uppercase;
        letter-spacing: 2.4px;
        text-align: center;
        background-color: #fff;
      }

      a,
      a:visited {
        color: #222;
        text-decoration: none;
      }

      a.home {
        position: relative;
        display: inline-block;
      }

      a.home:after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 0;
        height: 1px;
        background-color: #222;
        transition: all 0.24s ease;
      }

      a.home:hover:after {
        left: 0;
        width: 100%;
      }
    `}</style>
  </header>
);

export default Header;
