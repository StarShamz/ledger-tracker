import type { Order } from '@/types'

export const orders: Order[] = [
  // 1
  {
    id: 1,
    minOrders: 0,
    requiredOrderIds: [],
    resources: [],
    actions: [],
    npc: 'Gerbo',
    completion: {
      resources: [
        { item: 'Worthless Rock', quantityDisplay: '100.00k' },
        { item: 'Vespium', quantityDisplay: '200' },
      ],
      actions: [],
    },
    rewards: ['+1 Attribute Point'],
  },
  // 2
  {
    id: 2,
    minOrders: 0,
    requiredOrderIds: [],
    resources: [],
    actions: [],
    npc: 'Donathan Creel',
    completion: {
      resources: [{ item: 'Industrial Bit', quantityDisplay: '325' }],
      actions: [],
    },
    rewards: ['x1.05 Credits'],
  },
  // 3
  {
    id: 3,
    minOrders: 0,
    requiredOrderIds: [],
    resources: [],
    actions: [],
    npc: 'Tank Timmerson',
    completion: {
      resources: [{ item: 'Silicate Concrete', quantityDisplay: '250' }],
      actions: [],
    },
    rewards: ['x1.04 Worthless Rock', 'x1.08 EXP'],
  },
  // 4
  {
    id: 4,
    minOrders: 1,
    requiredOrderIds: [],
    resources: [],
    actions: [],
    npc: 'Minalima Lin',
    completion: {
      resources: [{ item: 'Jade', quantityDisplay: '500' }],
      actions: [],
    },
    rewards: ['+3 Core'],
  },
  // 5
  {
    id: 5,
    minOrders: 1,
    requiredOrderIds: [],
    resources: [],
    actions: [],
    npc: 'Gama Kamalon',
    completion: {
      resources: [
        { item: 'Industrial Bit', quantityDisplay: '600' },
        { item: 'Vespium Rod', quantityDisplay: '80' },
      ],
      actions: [],
    },
    rewards: ['+1 Core', 'x1.03 Tokenium Canister'],
  },
  // 6
  {
    id: 6,
    minOrders: 3,
    requiredOrderIds: [],
    resources: [{ item: 'Silicate Glass', quantityDisplay: null }],
    actions: [],
    npc: 'Clank',
    completion: {
      resources: [{ item: 'Vespium Frame', quantityDisplay: '90' }],
      actions: [],
    },
    rewards: ['x1.07 EXP', 'x1.04 Jade', 'x1.04 Tokenium'],
  },
  // 7
  {
    id: 7,
    minOrders: 4,
    requiredOrderIds: [],
    resources: [],
    actions: [],
    npc: 'Tank Timmerson',
    completion: {
      resources: [{ item: 'Vespium Ingot', quantityDisplay: '100' }],
      actions: [],
    },
    rewards: ['x1.1 Vespium', '+1 Core'],
  },
  // 8
  {
    id: 8,
    minOrders: 5,
    requiredOrderIds: [1],
    resources: [{ item: 'Vespium', quantityDisplay: '500' }],
    actions: [],
    npc: 'Gerbo',
    completion: {
      resources: [
        { item: 'Worthless Rock', quantityDisplay: '100.00m' },
        { item: 'Vespium', quantityDisplay: '4000' },
      ],
      actions: [],
    },
    rewards: ['+2 Core', 'x1.12 EXP', 'x1.05 Worthless Rock'],
  },
  // 9
  {
    id: 9,
    minOrders: 0,
    requiredOrderIds: [4],
    resources: [{ item: 'Jade', quantityDisplay: '700' }],
    actions: [],
    npc: 'Minalima Lin',
    completion: {
      resources: [{ item: 'Jade', quantityDisplay: '1750' }],
      actions: [],
    },
    rewards: ['+4% Crafting Speed', '+1% Crafter Duplication Chance'],
  },
  // 10
  {
    id: 10,
    minOrders: 5,
    requiredOrderIds: [2],
    resources: [{ item: 'Silicate Glass', quantityDisplay: null }],
    actions: [],
    npc: 'Donathan Creel',
    completion: {
      resources: [
        { item: 'Vespium Frame', quantityDisplay: '60' },
        { item: 'Vespium', quantityDisplay: '5000' },
        { item: 'Vespium Plate', quantityDisplay: '300' },
      ],
      actions: [],
    },
    rewards: ['x1.16 Credits', '+2 Core'],
  },
  // 11
  {
    id: 11,
    minOrders: 6,
    requiredOrderIds: [],
    resources: [
      { item: 'Vespium Ingot', quantityDisplay: '334' },
      { item: 'Vespium Plate', quantityDisplay: '334' },
      { item: 'Vespium Rod', quantityDisplay: '334' },
    ],
    actions: [{ type: 'chad_infusion', quantity: 5 }],
    npc: 'Puri Puri',
    completion: {
      resources: [
        { item: 'Vespium Ingot', quantityDisplay: '333' },
        { item: 'Vespium Plate', quantityDisplay: '333' },
        { item: 'Vespium Rod', quantityDisplay: '333' },
      ],
      actions: [],
    },
    rewards: ['x1.12 Vespium', '+3% Crafting Speed'],
  },
  // 12
  {
    id: 12,
    minOrders: 7,
    requiredOrderIds: [8],
    resources: [{ item: 'Vespium', quantityDisplay: '7,500' }],
    actions: [],
    completion: {
      resources: [{ item: 'Vespium', quantityDisplay: '20.00k' }],
      actions: [],
    },
    rewards: ['x1.5 EXP'],
  },
  // 13
  {
    id: 13,
    minOrders: 8,
    requiredOrderIds: [7],
    resources: [],
    actions: [],
    npc: 'Tank Timmerson',
    completion: {
      resources: [{ item: 'Vespium Rod', quantityDisplay: '1000' }],
      actions: [],
    },
    rewards: ['+4 Core', '+5 Ether'],
  },
  // 14
  {
    id: 14,
    minOrders: 8,
    requiredOrderIds: [9],
    resources: [{ item: 'Jade', quantityDisplay: '3,000' }],
    actions: [],
    npc: 'Minalima Lin',
    completion: {
      resources: [{ item: 'Jade', quantityDisplay: '7500' }],
      actions: [],
    },
    rewards: ['+1 Attribute Point', 'x1.05 Jade'],
  },
  // 15
  {
    id: 15,
    minOrders: 8,
    requiredOrderIds: [5],
    resources: [
      { item: 'Tokenium Canister', quantityDisplay: '300' },
      { item: 'Silicate Concrete', quantityDisplay: '10,000' },
    ],
    actions: [],
    npc: 'Gama Kamalon',
    completion: {
      resources: [
        { item: 'Silicate Concrete', quantityDisplay: '6250' },
        { item: 'Vespium Plate', quantityDisplay: '1350' },
      ],
      actions: [],
    },
    rewards: ['+2 Core', 'x1.1 Tokenium', 'x1.05 Tokenium Canister'],
  },
  // 16
  {
    id: 16,
    minOrders: 8,
    requiredOrderIds: [6],
    resources: [{ item: 'Industrial Bit', quantityDisplay: '10,000' }],
    actions: [],
    completion: {
      resources: [{ item: 'Industrial Bit', quantityDisplay: '15.00k' }],
      actions: [],
    },
    rewards: ['+50 Ether', 'x1.1 Credits'],
  },
  // 17
  {
    id: 17,
    minOrders: 8,
    requiredOrderIds: [11],
    resources: [],
    actions: [],
    npc: 'Puri Puri',
    completion: {
      resources: [
        { item: 'Vespium Ingot', quantityDisplay: '1111' },
        { item: 'Vespium Plate', quantityDisplay: '1111' },
        { item: 'Vespium Rod', quantityDisplay: '1111' },
      ],
      actions: [],
    },
    rewards: ['x1.22 Vespium', '+4% Crafting Speed'],
  },
  // 18
  {
    id: 18,
    minOrders: 9,
    requiredOrderIds: [14],
    resources: [{ item: 'Jade', quantityDisplay: '8,000' }],
    actions: [],
    npc: 'Minalima Lin',
    completion: {
      resources: [{ item: 'Jade', quantityDisplay: '20.00k' }],
      actions: [],
    },
    rewards: ['x1.12 Jade', '+1% Crafter Duplication Chance'],
  },
  // 19
  {
    id: 19,
    minOrders: 10,
    requiredOrderIds: [],
    resources: [{ item: 'Silicate Brick', quantityDisplay: null }],
    actions: [],
    npc: 'Meepa Torani',
    completion: {
      resources: [{ item: 'Silicate Brick', quantityDisplay: '350' }],
      actions: [],
    },
    rewards: ['x1.13 EXP', 'x1.13 Credits', '+1 Core'],
  },
  // 20
  {
    id: 20,
    minOrders: 11,
    requiredOrderIds: [],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 6 }],
    npc: 'The Ether Hoarder',
    completion: {
      resources: [{ item: 'Ether', quantityDisplay: '165' }],
      actions: [],
    },
    rewards: ['+7 Core'],
  },
  // 21
  {
    id: 21,
    minOrders: 15,
    requiredOrderIds: [18],
    resources: [{ item: 'Jade', quantityDisplay: '20,000' }],
    actions: [],
    npc: 'Minalima Lin',
    completion: {
      resources: [{ item: 'Jade', quantityDisplay: '87.50k' }],
      actions: [],
    },
    rewards: ['x1.06 Jade', 'x1.06 Credits', 'x1.06 Worthless Rock'],
  },
  // 22
  {
    id: 22,
    minOrders: 16,
    requiredOrderIds: [12],
    resources: [{ item: 'Vespium', quantityDisplay: '40,000' }],
    actions: [],
    completion: {
      resources: [{ item: 'Vespium', quantityDisplay: '185.00k' }],
      actions: [],
    },
    rewards: ['x1.06 EXP', 'x1.03 Worthless Rock', 'x1.05 Jade'],
  },
  // 23
  {
    id: 23,
    minOrders: 17,
    requiredOrderIds: [10],
    resources: [
      { item: 'Silicate Glass', quantityDisplay: '25' },
      { item: 'Silicate Brick', quantityDisplay: '25' },
    ],
    actions: [],
    npc: 'Donathan Creel',
    completion: {
      resources: [
        { item: 'Silicate Glass', quantityDisplay: '600' },
        { item: 'Silicate Brick', quantityDisplay: '550' },
      ],
      actions: [],
    },
    rewards: ['x1.14 Credits', '+3 Core'],
  },
  // 24
  {
    id: 24,
    minOrders: 17,
    requiredOrderIds: [20],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 15 }],
    npc: 'The Ether Hoarder',
    completion: {
      resources: [{ item: 'Ether', quantityDisplay: '250' }],
      actions: [],
    },
    rewards: ['+1 Attribute Point'],
  },
  // 25
  {
    id: 25,
    minOrders: 17,
    requiredOrderIds: [15],
    resources: [{ item: 'Vespium Frame', quantityDisplay: null }],
    actions: [],
    npc: 'Gama Kamalon',
    completion: {
      resources: [
        { item: 'Silicate Glass', quantityDisplay: '1000' },
        { item: 'Silicate Brick', quantityDisplay: '850' },
        { item: 'Vespium Frame', quantityDisplay: '100' },
      ],
      actions: [],
    },
    rewards: ['x1.15 Tokenium', 'x1.16 Worthless Rock', 'x1.17 Vespium'],
  },
  // 26
  {
    id: 26,
    minOrders: 17,
    requiredOrderIds: [16],
    resources: [{ item: 'Silicate Concrete', quantityDisplay: '50,000' }],
    actions: [],
    npc: 'Clank',
    completion: {
      resources: [{ item: 'Silicate Concrete', quantityDisplay: '150.00k' }],
      actions: [],
    },
    rewards: ['+75 Ether', '+6 Core'],
  },
  // 27
  {
    id: 27,
    minOrders: 16,
    requiredOrderIds: [13],
    resources: [{ item: 'Vespium Ingot', quantityDisplay: '10,000' }],
    actions: [],
    npc: 'Tank Timmerson',
    completion: {
      resources: [{ item: 'Vespium Ingot', quantityDisplay: '50.00k' }],
      actions: [],
    },
    rewards: ['+5 Core', '+3% Crafting Speed'],
  },
  // 28
  {
    id: 28,
    minOrders: 19,
    requiredOrderIds: [],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 9 }],
    npc: 'Bhramari',
    completion: {
      resources: [{ item: 'Vespium Rod', quantityDisplay: '7500' }],
      actions: [],
    },
    rewards: ['+1% Crafter Duplication Chance', 'x1.06 Credits'],
  },
  // 29
  {
    id: 29,
    minOrders: 19,
    requiredOrderIds: [17],
    resources: [{ item: 'Vespium Frame', quantityDisplay: null }],
    actions: [],
    completion: {
      resources: [
        { item: 'Vespium Ingot', quantityDisplay: '8000' },
        { item: 'Vespium Plate', quantityDisplay: '5000' },
        { item: 'Vespium Rod', quantityDisplay: '5000' },
        { item: 'Vespium Frame', quantityDisplay: '80' },
      ],
      actions: [],
    },
    rewards: ['x1.32 Vespium', '+5% Crafting Speed', 'x1.35 EXP'],
  },
  // 30
  {
    id: 30,
    minOrders: 23,
    requiredOrderIds: [24],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 19 }],
    npc: 'The Ether Hoarder',
    completion: {
      resources: [{ item: 'Ether', quantityDisplay: '325' }],
      actions: [],
    },
    rewards: ['x1.62 EXP'],
  },
  // 31
  {
    id: 31,
    minOrders: 25,
    requiredOrderIds: [30],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 23 }],
    npc: 'The Ether Hoarder',
    completion: {
      resources: [{ item: 'Ether', quantityDisplay: '285' }],
      actions: [],
    },
    rewards: ['x1.18 Credits'],
  },
  // 32
  {
    id: 32,
    minOrders: 28,
    requiredOrderIds: [31],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 27 }],
    npc: 'The Ether Hoarder',
    completion: {
      resources: [{ item: 'Ether', quantityDisplay: '400' }],
      actions: [],
    },
    rewards: ['+1 Attribute Point'],
  },
  // 33
  {
    id: 33,
    minOrders: 25,
    requiredOrderIds: [22],
    resources: [
      { item: 'Vespium', quantityDisplay: '1 billion' },
      { item: 'Worthless Rock', quantityDisplay: '1 quadrillion' },
    ],
    actions: [],
    completion: {
      resources: [
        { item: 'Worthless Rock', quantityDisplay: '20.00qa' },
        { item: 'Vespium', quantityDisplay: '10.00b' },
      ],
      actions: [],
    },
    rewards: ['x1.05 EXP', 'x1.04 Worthless Rock', 'x1.05 Vespium'],
  },
  // 34
  {
    id: 34,
    minOrders: 26,
    requiredOrderIds: [],
    resources: [],
    actions: [{ type: 'endurance_synthesizer_potion', quantity: 1 }],
    npc: 'Eidelaine Eeko',
    completion: {
      resources: [],
      actions: [{ type: 'endurance_synthesizer_potion', quantity: 3 }],
    },
    rewards: ['x1.08 EXP', '+12 Max Stamina'],
  },
  // 35
  {
    id: 35,
    minOrders: 26,
    requiredOrderIds: [21],
    resources: [{ item: 'Jade', quantityDisplay: '200,000' }],
    actions: [],
    npc: 'Minalima Lin',
    completion: {
      resources: [{ item: 'Jade', quantityDisplay: '2.00m' }],
      actions: [],
    },
    rewards: ['x1.1 Craftable Sell Price', 'x1.02 Tokenium Canister'],
  },
  // 36
  {
    id: 36,
    minOrders: 27,
    requiredOrderIds: [35],
    resources: [{ item: 'Jade', quantityDisplay: '10 million' }],
    actions: [],
    npc: 'Minalima Lin',
    completion: {
      resources: [{ item: 'Jade', quantityDisplay: '50.00m' }],
      actions: [],
    },
    rewards: ['x1.15 Craftable Sell Price', 'x1.04 Jade', '+1 Core'],
  },
  // 37
  {
    id: 37,
    minOrders: 28,
    requiredOrderIds: [34],
    resources: [],
    actions: [{ type: 'endurance_synthesizer_potion', quantity: 4 }],
    completion: {
      resources: [{ item: 'Power Booster Potion', quantityDisplay: '5' }],
      actions: [],
    },
    rewards: ['x1.1 EXP', '+10 Ether'],
  },
  // 38
  {
    id: 38,
    minOrders: 29,
    requiredOrderIds: [13],
    resources: [{ item: 'Vespium Ingot', quantityDisplay: '60,000' }],
    actions: [],
    npc: 'Tank Timmerson',
    completion: {
      resources: [{ item: 'Silicate Brick', quantityDisplay: '125.00k' }],
      actions: [],
    },
    rewards: ['+2% Crafting Speed', 'x1.06 All Rig Yield'],
  },
  // 39
  {
    id: 39,
    minOrders: 30,
    requiredOrderIds: [26],
    resources: [{ item: 'Silicate Brick', quantityDisplay: '6,000' }],
    actions: [],
    npc: 'Clank',
    completion: {
      resources: [{ item: 'Silicate Brick', quantityDisplay: '3000' }],
      actions: [],
    },
    rewards: ['+2 Core', 'x1.08 Craftable Sell Price'],
  },
  // 40
  {
    id: 40,
    minOrders: 31,
    requiredOrderIds: [36],
    resources: [{ item: 'Jade', quantityDisplay: '100 million' }],
    actions: [],
    npc: 'Minalima Lin',
    completion: {
      resources: [{ item: 'Jade', quantityDisplay: '500.00m' }],
      actions: [],
    },
    rewards: ['x1.34 Craftable Sell Price'],
  },
  // 41
  {
    id: 41,
    minOrders: 32,
    requiredOrderIds: [37],
    resources: [],
    actions: [{ type: 'endurance_synthesizer_potion', quantity: 8 }],
    completion: {
      resources: [
        { item: 'Endurance Booster Potion', quantityDisplay: '3' },
        { item: 'Precision Booster Potion', quantityDisplay: '2' },
        { item: 'Detection Booster Potion', quantityDisplay: '2' },
        { item: 'Power Booster Potion', quantityDisplay: '1' },
      ],
      actions: [],
    },
    rewards: ['+14 Max Stamina', '+10 Ether'],
  },
  // 42
  {
    id: 42,
    minOrders: 33,
    requiredOrderIds: [32],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 31 }],
    npc: 'The Ether Hoarder',
    completion: {
      resources: [{ item: 'Ether', quantityDisplay: '222' }],
      actions: [],
    },
    rewards: ['+22 Max Stamina', 'x1.22 EXP'],
  },
  // 43
  {
    id: 43,
    minOrders: 34,
    requiredOrderIds: [19],
    resources: [
      { item: 'Silicate Brick', quantityDisplay: '6,000' },
      { item: 'Silicate Glass', quantityDisplay: '6,000' },
      { item: 'Silicate Concrete', quantityDisplay: '50,000' },
      { item: 'Industrial Bit', quantityDisplay: '50,000' },
    ],
    actions: [],
    npc: 'Meepa Torani',
    completion: {
      resources: [
        { item: 'Industrial Bit', quantityDisplay: '50.00k' },
        { item: 'Silicate Concrete', quantityDisplay: '37.50k' },
        { item: 'Silicate Glass', quantityDisplay: '2250' },
        { item: 'Silicate Concrete', quantityDisplay: '2000' },
      ],
      actions: [],
    },
    rewards: ['x1.13 Craftable Sell Price', 'x1.05 Credits'],
  },
  // 44
  {
    id: 44,
    minOrders: 35,
    requiredOrderIds: [23],
    resources: [
      { item: 'Industrial Bit', quantityDisplay: '200,000' },
      { item: 'Vespium Frame', quantityDisplay: '1,000' },
    ],
    actions: [],
    npc: 'Donathan Creel',
    completion: {
      resources: [
        { item: 'Industrial Bit', quantityDisplay: '1.00m' },
        { item: 'Vespium Frame', quantityDisplay: '10000' },
      ],
      actions: [],
    },
    rewards: ['x1.19 Craftable Sell Price', '+8 Core', '+8% Crafting Speed'],
  },
  // 45
  {
    id: 45,
    minOrders: 36,
    requiredOrderIds: [40],
    resources: [{ item: 'Jade', quantityDisplay: '1 billion' }],
    actions: [],
    npc: 'Minalima Lin',
    completion: {
      resources: [{ item: 'Jade', quantityDisplay: '5.00b' }],
      actions: [],
    },
    rewards: ['+3% Crafter Duplication Chance', '+20 Ether'],
  },
  // 46
  {
    id: 46,
    minOrders: 31,
    requiredOrderIds: [],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: null }],
    actions: [],
    npc: 'Samos Sula',
    completion: {
      resources: [{ item: 'Low Grade Gel', quantityDisplay: '50' }],
      actions: [],
    },
    rewards: ['x1.05 All Rig Yield', '+2% Rig Speed', '/1.5 Rig Cost'],
  },
  // 47
  {
    id: 47,
    minOrders: 38,
    requiredOrderIds: [44],
    resources: [
      { item: 'Industrial Bit', quantityDisplay: '400,000' },
      { item: 'Silicate Concrete', quantityDisplay: '400,000' },
    ],
    actions: [],
    npc: 'Donathan Creel',
    completion: {
      resources: [
        { item: 'Industrial Bit', quantityDisplay: '800.00k' },
        { item: 'Silicate Concrete', quantityDisplay: '800.00k' },
      ],
      actions: [],
    },
    rewards: ['x1.04 Craftable Sell Price', 'x1.04 Credits'],
  },
  // 48
  {
    id: 48,
    minOrders: 39,
    requiredOrderIds: [25],
    resources: [{ item: 'Vespium Frame', quantityDisplay: '1,500' }],
    actions: [],
    npc: 'Gama Kamalon',
    completion: {
      resources: [
        { item: 'Silicate Glass', quantityDisplay: '8000' },
        { item: 'Silicate Brick', quantityDisplay: '8000' },
        { item: 'Vespium Frame', quantityDisplay: '2250' },
      ],
      actions: [],
    },
    rewards: ['x1.08 Tokenium', 'x1.04 Tokenium Canister'],
  },
  // 49
  {
    id: 49,
    minOrders: 40,
    requiredOrderIds: [41],
    resources: [],
    actions: [{ type: 'endurance_synthesizer_potion', quantity: 14 }],
  },
  // 50
  {
    id: 50,
    minOrders: 41,
    requiredOrderIds: [45],
    resources: [{ item: 'Jade', quantityDisplay: '10 billion' }],
    actions: [],
    completion: {
      resources: [{ item: 'Jade', quantityDisplay: '20.00b' }],
      actions: [],
    },
    rewards: ['x1.1 Jade', 'x1.1 Vespium', 'x1.1 Tokenium'],
  },
  // 51
  {
    id: 51,
    minOrders: 42,
    requiredOrderIds: [42],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 35 }],
    completion: {
      resources: [{ item: 'Ether', quantityDisplay: '188' }],
      actions: [],
    },
    rewards: ['x1.12 EXP', 'x1.02 Tokenium', 'x1.02 Tokenium Canister'],
  },
  // 52
  {
    id: 52,
    minOrders: 49,
    requiredOrderIds: [51],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 39 }],
  },
  // 53
  {
    id: 53,
    minOrders: 42,
    requiredOrderIds: [29],
    resources: [
      { item: 'Vespium Frame', quantityDisplay: '1,000' },
      { item: 'Vespium Ingot', quantityDisplay: '50,000' },
      { item: 'Vespium Plate', quantityDisplay: '50,000' },
      { item: 'Vespium Rod', quantityDisplay: '50,000' },
    ],
    actions: [],
    npc: 'Puri Puri',
    completion: {
      resources: [
        { item: 'Vespium Ingot', quantityDisplay: '300.00k' },
        { item: 'Vespium Plate', quantityDisplay: '20.00k' },
        { item: 'Vespium Rod', quantityDisplay: '20.00k' },
        { item: 'Vespium Frame', quantityDisplay: '2500' },
      ],
      actions: [],
    },
    rewards: ['x1.15 Vespium', 'x1.15 EXP'],
  },
  // 54
  {
    id: 54,
    minOrders: 43,
    requiredOrderIds: [39],
    resources: [{ item: 'Industrial Bit', quantityDisplay: '4 million' }],
    actions: [],
    npc: 'Clank',
    completion: {
      resources: [{ item: 'Industrial Bit', quantityDisplay: '10.00m' }],
      actions: [],
    },
    rewards: ['+4 Core', 'x1.08 Craftable Sell Price', 'x1.03 Tokenium'],
  },
  // 55
  {
    id: 55,
    minOrders: 43,
    requiredOrderIds: [33],
    resources: [
      { item: 'Worthless Rock', quantityDisplay: '10²²' },
      { item: 'Vespium', quantityDisplay: '10¹³' },
    ],
    actions: [],
    npc: 'Gerbo',
    completion: {
      resources: [
        { item: 'Worthless Rock', quantityDisplay: '1.00sp' },
        { item: 'Vespium', quantityDisplay: '10.00qa' },
      ],
      actions: [],
    },
    rewards: ['x1.08 EXP', 'x1.05 Worthless Rock', 'x1.06 Vespium'],
  },
  // 56
  {
    id: 56,
    minOrders: 31,
    requiredOrderIds: [46],
    resources: [{ item: 'Vespium Wire', quantityDisplay: null }],
    actions: [],
    npc: 'Samos Sula',
    completion: {
      resources: [{ item: 'Vespium Wire', quantityDisplay: '40' }],
      actions: [],
    },
    rewards: ['x1.15 All Rig Yield', '/1.2 Rig Cost'],
  },
  // 57
  {
    id: 57,
    minOrders: 44,
    requiredOrderIds: [28],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: null }],
    actions: [],
    npc: 'Bhramari',
    completion: {
      resources: [{ item: 'Low Grade Gel', quantityDisplay: '85' }],
      actions: [],
    },
    rewards: ['x1.07 Credits'],
  },
  // 58
  {
    id: 58,
    minOrders: 28,
    requiredOrderIds: [],
    resources: [
      { item: 'Hydracite', quantityDisplay: null },
      { item: 'Scorchium', quantityDisplay: null },
    ],
    actions: [],
    npc: 'The Twins',
    completion: {
      resources: [
        { item: 'Hydracite', quantityDisplay: '100' },
        { item: 'Scorchium', quantityDisplay: '75' },
      ],
      actions: [],
    },
    rewards: ['+1 Attribute Point'],
  },
  // 59
  {
    id: 59,
    minOrders: 31,
    requiredOrderIds: [58],
    resources: [
      { item: 'Hydracite', quantityDisplay: '50' },
      { item: 'Scorchium', quantityDisplay: '50' },
    ],
    actions: [],
    npc: 'The Twins',
    completion: {
      resources: [
        { item: 'Hydracite', quantityDisplay: '480' },
        { item: 'Scorchium', quantityDisplay: '360' },
      ],
      actions: [],
    },
    rewards: ['+10 Core'],
  },
  // 60
  {
    id: 60,
    minOrders: 37,
    requiredOrderIds: [59],
    resources: [
      { item: 'Hydracite', quantityDisplay: '100' },
      { item: 'Scorchium', quantityDisplay: '100' },
    ],
    actions: [],
    npc: 'The Twins',
    completion: {
      resources: [
        { item: 'Hydracite', quantityDisplay: '1000' },
        { item: 'Scorchium', quantityDisplay: '800' },
      ],
      actions: [],
    },
    rewards: ['x1.08 Credits', '+10% Crafting Speed'],
  },
  // 61
  {
    id: 61,
    minOrders: 42,
    requiredOrderIds: [60],
    resources: [
      { item: 'Hydracite', quantityDisplay: '3,000' },
      { item: 'Scorchium', quantityDisplay: '2,000' },
    ],
    actions: [],
    completion: {
      resources: [
        { item: 'Hydracite', quantityDisplay: '5000' },
        { item: 'Scorchium', quantityDisplay: '4000' },
      ],
      actions: [],
    },
    rewards: ['x1.3 EXP', '+10 Ether'],
  },
  // 62
  {
    id: 62,
    minOrders: 45,
    requiredOrderIds: [61],
    resources: [
      { item: 'Hydracite', quantityDisplay: '10,000' },
      { item: 'Scorchium', quantityDisplay: '8,000' },
    ],
    actions: [],
    npc: 'The Twins',
    completion: {
      resources: [
        { item: 'Hydracite', quantityDisplay: '10k' },
        { item: 'Scorchium', quantityDisplay: '8000' },
      ],
      actions: [],
    },
    rewards: ['+1 Attribute Point'],
  },
  // 63
  {
    id: 63,
    minOrders: 50,
    requiredOrderIds: [62],
    resources: [
      { item: 'Hydracite', quantityDisplay: '40,000' },
      { item: 'Scorchium', quantityDisplay: '10,000' },
    ],
    actions: [],
    npc: 'The Twins',
    completion: {
      resources: [
        { item: 'Hydracite', quantityDisplay: '100.00k' },
        { item: 'Scorchium', quantityDisplay: '80.00k' },
      ],
      actions: [],
    },
    rewards: ['x1.25 Jade'],
  },
  // 64
  {
    id: 64,
    minOrders: 53,
    requiredOrderIds: [48],
    resources: [
      { item: 'Industrial Bit', quantityDisplay: '2 million' },
      { item: 'Silicate Concrete', quantityDisplay: '1.5 million' },
      { item: 'Vespium Rod', quantityDisplay: '20,000' },
    ],
    actions: [],
    npc: 'Gama Kamalon',
    completion: {
      resources: [
        { item: 'Industrial Bit', quantityDisplay: '4.00m' },
        { item: 'Silicate Concrete', quantityDisplay: '3.00m' },
        { item: 'Vespium Rod', quantityDisplay: '20.00k' },
      ],
      actions: [],
    },
    rewards: ['x1.16 EXP', 'x1.05 Tokenium', 'x1.05 Tokenium Canister'],
  },
  // 65
  {
    id: 65,
    minOrders: 55,
    requiredOrderIds: [48],
    resources: [
      { item: 'Silicate Glass', quantityDisplay: '100,000' },
      { item: 'Low Grade Gel', quantityDisplay: null },
      { item: 'Vespium Wire', quantityDisplay: null },
    ],
    actions: [],
    npc: 'Gama Kamalon',
    completion: {
      resources: [
        { item: 'Silicate Glass', quantityDisplay: '100.00k' },
        { item: 'Low Grade Gel', quantityDisplay: '1000' },
        { item: 'Vespium Wire', quantityDisplay: '500' },
      ],
      actions: [],
    },
    rewards: ['x2 Credits', 'x1.06 Tokenium Canister', '+20 Core'],
  },
  // 66
  {
    id: 66,
    minOrders: 66,
    requiredOrderIds: [52],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 43 }],
  },
  // 67
  {
    id: 67,
    minOrders: 71,
    requiredOrderIds: [66],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 47 }],
  },
  // 68
  {
    id: 68,
    minOrders: 56,
    requiredOrderIds: [55],
    resources: [
      { item: 'Worthless Rock', quantityDisplay: '10²⁵' },
      { item: 'Vespium', quantityDisplay: '10¹⁶' },
    ],
    actions: [],
    npc: 'Gerbo',
    completion: {
      resources: [
        { item: 'Worthless Rock', quantityDisplay: '200.00sp' },
        { item: 'Vespium', quantityDisplay: '200.00qa' },
      ],
      actions: [],
    },
    rewards: ['x1.11 EXP', 'x1.07 Worthless Rock', 'x1.08 Vespium'],
  },
  // 69
  {
    id: 69,
    minOrders: 58,
    requiredOrderIds: [68],
    resources: [
      { item: 'Worthless Rock', quantityDisplay: '10²⁸' },
      { item: 'Vespium', quantityDisplay: '2 × 10¹⁸' },
    ],
    actions: [],
    npc: 'Gerbo',
    completion: {
      resources: [
        { item: 'Worthless Rock', quantityDisplay: '20.00o' },
        { item: 'Vespium', quantityDisplay: '7.00qu' },
      ],
      actions: [],
    },
    rewards: ['x1.13 EXP', 'x1.08 Worthless Rock', 'x1.1 Vespium'],
  },
  // 70
  {
    id: 70,
    minOrders: 60,
    requiredOrderIds: [69],
    resources: [
      { item: 'Worthless Rock', quantityDisplay: '10²⁹' },
      { item: 'Vespium', quantityDisplay: '10¹⁹' },
    ],
    actions: [],
    completion: {
      resources: [
        { item: 'Worthless Rock', quantityDisplay: '700.00o' },
        { item: 'Vespium', quantityDisplay: '30.00qu' },
      ],
      actions: [],
    },
    rewards: ['x1.17 EXP', 'x1.09 Worthless Rock', 'x1.12 Vespium'],
  },
  // 71
  {
    id: 71,
    minOrders: 62,
    requiredOrderIds: [49],
    resources: [],
    actions: [{ type: 'endurance_synthesizer_potion', quantity: 21 }],
  },
  // 72
  {
    id: 72,
    minOrders: 56,
    requiredOrderIds: [45],
    resources: [{ item: 'Jade', quantityDisplay: '60 billion' }],
    actions: [],
    completion: {
      resources: [{ item: 'Jade', quantityDisplay: '200.00b' }],
      actions: [],
    },
    rewards: ['x1.4 Jade', 'x1.2 Tokenium'],
  },
  // 73
  {
    id: 73,
    minOrders: 63,
    requiredOrderIds: [72],
    resources: [{ item: 'Jade', quantityDisplay: '400 billion' }],
    actions: [],
  },
  // 74
  {
    id: 74,
    minOrders: 66,
    requiredOrderIds: [73],
    resources: [{ item: 'Jade', quantityDisplay: '1 trillion' }],
    actions: [],
    npc: 'Minalima Lin',
    completion: {
      resources: [{ item: 'Jade', quantityDisplay: '10.00t' }],
      actions: [],
    },
    rewards: ['x1.33 Credits'],
  },
  // 75
  {
    id: 75,
    minOrders: 71,
    requiredOrderIds: [74],
    resources: [{ item: 'Jade', quantityDisplay: '5 trillion' }],
    actions: [],
  },
  // 76
  {
    id: 76,
    minOrders: 51,
    requiredOrderIds: [38],
    resources: [{ item: 'Vespium Ingot', quantityDisplay: '1 million' }],
    actions: [],
    completion: {
      resources: [{ item: 'Vespium Ingot', quantityDisplay: '1.00m' }],
      actions: [],
    },
    rewards: ['+6% Crafting Speed'],
  },
  // 77
  {
    id: 77,
    minOrders: 56,
    requiredOrderIds: [76],
    resources: [{ item: 'Vespium Ingot', quantityDisplay: '5 million' }],
    actions: [],
    npc: 'Tank Timmerson',
    completion: {
      resources: [{ item: 'Vespium Ingot', quantityDisplay: '5.00m' }],
      actions: [],
    },
    rewards: ['+7% Crafting Speed'],
  },
  // 78
  {
    id: 78,
    minOrders: 63,
    requiredOrderIds: [77],
    resources: [{ item: 'Vespium Ingot', quantityDisplay: '10 million' }],
    actions: [],
    npc: 'Tank Timmerson',
    completion: {
      resources: [{ item: 'Vespium Ingot', quantityDisplay: '10.00m' }],
      actions: [],
    },
    rewards: ['+4% Crafting Speed', 'x1.1 Vespium'],
  },
  // 79
  {
    id: 79,
    minOrders: 71,
    requiredOrderIds: [78],
    resources: [{ item: 'Vespium Ingot', quantityDisplay: '20 million' }],
    actions: [],
    completion: {
      resources: [{ item: 'Vespium Ingot', quantityDisplay: '50.00m' }],
      actions: [],
    },
    rewards: ['+9% Crafting Speed'],
  },
  // 80
  {
    id: 80,
    minOrders: 73,
    requiredOrderIds: [79],
    resources: [{ item: 'Vespium Ingot', quantityDisplay: '50 million' }],
    actions: [],
  },
  // 81
  {
    id: 81,
    minOrders: 75,
    requiredOrderIds: [80],
    resources: [{ item: 'Vespium Ingot', quantityDisplay: '200 million' }],
    actions: [],
    npc: 'Tank Timmerson',
    completion: {
      resources: [{ item: 'Vespium Ingot', quantityDisplay: '400.00m' }],
      actions: [],
    },
    rewards: ['+3% Crafting Speed', 'x3 Crafter Cost Reduction', '+3% Crafter Duplication Chance'],
  },
  // 82
  {
    id: 82,
    minOrders: 47,
    requiredOrderIds: [43],
    resources: [
      { item: 'Silicate Brick', quantityDisplay: '10,000' },
      { item: 'Silicate Glass', quantityDisplay: '10,000' },
    ],
    actions: [],
  },
  // 83
  {
    id: 83,
    minOrders: 53,
    requiredOrderIds: [82],
    resources: [
      { item: 'Silicate Brick', quantityDisplay: '50,000' },
      { item: 'Silicate Glass', quantityDisplay: '50,000' },
    ],
    actions: [],
    npc: 'Meepa Torani',
    completion: {
      resources: [
        { item: 'Silicate Glass', quantityDisplay: '20.00k' },
        { item: 'Silicate Brick', quantityDisplay: '20.00k' },
        { item: 'Industrial Bit', quantityDisplay: '80.00k' },
        { item: 'Silicate Concrete', quantityDisplay: '80.00k' },
      ],
      actions: [],
    },
    rewards: ['x1.2 Craftable Sell Price', 'x1.12 Credits'],
  },
  // 84
  {
    id: 84,
    minOrders: 53,
    requiredOrderIds: [83],
    resources: [
      { item: 'Silicate Brick', quantityDisplay: '100,000' },
      { item: 'Silicate Glass', quantityDisplay: '100,000' },
    ],
    actions: [],
    npc: 'Meepa Torani',
    completion: {
      resources: [
        { item: 'Silicate Glass', quantityDisplay: '40.00k' },
        { item: 'Silicate Brick', quantityDisplay: '40.00k' },
        { item: 'Industrial Bit', quantityDisplay: '160.00k' },
        { item: 'Silicate Concrete', quantityDisplay: '160.00k' },
      ],
      actions: [],
    },
    rewards: ['x1.24 Craftable Sell Price', 'x1.16 Credits'],
  },
  // 85
  {
    id: 85,
    minOrders: 61,
    requiredOrderIds: [84],
    resources: [
      { item: 'Silicate Brick', quantityDisplay: '300,000' },
      { item: 'Silicate Glass', quantityDisplay: '300,000' },
    ],
    actions: [],
    npc: 'Meepa Torani',
    completion: {
      resources: [
        { item: 'Silicate Glass', quantityDisplay: '100.00k' },
        { item: 'Silicate Brick', quantityDisplay: '100.00k' },
        { item: 'Industrial Bit', quantityDisplay: '400.00k' },
        { item: 'Silicate Concrete', quantityDisplay: '400.00k' },
      ],
      actions: [],
    },
    rewards: ['x1.26 Craftable Sell Price', 'x1.2 Credits'],
  },
  // 86
  {
    id: 86,
    minOrders: 65,
    requiredOrderIds: [85],
    resources: [
      { item: 'Silicate Brick', quantityDisplay: '500,000' },
      { item: 'Silicate Glass', quantityDisplay: '500,000' },
    ],
    actions: [],
    npc: 'Meepa Torani',
    completion: {
      resources: [
        { item: 'Silicate Glass', quantityDisplay: '400.00k' },
        { item: 'Silicate Brick', quantityDisplay: '400.00k' },
        { item: 'Industrial Bit', quantityDisplay: '2.00m' },
        { item: 'Silicate Concrete', quantityDisplay: '2.00m' },
      ],
      actions: [],
    },
    rewards: ['x1.28 Craftable Sell Price', 'x1.22 Credits'],
  },
  // 87
  {
    id: 87,
    minOrders: 69,
    requiredOrderIds: [86],
    resources: [
      { item: 'Silicate Brick', quantityDisplay: '800,000' },
      { item: 'Silicate Glass', quantityDisplay: '800,000' },
    ],
    actions: [],
    npc: 'Meepa Torani',
    completion: {
      resources: [
        { item: 'Silicate Glass', quantityDisplay: '1.00m' },
        { item: 'Silicate Brick', quantityDisplay: '1.00m' },
        { item: 'Industrial Bit', quantityDisplay: '10.00m' },
        { item: 'Silicate Concrete', quantityDisplay: '10.00m' },
      ],
      actions: [],
    },
    rewards: ['x1.32 Craftable Sell Price', 'x1.24 Credits'],
  },
  // 88
  {
    id: 88,
    minOrders: 73,
    requiredOrderIds: [87],
    resources: [
      { item: 'Silicate Brick', quantityDisplay: '2 million' },
      { item: 'Silicate Glass', quantityDisplay: '2 million' },
    ],
    actions: [],
    npc: 'Meepa Torani',
    completion: {
      resources: [
        { item: 'Silicate Glass', quantityDisplay: '2.00m' },
        { item: 'Silicate Brick', quantityDisplay: '2.00m' },
        { item: 'Industrial Bit', quantityDisplay: '30.00m' },
        { item: 'Silicate Concrete', quantityDisplay: '30.00m' },
      ],
      actions: [],
    },
    rewards: ['x1.36 Craftable Sell Price', 'x1.26 Credits'],
  },
  // 89
  {
    id: 89,
    minOrders: 77,
    requiredOrderIds: [88],
    resources: [
      { item: 'Silicate Brick', quantityDisplay: '5 million' },
      { item: 'Silicate Glass', quantityDisplay: '5 million' },
    ],
    actions: [],
  },
  // 90
  {
    id: 90,
    minOrders: 81,
    requiredOrderIds: [89],
    resources: [
      { item: 'Silicate Brick', quantityDisplay: '10 million' },
      { item: 'Silicate Glass', quantityDisplay: '10 million' },
    ],
    actions: [],
  },
  // 91
  {
    id: 91,
    minOrders: 57,
    requiredOrderIds: [54],
    resources: [{ item: 'Silicate Concrete', quantityDisplay: '10 million' }],
    actions: [],
    npc: 'Clank',
    completion: {
      resources: [{ item: 'Silicate Concrete', quantityDisplay: '10.00m' }],
      actions: [],
    },
    rewards: ['+50 Ether', '+7% Crafting Speed'],
  },
  // 92
  {
    id: 92,
    minOrders: 66,
    requiredOrderIds: [91],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: null }],
    actions: [],
    npc: 'Clank',
    completion: {
      resources: [{ item: 'Low Grade Gel', quantityDisplay: '264' }],
      actions: [],
    },
    rewards: ['+55 Ether', '+2% Rig Speed'],
  },
  // 93
  {
    id: 93,
    minOrders: 71,
    requiredOrderIds: [92],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: '500' }],
    actions: [],
    npc: 'Clank',
    completion: {
      resources: [{ item: 'Low Grade Gel', quantityDisplay: '4840' }],
      actions: [],
    },
    rewards: ['+60 Ether', 'x1.5 Worthless Rock'],
  },
  // 94
  {
    id: 94,
    minOrders: 76,
    requiredOrderIds: [93],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: '500' }],
    actions: [],
    completion: {
      resources: [{ item: 'Low Grade Gel', quantityDisplay: '11.20k' }],
      actions: [],
    },
    rewards: ['+65 Ether', 'x1.5 Credits'],
  },
  // 95
  {
    id: 95,
    minOrders: 81,
    requiredOrderIds: [94],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: '1,000' }],
    actions: [],
    completion: {
      resources: [{ item: 'Low Grade Gel', quantityDisplay: '36.40k' }],
      actions: [],
    },
    rewards: ['+70 Ether', 'x1.5 All Rig Yield'],
  },
  // 96
  {
    id: 96,
    minOrders: 86,
    requiredOrderIds: [95],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: '2,000' }],
    actions: [],
    completion: {
      resources: [{ item: 'Low Grade Gel', quantityDisplay: '51.20k' }],
      actions: [],
    },
    rewards: ['+75 Ether', '+10% Crafting Speed'],
  },
  // 97
  {
    id: 97,
    minOrders: 91,
    requiredOrderIds: [96],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: '10,000' }],
    actions: [],
    npc: 'Clank',
    completion: {
      resources: [{ item: 'Low Grade Gel', quantityDisplay: '1.00m' }],
      actions: [],
    },
    rewards: ['+80 Ether', '+20% Crafting Speed'],
  },
  // 98
  {
    id: 98,
    minOrders: 58,
    requiredOrderIds: [63],
    resources: [
      { item: 'Hydracite', quantityDisplay: '100,000' },
      { item: 'Scorchium', quantityDisplay: '80,000' },
    ],
    actions: [],
    completion: {
      resources: [
        { item: 'Hydracite', quantityDisplay: '200.00k' },
        { item: 'Scorchium', quantityDisplay: '160.00k' },
      ],
      actions: [],
    },
    rewards: ['x1.5 EXP', '+10 Ether'],
  },
  // 99
  {
    id: 99,
    minOrders: 61,
    requiredOrderIds: [98],
    resources: [
      { item: 'Hydracite', quantityDisplay: '400,000' },
      { item: 'Scorchium', quantityDisplay: '300,000' },
    ],
    actions: [],
  },
  // 100
  {
    id: 100,
    minOrders: 64,
    requiredOrderIds: [99],
    resources: [
      { item: 'Hydracite', quantityDisplay: '1 million' },
      { item: 'Scorchium', quantityDisplay: '800,000' },
    ],
    actions: [],
  },
  // 101
  {
    id: 101,
    minOrders: 67,
    requiredOrderIds: [100],
    resources: [
      { item: 'Hydracite', quantityDisplay: '3 million' },
      { item: 'Scorchium', quantityDisplay: '2 million' },
    ],
    actions: [],
  },
  // 102
  {
    id: 102,
    minOrders: 70,
    requiredOrderIds: [101],
    resources: [
      { item: 'Hydracite', quantityDisplay: '7 million' },
      { item: 'Scorchium', quantityDisplay: '5 million' },
    ],
    actions: [],
    npc: 'The Twins',
    completion: {
      resources: [
        { item: 'Hydracite', quantityDisplay: '70.00m' },
        { item: 'Scorchium', quantityDisplay: '35.00m' },
      ],
      actions: [],
    },
    rewards: ['x1.9 EXP', '+10 Ether'],
  },
  // 103
  {
    id: 103,
    minOrders: 73,
    requiredOrderIds: [102],
    resources: [
      { item: 'Hydracite', quantityDisplay: '20 million' },
      { item: 'Scorchium', quantityDisplay: '10 million' },
    ],
    actions: [],
  },
  // 104
  {
    id: 104,
    minOrders: 76,
    requiredOrderIds: [103],
    resources: [{ item: 'Hydracite', quantityDisplay: '100 million' }],
    actions: [],
  },
  // 105
  {
    id: 105,
    minOrders: 76,
    requiredOrderIds: [103],
    resources: [{ item: 'Scorchium', quantityDisplay: '100 million' }],
    actions: [],
  },
  // 106
  {
    id: 106,
    minOrders: 73,
    requiredOrderIds: [102],
    resources: [
      { item: 'Hydracite', quantityDisplay: '500 million' },
      { item: 'Scorchium', quantityDisplay: '400 million' },
    ],
    actions: [],
  },
  // 107
  {
    id: 107,
    minOrders: 76,
    requiredOrderIds: [102],
    resources: [
      { item: 'Hydracite', quantityDisplay: '3 billion' },
      { item: 'Scorchium', quantityDisplay: '2 billion' },
    ],
    actions: [],
  },
  // 108
  {
    id: 108,
    minOrders: 45,
    requiredOrderIds: [53],
    resources: [{ item: 'Vespium Plate', quantityDisplay: '50,000' }],
    actions: [],
    completion: {
      resources: [{ item: 'Vespium Plate', quantityDisplay: '27.50k' }],
      actions: [],
    },
    rewards: ['x1.08 Vespium', 'x1.05 Credits'],
  },
  // 109
  {
    id: 109,
    minOrders: 51,
    requiredOrderIds: [108],
    resources: [{ item: 'Vespium Rod', quantityDisplay: '50,000' }],
    actions: [],
    completion: {
      resources: [{ item: 'Vespium Rod', quantityDisplay: '27.50k' }],
      actions: [],
    },
    rewards: ['x1.05 Vespium', 'x1.08 Credits'],
  },
  // 110
  {
    id: 110,
    minOrders: 60,
    requiredOrderIds: [109],
    resources: [{ item: 'Vespium Frame', quantityDisplay: '1,000' }],
    actions: [],
    npc: 'Puri Puri',
    completion: {
      resources: [{ item: 'Vespium Frame', quantityDisplay: '1000' }],
      actions: [],
    },
    rewards: ['+5% Crafting Speed', '/1.2 Rig Cost'],
  },
  // 111
  {
    id: 111,
    minOrders: 64,
    requiredOrderIds: [110],
    resources: [{ item: 'Vespium Plate', quantityDisplay: '100,000' }],
    actions: [],
    npc: 'Puri Puri',
    completion: {
      resources: [{ item: 'Vespium Plate', quantityDisplay: '72.50k' }],
      actions: [],
    },
    rewards: ['x1.09 Vespium', 'x1.06 Credits'],
  },
  // 112
  {
    id: 112,
    minOrders: 68,
    requiredOrderIds: [111],
    resources: [{ item: 'Vespium Rod', quantityDisplay: '100,000' }],
    actions: [],
    npc: 'Puri Puri',
    completion: {
      resources: [{ item: 'Vespium Rod', quantityDisplay: '72.50k' }],
      actions: [],
    },
    rewards: ['x1.06 Vespium', 'x1.09 Credits'],
  },
  // 113
  {
    id: 113,
    minOrders: 76,
    requiredOrderIds: [112],
    resources: [{ item: 'Vespium Frame', quantityDisplay: '10,000' }],
    actions: [],
    completion: {
      resources: [{ item: 'Vespium Frame', quantityDisplay: '4000' }],
      actions: [],
    },
    rewards: ['+6% Crafting Speed', '/1.25 Crafter Cost Reduction'],
  },
  // 114
  {
    id: 114,
    minOrders: 81,
    requiredOrderIds: [113],
    resources: [{ item: 'Vespium Frame', quantityDisplay: '100,000' }],
    actions: [],
    completion: {
      resources: [
        { item: 'Vespium Plate', quantityDisplay: '100.00k' },
        { item: 'Vespium Rod', quantityDisplay: '60.00k' },
        { item: 'Vespium Frame', quantityDisplay: '12.50k' },
        { item: 'Vespium Wire', quantityDisplay: '2750' },
      ],
      actions: [],
    },
    rewards: ['+2 Attribute Points'],
  },
  // 115
  {
    id: 115,
    minOrders: 62,
    requiredOrderIds: [65],
    resources: [
      { item: 'Industrial Bit', quantityDisplay: '100,000' },
      { item: 'Low Grade Gel', quantityDisplay: '1,000' },
    ],
    actions: [],
    npc: 'Gama Kamalon',
    completion: {
      resources: [
        { item: 'Industrial Bit', quantityDisplay: '600.00k' },
        { item: 'Low Grade Gel', quantityDisplay: '750' },
      ],
      actions: [],
    },
    rewards: ['x1.03 Tokenium Canister', '+8 Core'],
  },
  // 116
  {
    id: 116,
    minOrders: 64,
    requiredOrderIds: [115],
    resources: [{ item: 'Vespium Wire', quantityDisplay: '500' }],
    actions: [],
    completion: {
      resources: [{ item: 'Vespium Wire', quantityDisplay: '360' }],
      actions: [],
    },
    rewards: ['x1.04 Tokenium Canister', '+10 Core'],
  },
  // 117
  {
    id: 117,
    minOrders: 67,
    requiredOrderIds: [116],
    resources: [
      { item: 'Vespium Wire', quantityDisplay: '1,000' },
      { item: 'Low Grade Gel', quantityDisplay: '200' },
    ],
    actions: [],
    completion: {
      resources: [
        { item: 'Vespium Wire', quantityDisplay: '475' },
        { item: 'Low Grade Gel', quantityDisplay: '600' },
      ],
      actions: [],
    },
    rewards: ['x1.05 Tokenium Canister', '+14 Core'],
  },
  // 118
  {
    id: 118,
    minOrders: 71,
    requiredOrderIds: [117],
    resources: [{ item: 'Vespium Wire', quantityDisplay: '1,000' }],
    actions: [],
    npc: 'Gama Kamalon',
    completion: {
      resources: [{ item: 'Vespium Wire', quantityDisplay: '22.00k' }],
      actions: [],
    },
    rewards: ['x1.1 Tokenium Canister', '+20% Crafting Speed', '+5% Rig Speed'],
  },
]
