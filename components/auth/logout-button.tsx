"use client"

import { logout } from "@/actions/logout"

export const LogoutButton = ({ children, className }: { children: React.ReactNode, className?: string}) => {
    const onClick = () => {
        logout()
    }

    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    )
}