import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <div className="navbar absolute z-50 w-full">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-xl">ak</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/#recent-projects" className="link link-hover">Projects</Link></li>
                        <li><Link href="/#recent-posts" className="link link-hover">Blog</Link></li>
                        {/* <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="bg-base-100 rounded-t-none p-2">
                                    <li><a>Link 1</a></li>
                                    <li><a>Link 2</a></li>
                                </ul>
                            </details>
                        </li> */}
                    </ul>
                </div>
            </div>
        </>
    );
}