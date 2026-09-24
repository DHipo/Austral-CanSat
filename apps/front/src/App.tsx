import React from 'react'
import { Navbar } from './components/layout/Navbar'
import { HomePage } from './pages/HomePage'
import { ReportsPage } from './pages/ReportsPage'
import { TodoPage } from './pages/TodoPage'
import { useRouter } from './router/useRouter'

export const App: React.FC = () => {
  const { currentPath, navigate } = useRouter()

  const renderContent = () => {
    switch (currentPath) {
      case '/informes':
      case '/informe':
        return <ReportsPage />
      case '/todo':
      case '/tareas':
        return <TodoPage />
      case '/':
      default:
        return <HomePage navigate={navigate} />
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] flex flex-col font-sans selection:bg-white/20 selection:text-white">
      {/* Top Persistent Navbar */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Main Routed Content */}
      <main className="flex-grow">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
