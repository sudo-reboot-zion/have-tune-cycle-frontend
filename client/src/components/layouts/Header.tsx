'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';
import { musicNavLinks } from '@/lib/data';

import Logo from '../../../public/images/entire_logo.svg'
import { CgMenuOreos} from "react-icons/cg";
import MenuDrawer from '../common/MenuDrawer';
import LoginForm from '../shared/Forms/LoginForm';
import RegisterForm from '../shared/Forms/RegisterForm';
import { useAuth } from '@/hooks/useAuth';

function Header() {
    const pathname = usePathname();

    const [open, setOpen] = useState<boolean>(false);
    const [activeModal, setActiveModal] = useState<'login' | 'signup' | null>(null);
    const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
    
    const closeModal = () => setActiveModal(null);
    const { isAuthenticated, user } = useAuth();

    console.log('user'+user)

    const handleOpenClose = () => {
        setOpen((prevState) => !prevState);
    }

    // const handleLogout = () => {
    //     logOut();
    //     setShowUserMenu(false);
    //     router.push('/');
    // }


    const getUserInitials = () => {
        if (!user) return 'U';
        const firstInitial = user.first_name?.charAt(0) || '';
        const lastInitial = user.last_name?.charAt(0) || '';
        return (firstInitial + lastInitial) || user.username?.charAt(0) || 'U';
    }

    // const getUserDisplayName = () => {
    //     if (!user) return 'User';
    //     if (user.first_name && user.last_name) {
    //         return `${user.first_name} ${user.last_name}`;
    //     }
    //     return user.username || 'User';
    // }

    return (
        <header className='w-full bg-[#0B0E1F] z-50 top-0 sticky border-red-300 border-b border-brand-rcc border-l-0 border-r-0 border-t-0'>
            <div className='max-w-[90%] mx-auto py-5 flex overflow-x-hidden lg:flex-row items-center justify-between gap-4'>
                
                <div className="flex items-start lg:items-center justify-start pl-4">
                    <Link href="/" className='absolute -left-[7rem] top-[0.2rem] lg:-top-[2.3rem] md:left-0'>
                        <Image 
                            src={Logo} 
                            className='h-20 lg:h-44 w-80 lg:scale-100 object-contain invert' 
                            alt="TuneCycle Logo" 
                            width={100} 
                            height={100}
                            priority
                        />
                    </Link>
                </div>

                <nav className='hidden lg:flex flex-wrap justify-center gap-10 text-white'>
                    {musicNavLinks.map(({ name, href }, index) => (
                        <Link
                            href={href}
                            key={index}
                            className={clsx(
                                'text-[18px] font-outfit capitalize transition-colors hover:text-[#03FCFD]',
                                { 'text-[#03FCFD] font-bold': pathname === href }
                            )}
                        >
                            {name}
                        </Link>
                    ))}
                </nav>

                <div className='hidden lg:flex-shrink-0 lg:flex items-center gap-4'>

                      {isAuthenticated ? (
                        <div className='relative'>
                                <Link href={user?.role==='artist'?  "/dashboard/profile" : "/for_buyers/dashboard"} className='w-10 h-10 rounded-full bg-gradient-to-br from-[#03FCFD] to-[#6366f1] flex items-center justify-center text-primaryColor font-bold text-sm shadow-lg'>
                                    {getUserInitials()}
                                </Link>

                        </div>
                      ) : (
                                                <div className='flex items-center gap-3'>
                            <button 
                                className='px-4 py-2 text-white font-outfit border border-[#03FCFD] rounded-md hover:bg-[#03FCFD]/10 transition-all duration-200' 
                                onClick={() => setActiveModal('login')}
                            >
                                Sign In
                            </button>
                            <button 
                                className='custom-btn-gradient px-4 py-2 text-primaryColor hover:text-white rounded-md capitalize hover:shadow-lg transition-all duration-200 font-outfit' 
                                onClick={() => setActiveModal('signup')}
                            >
                                Sign Up
                            </button>
                        </div>
                      ) }

                </div>


                <div className='lg:hidden'>
                    <button onClick={handleOpenClose} className='text-white text-2xl'>
                        <CgMenuOreos />
                    </button>
                </div>
            </div>

            {open && <MenuDrawer/>}

            {/* Auth Modals */}
            {activeModal && (
                <div 
                    className='fixed inset-0 w-full bg-primaryColor/10 backdrop-blur-lg flex items-center justify-center z-[100]'
                    onClick={closeModal}
                >
                    <div onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                        <div className='max-w-4xl mx-auto'>
                            {activeModal === 'login' ? 
                                <LoginForm closeModal={closeModal} setActiveModal={setActiveModal} /> : 
                                <RegisterForm closeModal={closeModal} setActiveModal={setActiveModal} />
                            }
                        </div>
                    </div>
                </div>
            )}

            {/* Click Outside to Close User Menu */}
            {showUserMenu && (
                <div 
                    className='fixed inset-0 z-30'
                    onClick={() => setShowUserMenu(false)}
                />
            )}
        </header>
    );
}

export default Header