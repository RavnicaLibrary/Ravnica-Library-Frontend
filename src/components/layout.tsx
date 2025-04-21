import React from "react"
import Navbar from "./navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
          {children}
      </main>
    </div>
  )
}

export default Layout