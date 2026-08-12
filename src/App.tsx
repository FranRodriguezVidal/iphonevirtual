import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { APP_COMPONENTS } from './apps'
import { AppWindow } from './components/AppWindow/AppWindow'
import { HomeScreen } from './components/HomeScreen/HomeScreen'
import { LockScreen } from './components/LockScreen/LockScreen'
import { APP_CATALOG } from './data/apps'
import type { AppDefinition, ScreenState } from './types'
import './App.scss'

function App() {
  const [screen, setScreen] = useState<ScreenState>('LOCK_SCREEN')
  const [activeApp, setActiveApp] = useState<AppDefinition['id'] | null>(null)

  const apps = useMemo(() => APP_CATALOG.filter((app) => app.enabled), [])
  const activeAppData = useMemo(
    () => apps.find((app) => app.id === activeApp) ?? null,
    [activeApp, apps],
  )

  const openApp = (appId: AppDefinition['id']) => {
    setActiveApp(appId)
    setScreen('APP')
  }

  const closeApp = () => {
    setActiveApp(null)
    setScreen('HOME_SCREEN')
  }

  const unlock = () => {
    setScreen('HOME_SCREEN')
  }

  return (
    <div className="deviceShell">
      <div className="deviceScreen">
        <AnimatePresence mode="wait">
          {screen === 'LOCK_SCREEN' && <LockScreen key="lock" onUnlock={unlock} />}

          {screen === 'HOME_SCREEN' && (
            <HomeScreen key="home" apps={apps} onOpenApp={openApp} />
          )}

          {screen === 'APP' && activeAppData && (
            <motion.div
              key={activeAppData.id}
              className="appLayer"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <AppWindow app={activeAppData} onClose={closeApp}>
                {(() => {
                  const AppComponent = APP_COMPONENTS[activeAppData.id]
                  return <AppComponent app={activeAppData} />
                })()}
              </AppWindow>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
