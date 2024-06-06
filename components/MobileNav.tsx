'use client'
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { SignedOut } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const MobileNav = () => {
  const { signOut } = useClerk();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image className="cursor-pointer" src='/icons/hamburger.svg' width={30} height= {30} alt="hamburger icon" />
        </SheetTrigger>
        <SheetContent side={"left"} className="border-none bg-black-1">
        <Link href='/' className='flex cursor-pointer items-center gap-1 pb-10 pl-4'>
                <Image src='/icons/logo.svg' alt='' width={23} height={27}/>
                <h1 className="text-24 font-extrabold text-white-1 ml-2">Podcastr</h1>
        </Link>
        <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <nav className="flex h-full flex-col gap-6 text-white-1">
            {sidebarLinks.map(({route, label, imgURL}) => {
                const isActive = pathname === route || pathname.startsWith(`${route}/`)
                return <SheetClose asChild key={route}><Link className={cn('flex gap-3 items-center py-4 max-lg:px-4 justify-start', {
                    'bg-nav-focus border-r-4 border-orange-1': isActive,
                })} href={route}>
                <Image src={imgURL} alt='label' width={24} height={24}/>
                <p>{label}</p>
                </Link>
                </SheetClose>
            })}
            <SignedOut>
            <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
                <Button className='text-16 w-full bg-orange-1 font-extrabold' asChild>
                    <Link href="/sign-in" >Sign In</Link>
                </Button>
            </div>    
        </SignedOut>
        <SignedIn>
            <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
                <Button className='text-16 w-full bg-orange-1 font-extrabold' onClick={() => {signOut(()=> router.push('/'))}}>
                    Logout
                </Button>
            </div>    
        </SignedIn>
            </nav>
          </SheetClose>
        </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
