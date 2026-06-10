import type { Order } from '@/types'

export const orders: Order[] = [
  // 1
  { id: 1, minOrders: 0, requiredOrderIds: [], resources: [], actions: [] },
  // 2
  { id: 2, minOrders: 0, requiredOrderIds: [], resources: [], actions: [] },
  // 3
  { id: 3, minOrders: 0, requiredOrderIds: [], resources: [], actions: [] },
  // 4
  { id: 4, minOrders: 1, requiredOrderIds: [], resources: [], actions: [] },
  // 5
  { id: 5, minOrders: 1, requiredOrderIds: [], resources: [], actions: [] },
  // 6
  {
    id: 6,
    minOrders: 3,
    requiredOrderIds: [],
    resources: [{ item: 'Silicate Glass', quantityDisplay: null }],
    actions: [],
  },
  // 7
  { id: 7, minOrders: 4, requiredOrderIds: [], resources: [], actions: [] },
  // 8
  {
    id: 8,
    minOrders: 5,
    requiredOrderIds: [1],
    resources: [{ item: 'Vespium', quantityDisplay: '500' }],
    actions: [],
  },
  // 9
  {
    id: 9,
    minOrders: 0,
    requiredOrderIds: [4],
    resources: [{ item: 'Jade', quantityDisplay: '700' }],
    actions: [],
  },
  // 10
  {
    id: 10,
    minOrders: 5,
    requiredOrderIds: [2],
    resources: [{ item: 'Silicate Glass', quantityDisplay: null }],
    actions: [],
  },
  // 11
  {
    id: 11,
    minOrders: 6,
    requiredOrderIds: [],
    resources: [
      { item: 'Vespium Ingots', quantityDisplay: '334' },
      { item: 'Vespium Plates', quantityDisplay: '334' },
      { item: 'Vespium Rods', quantityDisplay: '334' },
    ],
    actions: [{ type: 'chad_infusion', quantity: 5 }],
  },
  // 12
  {
    id: 12,
    minOrders: 7,
    requiredOrderIds: [8],
    resources: [{ item: 'Vespium', quantityDisplay: '7,500' }],
    actions: [],
  },
  // 13
  { id: 13, minOrders: 8, requiredOrderIds: [7], resources: [], actions: [] },
  // 14
  {
    id: 14,
    minOrders: 8,
    requiredOrderIds: [9],
    resources: [{ item: 'Jade', quantityDisplay: '3,000' }],
    actions: [],
  },
  // 15
  {
    id: 15,
    minOrders: 8,
    requiredOrderIds: [5],
    resources: [
      { item: 'Tokenium Canisters', quantityDisplay: '300' },
      { item: 'Silicate Concrete', quantityDisplay: '10,000' },
    ],
    actions: [],
  },
  // 16
  {
    id: 16,
    minOrders: 8,
    requiredOrderIds: [6],
    resources: [{ item: 'Industrial Bits', quantityDisplay: '10,000' }],
    actions: [],
  },
  // 17
  { id: 17, minOrders: 8, requiredOrderIds: [11], resources: [], actions: [] },
  // 18
  {
    id: 18,
    minOrders: 9,
    requiredOrderIds: [14],
    resources: [{ item: 'Jade', quantityDisplay: '8,000' }],
    actions: [],
  },
  // 19
  {
    id: 19,
    minOrders: 10,
    requiredOrderIds: [],
    resources: [{ item: 'Silicate Bricks', quantityDisplay: null }],
    actions: [],
  },
  // 20
  {
    id: 20,
    minOrders: 11,
    requiredOrderIds: [],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 6 }],
  },
  // 21
  {
    id: 21,
    minOrders: 15,
    requiredOrderIds: [18],
    resources: [{ item: 'Jade', quantityDisplay: '20,000' }],
    actions: [],
  },
  // 22
  {
    id: 22,
    minOrders: 16,
    requiredOrderIds: [12],
    resources: [{ item: 'Vespium', quantityDisplay: '40,000' }],
    actions: [],
  },
  // 23
  {
    id: 23,
    minOrders: 17,
    requiredOrderIds: [10],
    resources: [
      { item: 'Silicate Glass', quantityDisplay: '25' },
      { item: 'Silicate Bricks', quantityDisplay: '25' },
    ],
    actions: [],
  },
  // 24
  {
    id: 24,
    minOrders: 17,
    requiredOrderIds: [20],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 15 }],
  },
  // 25
  {
    id: 25,
    minOrders: 17,
    requiredOrderIds: [15],
    resources: [{ item: 'Vespium Frames', quantityDisplay: null }],
    actions: [],
  },
  // 26
  {
    id: 26,
    minOrders: 17,
    requiredOrderIds: [16],
    resources: [{ item: 'Silicate Concrete', quantityDisplay: '50,000' }],
    actions: [],
  },
  // 27
  {
    id: 27,
    minOrders: 16,
    requiredOrderIds: [13],
    resources: [{ item: 'Vespium Ingots', quantityDisplay: '10,000' }],
    actions: [],
  },
  // 28
  {
    id: 28,
    minOrders: 19,
    requiredOrderIds: [],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 9 }],
  },
  // 29
  {
    id: 29,
    minOrders: 19,
    requiredOrderIds: [17],
    resources: [{ item: 'Vespium Frames', quantityDisplay: null }],
    actions: [],
  },
  // 30
  {
    id: 30,
    minOrders: 23,
    requiredOrderIds: [24],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 19 }],
  },
  // 31
  {
    id: 31,
    minOrders: 25,
    requiredOrderIds: [30],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 23 }],
  },
  // 32
  {
    id: 32,
    minOrders: 28,
    requiredOrderIds: [31],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 27 }],
  },
  // 33
  {
    id: 33,
    minOrders: 25,
    requiredOrderIds: [22],
    resources: [
      { item: 'Vespium', quantityDisplay: '1 billion' },
      { item: 'Worthless Rocks', quantityDisplay: '1 quadrillion' },
    ],
    actions: [],
  },
  // 34
  {
    id: 34,
    minOrders: 26,
    requiredOrderIds: [],
    resources: [],
    actions: [{ type: 'endurance_synthesizer_potion', quantity: 1 }],
  },
  // 35
  {
    id: 35,
    minOrders: 26,
    requiredOrderIds: [21],
    resources: [{ item: 'Jade', quantityDisplay: '200,000' }],
    actions: [],
  },
  // 36
  {
    id: 36,
    minOrders: 27,
    requiredOrderIds: [35],
    resources: [{ item: 'Jade', quantityDisplay: '10 million' }],
    actions: [],
  },
  // 37
  {
    id: 37,
    minOrders: 28,
    requiredOrderIds: [34],
    resources: [],
    actions: [{ type: 'endurance_synthesizer_potion', quantity: 4 }],
  },
  // 38
  {
    id: 38,
    minOrders: 29,
    requiredOrderIds: [13],
    resources: [{ item: 'Vespium Ingots', quantityDisplay: '60,000' }],
    actions: [],
  },
  // 39
  {
    id: 39,
    minOrders: 30,
    requiredOrderIds: [26],
    resources: [{ item: 'Silicate Bricks', quantityDisplay: '6,000' }],
    actions: [],
  },
  // 40
  {
    id: 40,
    minOrders: 31,
    requiredOrderIds: [36],
    resources: [{ item: 'Jade', quantityDisplay: '100 million' }],
    actions: [],
  },
  // 41
  {
    id: 41,
    minOrders: 32,
    requiredOrderIds: [37],
    resources: [],
    actions: [{ type: 'endurance_synthesizer_potion', quantity: 8 }],
  },
  // 42
  {
    id: 42,
    minOrders: 33,
    requiredOrderIds: [32],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 31 }],
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
      { item: 'Silicate Bricks', quantityDisplay: '6,000' },
      { item: 'Silicate Glass', quantityDisplay: '6,000' },
      { item: 'Silicate Concrete', quantityDisplay: '50,000' },
      { item: 'Industrial Bits', quantityDisplay: '50,000' },
    ],
    actions: [],
  },
  // 44
  {
    id: 44,
    minOrders: 35,
    requiredOrderIds: [23],
    resources: [
      { item: 'Industrial Bits', quantityDisplay: '200,000' },
      { item: 'Vespium Frames', quantityDisplay: '1,000' },
    ],
    actions: [],
  },
  // 45
  {
    id: 45,
    minOrders: 36,
    requiredOrderIds: [40],
    resources: [{ item: 'Jade', quantityDisplay: '1 billion' }],
    actions: [],
  },
  // 46
  {
    id: 46,
    minOrders: 31,
    requiredOrderIds: [],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: null }],
    actions: [],
  },
  // 47
  {
    id: 47,
    minOrders: 38,
    requiredOrderIds: [44],
    resources: [
      { item: 'Industrial Bits', quantityDisplay: '400,000' },
      { item: 'Silicate Concrete', quantityDisplay: '400,000' },
    ],
    actions: [],
  },
  // 48
  {
    id: 48,
    minOrders: 39,
    requiredOrderIds: [25],
    resources: [{ item: 'Vespium Frames', quantityDisplay: '1,500' }],
    actions: [],
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
  },
  // 51
  {
    id: 51,
    minOrders: 42,
    requiredOrderIds: [42],
    resources: [],
    actions: [{ type: 'chad_infusion', quantity: 35 }],
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
      { item: 'Vespium Frames', quantityDisplay: '1,000' },
      { item: 'Vespium Ingots', quantityDisplay: '50,000' },
      { item: 'Vespium Plates', quantityDisplay: '50,000' },
      { item: 'Vespium Rods', quantityDisplay: '50,000' },
    ],
    actions: [],
  },
  // 54
  {
    id: 54,
    minOrders: 43,
    requiredOrderIds: [39],
    resources: [{ item: 'Industrial Bits', quantityDisplay: '4 million' }],
    actions: [],
  },
  // 55
  {
    id: 55,
    minOrders: 43,
    requiredOrderIds: [33],
    resources: [
      { item: 'Worthless Rocks', quantityDisplay: '10²²' },
      { item: 'Vespium', quantityDisplay: '10¹³' },
    ],
    actions: [],
  },
  // 56
  {
    id: 56,
    minOrders: 31,
    requiredOrderIds: [46],
    resources: [{ item: 'Vespium Wire', quantityDisplay: null }],
    actions: [],
  },
  // 57
  {
    id: 57,
    minOrders: 44,
    requiredOrderIds: [28],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: null }],
    actions: [],
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
  },
  // 64
  {
    id: 64,
    minOrders: 53,
    requiredOrderIds: [48],
    resources: [
      { item: 'Industrial Bits', quantityDisplay: '2 million' },
      { item: 'Silicate Concrete', quantityDisplay: '1.5 million' },
      { item: 'Vespium Rods', quantityDisplay: '20,000' },
    ],
    actions: [],
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
      { item: 'Worthless Rocks', quantityDisplay: '10²⁵' },
      { item: 'Vespium', quantityDisplay: '10¹⁶' },
    ],
    actions: [],
  },
  // 69
  {
    id: 69,
    minOrders: 58,
    requiredOrderIds: [68],
    resources: [
      { item: 'Worthless Rocks', quantityDisplay: '10²⁸' },
      { item: 'Vespium', quantityDisplay: '2 × 10¹⁸' },
    ],
    actions: [],
  },
  // 70
  {
    id: 70,
    minOrders: 60,
    requiredOrderIds: [69],
    resources: [
      { item: 'Worthless Rocks', quantityDisplay: '10²⁹' },
      { item: 'Vespium', quantityDisplay: '10¹⁹' },
    ],
    actions: [],
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
    resources: [{ item: 'Vespium Ingots', quantityDisplay: '1 million' }],
    actions: [],
  },
  // 77
  {
    id: 77,
    minOrders: 56,
    requiredOrderIds: [76],
    resources: [{ item: 'Vespium Ingots', quantityDisplay: '5 million' }],
    actions: [],
  },
  // 78
  {
    id: 78,
    minOrders: 63,
    requiredOrderIds: [77],
    resources: [{ item: 'Vespium Ingots', quantityDisplay: '10 million' }],
    actions: [],
  },
  // 79
  {
    id: 79,
    minOrders: 71,
    requiredOrderIds: [78],
    resources: [{ item: 'Vespium Ingots', quantityDisplay: '20 million' }],
    actions: [],
  },
  // 80
  {
    id: 80,
    minOrders: 73,
    requiredOrderIds: [79],
    resources: [{ item: 'Vespium Ingots', quantityDisplay: '50 million' }],
    actions: [],
  },
  // 81
  {
    id: 81,
    minOrders: 75,
    requiredOrderIds: [80],
    resources: [{ item: 'Vespium Ingots', quantityDisplay: '200 million' }],
    actions: [],
  },
  // 82
  {
    id: 82,
    minOrders: 47,
    requiredOrderIds: [43],
    resources: [
      { item: 'Silicate Bricks', quantityDisplay: '10,000' },
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
      { item: 'Silicate Bricks', quantityDisplay: '50,000' },
      { item: 'Silicate Glass', quantityDisplay: '50,000' },
    ],
    actions: [],
  },
  // 84
  {
    id: 84,
    minOrders: 53,
    requiredOrderIds: [83],
    resources: [
      { item: 'Silicate Bricks', quantityDisplay: '100,000' },
      { item: 'Silicate Glass', quantityDisplay: '100,000' },
    ],
    actions: [],
  },
  // 85
  {
    id: 85,
    minOrders: 61,
    requiredOrderIds: [84],
    resources: [
      { item: 'Silicate Bricks', quantityDisplay: '300,000' },
      { item: 'Silicate Glass', quantityDisplay: '300,000' },
    ],
    actions: [],
  },
  // 86
  {
    id: 86,
    minOrders: 65,
    requiredOrderIds: [85],
    resources: [
      { item: 'Silicate Bricks', quantityDisplay: '500,000' },
      { item: 'Silicate Glass', quantityDisplay: '500,000' },
    ],
    actions: [],
  },
  // 87
  {
    id: 87,
    minOrders: 69,
    requiredOrderIds: [86],
    resources: [
      { item: 'Silicate Bricks', quantityDisplay: '800,000' },
      { item: 'Silicate Glass', quantityDisplay: '800,000' },
    ],
    actions: [],
  },
  // 88
  {
    id: 88,
    minOrders: 73,
    requiredOrderIds: [87],
    resources: [
      { item: 'Silicate Bricks', quantityDisplay: '2 million' },
      { item: 'Silicate Glass', quantityDisplay: '2 million' },
    ],
    actions: [],
  },
  // 89
  {
    id: 89,
    minOrders: 77,
    requiredOrderIds: [88],
    resources: [
      { item: 'Silicate Bricks', quantityDisplay: '5 million' },
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
      { item: 'Silicate Bricks', quantityDisplay: '10 million' },
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
  },
  // 92
  {
    id: 92,
    minOrders: 66,
    requiredOrderIds: [91],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: null }],
    actions: [],
  },
  // 93
  {
    id: 93,
    minOrders: 71,
    requiredOrderIds: [92],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: '500' }],
    actions: [],
  },
  // 94
  {
    id: 94,
    minOrders: 76,
    requiredOrderIds: [93],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: '500' }],
    actions: [],
  },
  // 95
  {
    id: 95,
    minOrders: 81,
    requiredOrderIds: [94],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: '1,000' }],
    actions: [],
  },
  // 96
  {
    id: 96,
    minOrders: 86,
    requiredOrderIds: [95],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: '2,000' }],
    actions: [],
  },
  // 97
  {
    id: 97,
    minOrders: 91,
    requiredOrderIds: [96],
    resources: [{ item: 'Low Grade Gel', quantityDisplay: '10,000' }],
    actions: [],
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
    resources: [{ item: 'Vespium Plates', quantityDisplay: '50,000' }],
    actions: [],
  },
  // 109
  {
    id: 109,
    minOrders: 51,
    requiredOrderIds: [108],
    resources: [{ item: 'Vespium Rods', quantityDisplay: '50,000' }],
    actions: [],
  },
  // 110
  {
    id: 110,
    minOrders: 60,
    requiredOrderIds: [109],
    resources: [{ item: 'Vespium Frames', quantityDisplay: '1,000' }],
    actions: [],
  },
  // 111
  {
    id: 111,
    minOrders: 64,
    requiredOrderIds: [110],
    resources: [{ item: 'Vespium Plates', quantityDisplay: '100,000' }],
    actions: [],
  },
  // 112
  {
    id: 112,
    minOrders: 68,
    requiredOrderIds: [111],
    resources: [{ item: 'Vespium Rods', quantityDisplay: '100,000' }],
    actions: [],
  },
  // 113
  {
    id: 113,
    minOrders: 76,
    requiredOrderIds: [112],
    resources: [{ item: 'Vespium Frames', quantityDisplay: '10,000' }],
    actions: [],
  },
  // 114
  {
    id: 114,
    minOrders: 81,
    requiredOrderIds: [113],
    resources: [{ item: 'Vespium Frames', quantityDisplay: '100,000' }],
    actions: [],
  },
  // 115
  {
    id: 115,
    minOrders: 62,
    requiredOrderIds: [65],
    resources: [
      { item: 'Industrial Bits', quantityDisplay: '100,000' },
      { item: 'Low Grade Gel', quantityDisplay: '1,000' },
    ],
    actions: [],
  },
  // 116
  {
    id: 116,
    minOrders: 64,
    requiredOrderIds: [115],
    resources: [{ item: 'Vespium Wire', quantityDisplay: '500' }],
    actions: [],
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
  },
  // 118
  {
    id: 118,
    minOrders: 71,
    requiredOrderIds: [117],
    resources: [{ item: 'Vespium Wire', quantityDisplay: '1,000' }],
    actions: [],
  },
]
