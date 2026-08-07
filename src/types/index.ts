export interface ResourceRequirement {
  item: string
  quantityDisplay: string | null
}

export interface ActionRequirement {
  type: 'chad_infusion' | 'chad_level' | 'endurance_synthesizer_potion'
  quantity: number
}

export interface Order {
  id: number
  minOrders: number
  requiredOrderIds: number[]
  resources: ResourceRequirement[]
  actions: ActionRequirement[]
  // What's needed to finish (not unlock) the order, once available. Omitted where unknown.
  completion?: {
    resources: ResourceRequirement[]
    actions: ActionRequirement[]
  }
  // What completing the order grants. Omitted where unknown.
  rewards?: string[]
  // Confirmed requesting NPC, overriding the resource-based inference. Omitted where unconfirmed.
  npc?: string
}

export interface PlayerStats {
  tiLevel: string             // TI level = Chad Infusions performed
  chadLevel: string           // Chad Level (separate from TI count)
  potionsCrafted: string      // Endurance Synthesizer Potions crafted
  resources: Record<string, string>  // item name → all-time gained (stored as string)
  totalOrdersCompleted: string  // in-game count used by the inference engine
}

export const DEFAULT_STATS: PlayerStats = {
  tiLevel: '',
  chadLevel: '',
  potionsCrafted: '',
  resources: {},
  totalOrdersCompleted: '',
}

// ordered from largest to avoid false prefix matches
export const ALL_RESOURCE_NAMES: readonly string[] = [
  'Jade',
  'Vespium',
  'Vespium Ingot',
  'Vespium Plate',
  'Vespium Rod',
  'Vespium Frame',
  'Vespium Wire',
  'Silicate Glass',
  'Silicate Brick',
  'Silicate Concrete',
  'Reinforced Concrete',
  'Battery',
  'Industrial Bit',
  'Tokenium Canister',
  'Hydracite',
  'Scorchium',
  'Low Grade Gel',
  'Worthless Rock',
]

export type OrderStatus = 'completed' | 'available' | 'needs_resources' | 'locked'

export type StatusFilter = 'all' | 'recommended' | 'in_progress' | 'available' | 'needs_resources' | 'locked' | 'completed'

export type ResourceFilter =
  | 'all'
  | 'ether'
  | 'jade'
  | 'vespium'
  | 'silicate'
  | 'industrial'
  | 'hydracite'
  | 'scorchium'
  | 'gel'
  | 'rocks'
  | 'actions'

export type RewardFilter =
  | 'all'
  | 'ether'
  | 'credits'
  | 'exp'
  | 'core'
  | 'crafting_speed'
  | 'vespium'
  | 'jade'
  | 'worthless_rock'
  | 'tokenium'
  | 'craftable_sell_price'
  | 'rig'
  | 'crafter'
  | 'max_stamina'
  | 'attribute_points'

// 'all', or an NPC name as returned by getOrderNpc
export type CharacterFilter = string
