import React from 'react'
import { Navbar } from './components/layout/Navbar'
import { HomePage } from './pages/HomePage'
import { ReportsPage } from './pages/ReportsPage'
import { TodoPage } from './pages/TodoPage'
import { DashboardPage } from './pages/DashboardPage'
import { useRouter } from './router/useRouter'
import { useTelemetrySim } from './hooks/useTelemetrySim'

export const App: React.FC = () => {
  const { currentPath, navigate } = useRouter()
  const { telemetry, setTelemetry } = useTelemetrySim(true)

  const renderContent = () => {
    switch (currentPath) {
      case '/informes':
      case '/informe':
        return <ReportsPage />
      case '/todo':
      case '/tareas':
        return <TodoPage />
      case '/dashboard':
      case '/telemetria':
        return <DashboardPage telemetry={telemetry} setTelemetry={setTelemetry} />
      case '/':
      default:
        return <HomePage navigate={navigate} />
    }
  }

  return (
    <div className="min-h-screen bg-[#090a0d] text-slate-100 flex flex-col font-sans selection:bg-[#c87d55]/30 selection:text-[#f3cfb3]">
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
