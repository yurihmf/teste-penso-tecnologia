import React from 'react'

const Header = () => {
  return (
    <header className="flex container w-full m-auto h-20 items-center justify-center lg:justify-start gap-8">
        <img src="logo-penso.svg" alt="Logo marcar Penso Tecnologia" />
        <h1 className="hidden lg:block from-slate-700 font-semibold text-xl">Test Penso Tecnologia 📋</h1>
    </header>
  )
}

export default Header