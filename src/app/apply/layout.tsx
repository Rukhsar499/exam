import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Apply For Job',
    description: 'Apply For Job',
  }


export default function ApplyLayout({
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