const url = (id: string) => `/icons/${id}.webp`

export const RESOURCE_ICONS: Record<string, string> = {
  'Industrial Bit':    url('1511695621180883014'), // Boxes
  'Silicate Glass':    url('1511696320396660766'), // Mirrors
  'Silicate Concrete': url('1511697199984283768'), // Buckets
  'Vespium Ingot':     url('1511698128665972977'), // Bars
  'Vespium Plate':     url('1511698168662986862'), // Cardboard
  'Vespium Rod':       url('1511698204390064261'), // Sticks
  'Vespium Frame':     url('1511698289542697030'), // Cubes
  'Low Grade Gel':     url('1511696414877679626'), // Gloo
  'Jade':              url('1511697020111552562'), // Green/Jade
  'Tokenium Canister': url('1511697251532144700'), // Toke Juice cans
}

export const ACTION_ICONS: Record<string, string> = {
  chad_infusion:                url('1443273269573849289'),   // Chad
  endurance_synthesizer_potion: url('1511695677393076367'),   // Endurance Booster Potion
}
