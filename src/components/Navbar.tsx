import Image from "next/image";

export const Navbar = () => {
    
    const menus = [
        {
            name: 'Dashboard',
            href: '/',
            current: true
        },
        {
            name: 'Tarefas',
            href: '/tasks',
            current: false
        },
        {
            name: 'Tags',
            href: '/tags',
            current: false
        }
    ]

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="bg-gradient-radial bg-gray-300">
                <div className="flex items-center justify-between h-16 px-4 sm:px-0 mx-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Image className="h-8 w-8"
                                   src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"
                                   width={800}
                                   height={500}/>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {menus.map((menu) => (
                                    <a
                                        key={menu.name}
                                        href={menu.href}
                                        className={`${
                                            menu.current ? 'bg-gray-900 text-white' : 'text-gray-900 hover:bg-gray-700 hover:text-white'
                                        } px-3 py-2 rounded-md text-sm font-medium`}
                                    >{menu.name}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
