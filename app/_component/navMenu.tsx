import Link from "next/link";
const NavBar=()=>{
    return(
        <header className="flex justify-between border-b-[1.3rem] py-[1.2rem]">
            
            <h1 className="font-bold text-[1.5rem] text-red-800 " >MockApi App</h1>

            <nav className="font-bold text-[1.5rem] text-red-800 " >
             <Link className="Link" href="/">Home</Link>
             <Link className="Link" href="/input">Input</Link>
             <Link className="Link" href="/show">Show</Link>
            </nav>

        </header>
    )
}
export default NavBar;