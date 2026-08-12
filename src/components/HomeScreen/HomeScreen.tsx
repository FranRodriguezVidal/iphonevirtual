import { motion } from 'framer-motion'
import { DOCK_APPS } from '../../data/apps'
import { useDeviceTime } from '../../hooks/useDeviceTime'
import type { AppDefinition } from '../../types'
import { AppIcon } from '../AppIcon/AppIcon'
import { Dock } from '../Dock/Dock'
import { DynamicIsland } from '../DynamicIsland/DynamicIsland'
import { StatusBar } from '../StatusBar/StatusBar'
import './homeScreen.scss'

type HomeScreenProps = {
  apps: AppDefinition[]
  onOpenApp: (appId: AppDefinition['id']) => void
}

export function HomeScreen({ apps, onOpenApp }: HomeScreenProps) {
  const { timeLabel } = useDeviceTime()

  return (
    <motion.div
      className="homeScreen"
      initial={{ opacity: 0, scale: 1.08, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 12 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="homeScreen__bg" aria-hidden="true" />

      <div className="homeScreen__topBar">
        <DynamicIsland />
        <StatusBar showDynamicIsland timeLabel={timeLabel} />
      </div>

      <div className="homeScreen__grid" aria-label="Applications list">
        {apps.map((app) => (
          <AppIcon key={app.id} app={app} onClick={() => onOpenApp(app.id)} />
        ))}
      </div>

      <Dock apps={DOCK_APPS} onOpenApp={onOpenApp} />
    </motion.div>
  )
}
