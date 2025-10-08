import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Result',
    description: 'Result',
  }


export default function ResultLayout({
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