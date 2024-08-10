import { Outlet } from "react-router-dom"
import { Navbar, SideNav } from "../components/links"

function RootLayout() {
    return (
        <main className="font-nunito">
            <Navbar/>
            <section className="max-w-screen-xl mx-auto p-4 flex flex-row h-screen pt-20 overflow-hidden ">
                <SideNav/>
                <div className="overflow-y-auto w-full">
                    <Outlet/>
                </div>
            </section>
        </main>
    )
}

export default RootLayout