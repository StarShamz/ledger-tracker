import type { ActionRequirement, PlayerStats } from '@/types'

/** The player stat an action requirement is checked against. */
export function actionPlayerValue(a: ActionRequirement, stats: PlayerStats): string | undefined {
  switch (a.type) {
    case 'chad_infusion':        return stats.tiLevel
    case 'chad_level':           return stats.chadLevel
    case 'post_update_infusion': return stats.infusionsSinceUpdate
    default:                     return stats.potionsCrafted
  }
}

/** Name of the Stats panel field an action requirement reads from. */
export const ACTION_STAT_LABEL: Record<ActionRequirement['type'], string> = {
  chad_infusion:                'Infusions Done (TIs)',
  chad_level:                   'Chad Level',
  endurance_synthesizer_potion: 'Potions Crafted',
  post_update_infusion:         'Infusions Since v1.2',
}
