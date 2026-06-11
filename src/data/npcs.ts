import type { Order } from '@/types'

// Maps a resource item to the NPC who requests orders involving it.
// Orders are checked against their resources first, then their actions;
// the first match with a known NPC determines the order's requester.
const RESOURCE_NPC: Record<string, string> = {
  'Industrial Bits':   'Meepa Torani',
  'Silicate Glass':    'Meepa Torani',
  'Silicate Bricks':   'Meepa Torani',
  'Silicate Concrete': 'Meepa Torani',
  'Hydracite':         'The Twins',
  'Scorchium':         'The Twins',
  'Worthless Rocks':   'Gerbo',
  'Vespium':           'Gerbo',
  'Jade':              'Minalima Lin',
  'Vespium Plates':    'Puri Puri',
  'Vespium Rods':      'Puri Puri',
  'Vespium Frames':    'Puri Puri',
  'Vespium Wire':      'Gama Kamalon',
  'Low Grade Gel':     'Clank',
}

// Vespium Ingots is split between two NPCs: Tank Timmerson handles orders
// for pure Vespium Ingots, while Puri Puri handles orders that combine
// Ingots with other Vespium products (Plates, Rods, Frames).
const VESPIUM_PRODUCTS = new Set(['Vespium Plates', 'Vespium Rods', 'Vespium Frames'])

// Orders that ask for nothing but Industrial Bits or Silicate Concrete
// (no other resources) are handled by Clank instead of Meepa Torani.
const BULK_RESOURCES = new Set(['Industrial Bits', 'Silicate Concrete'])

const ACTION_NPC: Record<string, string> = {
  endurance_synthesizer_potion: 'Eidelaine Eeko',
  chad_infusion: 'The Entity',
}

// Headshot portrait art per NPC, shown on order cards.
export const NPC_IMAGES: Record<string, string> = {
  'Meepa Torani':    '/npcs/meepa-torani.webp',
  'Eidelaine Eeko':  '/npcs/eidelaine-eeko.webp',
  'Tank Timmerson':  '/npcs/tank-timmerson.webp',
  'Puri Puri':       '/npcs/puri-puri.webp',
  'The Twins':       '/npcs/the-twins.webp',
  'Gerbo':           '/npcs/gerbo.webp',
  'Minalima Lin':    '/npcs/minalima-lin.webp',
  'Gama Kamalon':    '/npcs/gama-kamalon.webp',
  'Clank':           '/npcs/clank.webp',
  'The Entity':      '/npcs/the-entity.webp',
  'Donathan Creel':  '/npcs/donathan-creel.webp',
}

export function getOrderNpc(order: Order): string | undefined {
  if (order.npc) return order.npc

  for (const r of order.resources) {
    if (r.item === 'Vespium Ingots') {
      const hasOtherVespiumProduct = order.resources.some(o => VESPIUM_PRODUCTS.has(o.item))
      return hasOtherVespiumProduct ? 'Puri Puri' : 'Tank Timmerson'
    }
    if (BULK_RESOURCES.has(r.item)) {
      return order.resources.length === 1 ? 'Clank' : 'Meepa Torani'
    }
    const npc = RESOURCE_NPC[r.item]
    if (npc) return npc
  }
  for (const a of order.actions) {
    const npc = ACTION_NPC[a.type]
    if (npc) return npc
  }
  return undefined
}
