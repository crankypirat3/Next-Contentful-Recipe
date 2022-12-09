import Link from "next/link"

export default function Navbar() {
    return (
      <nav className="navbar">
        <h3>Recipe Blog</h3>
        <div className="nav-link-container">
          <Link href="/">
            <a className="nav-link">Home</a>
          </Link>
            {/* <button className="nav-link">Filter</button> */}
          
        </div>
      </nav>
    );

}