import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Notice',
    description: 'Notice',
  }


export default function NoticeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
          {children}
          
        </>
    )
}