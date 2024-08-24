import { Outlet } from "react-router-dom"
import { fetchUser, Navbar, SideNav } from "../components/links"
import { useEffect, useState } from "react"

function RootLayout() {
    const [isDarkMode, setDarkMode] = useState<boolean>(false);

    const { data, isLoading, isError } = fetchUser();

    const toggleDarkMode = ():void =>{
        // Toggle isDark state and update localStorage
        const newIsDark:boolean = !isDarkMode;
        setDarkMode(newIsDark);
        localStorage.setItem('isDark', JSON.stringify(newIsDark));
    }

    useEffect(()=>{
        const storedDarkMode: string | null = localStorage.getItem('isDark');
        const parsedDarkMode: boolean = storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;
        setDarkMode(parsedDarkMode)
    },[])

    return (
        <div className={`${isDarkMode ? "dark":""} font-nunito`}>
            <main className="bg-white dark:bg-black">
                <Navbar 
                    toggleDarkMode={toggleDarkMode} 
                    isDarkMode={isDarkMode}
                    isError={isError}
                    isLoading={isLoading}
                    data={data}
                />
                <section className="max-w-screen-xl mx-auto p-4 flex flex-row h-screen pt-20 overflow-hidden bg-white dark:bg-black">
                    <SideNav
                        isError={isError}
                        isLoading={isLoading}
                        data={data}
                    />
                    <div className="overflow-y-auto w-full">
                        <Outlet/>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default RootLayout