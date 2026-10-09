import type { Order } from '@/types'

// Maps a resource item to the NPC who requests orders involving it.
// Orders are checked against their resources first, then their actions;
// the first match with a known NPC determines the order's requester.
const RESOURCE_NPC: Record<string, string> = {
  'Industrial Bit':    'Meepa Torani',
  'Silicate Glass':      'Meepa Torani',
  'Silicate Brick':      'Meepa Torani',
  'Silicate Concrete':   'Meepa Torani',
  'Reinforced Concrete': 'Meepa Torani',
  'Battery':             'Meepa Torani',
  'Hydracite':         'The Twins',
  'Scorchium':         'The Twins',
  'Worthless Rock':    'Gerbo',
  'Vespium':           'Gerbo',
  'Jade':              'Minalima Lin',
  'Vespium Plate':     'Puri Puri',
  'Vespium Rod':       'Puri Puri',
  'Vespium Frame':     'Puri Puri',
  'Vespium Wire':      'Gama Kamalon',
  'Low Grade Gel':     'Clank',
}

// Vespium Ingot is split between two NPCs: Tank Timmerson handles orders
// for pure Vespium Ingot, while Puri Puri handles orders that combine
// Ingot with other Vespium products (Plate, Rod, Frame).
const VESPIUM_PRODUCTS = new Set(['Vespium Plate', 'Vespium Rod', 'Vespium Frame'])

// Orders that ask for nothing but Industrial Bit or Silicate Concrete
// (no other resources) are handled by Clank instead of Meepa Torani.
const BULK_RESOURCES = new Set(['Industrial Bit', 'Silicate Concrete'])

const ACTION_NPC: Record<string, string> = {
  endurance_synthesizer_potion: 'Eidelaine Eeko',
  chad_infusion: 'The Ether Hoarder',
}

// Headshot portrait art per NPC, shown on order cards.
export const NPC_IMAGES: Record<string, string> = {
  'Meepa Torani':      '/npcs/meepa-torani.webp',
  'Eidelaine Eeko':    '/npcs/eidelaine-eeko.webp',
  'Tank Timmerson':    '/npcs/tank-timmerson.webp',
  'Puri Puri':         '/npcs/puri-puri.webp',
  'The Twins':         '/npcs/the-twins.webp',
  'Gerbo':             '/npcs/gerbo.webp',
  'Minalima Lin':      '/npcs/minalima-lin.webp',
  'Gama Kamalon':      '/npcs/gama-kamalon.webp',
  'Clank':             '/npcs/clank.webp',
  'The Ether Hoarder': '/npcs/the-entity.webp',
  'Donathan Creel':    '/npcs/donathan-creel.webp',
  'Samos Sula':        '/npcs/samos-sula.webp',
  'Bhramari':          '/npcs/bhramari.webp',
  'Nyra Voss':         '/npcs/nyra-voss.webp',
  'Wrecket':           '/npcs/wrecket.webp',
  'Bertha':            '/npcs/bertha.webp',
  'Caylris En Divalone': '/npcs/caylris-en-divalone.webp',
}

export function getOrderNpc(order: Order): string | undefined {
  if (order.npc) return order.npc

  for (const r of order.resources) {
    if (r.item === 'Vespium Ingot') {
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
