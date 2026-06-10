export interface ResourceRequirement {
  item: string
  quantityDisplay: string | null
}

export interface ActionRequirement {
  type: 'chad_infusion' | 'endurance_synthesizer_potion'
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
}

export interface PlayerStats {
  tiLevel: string             // TI level = Chad Infusions performed
  potionsCrafted: string      // Endurance Synthesizer Potions crafted
  resources: Record<string, string>  // item name → all-time gained (stored as string)
  totalOrdersCompleted: string  // in-game count used by the inference engine
}

export const DEFAULT_STATS: PlayerStats = {
  tiLevel: '',
  potionsCrafted: '',
  resources: {},
  totalOrdersCompleted: '',
}

// ordered from largest to avoid false prefix matches
export const ALL_RESOURCE_NAMES: readonly string[] = [
  'Jade',
  'Vespium',
  'Vespium Ingots',
  'Vespium Plates',
  'Vespium Rods',
  'Vespium Frames',
  'Vespium Wire',
  'Silicate Glass',
  'Silicate Bricks',
  'Silicate Concrete',
  'Silicate Frames',
  'Industrial Bits',
  'Tokenium Canisters',
  'Hydracite',
  'Scorchium',
  'Low Grade Gel',
  'Silicate Gel',
  'Worthless Rocks',
]

export type OrderStatus = 'completed' | 'available' | 'needs_resources' | 'locked'

export type StatusFilter = 'all' | 'recommended' | 'available' | 'needs_resources' | 'locked' | 'completed'

export type ResourceFilter =
  | 'all'
  | 'jade'
  | 'vespium'
  | 'silicate'
  | 'industrial'
  | 'hydracite'
  | 'scorchium'
  | 'gel'
  | 'rocks'
  | 'actions'
