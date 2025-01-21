"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";

import {routes} from "@/shared/config";


export const Navbar = () => {

    const pathname = usePathname();

    return (
        <nav>
            <ul className="flex gap-4">
                {routes.map((route, i) => (
                    <li key={route.path}>
                        <Link href={route.path} className={`${pathname === route.path ? 'text-rose-500' : ''}`}>{route.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
};