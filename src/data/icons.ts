const CDN = 'https://cdn.discordapp.com/emojis'
const url = (id: string) => `${CDN}/${id}.webp?size=32`

export const RESOURCE_ICONS: Record<string, string> = {
  'Industrial Bits':    url('1511695621180883014'), // Boxes
  'Silicate Glass':     url('1511696320396660766'), // Mirrors
  'Silicate Concrete':  url('1511697199984283768'), // Buckets
  'Vespium Ingots':     url('1511698128665972977'), // Bars
  'Vespium Plates':     url('1511698168662986862'), // Cardboard
  'Vespium Rods':       url('1511698204390064261'), // Sticks
  'Vespium Frames':     url('1511698289542697030'), // Cubes
  'Low Grade Gel':      url('1511696414877679626'), // Gloo
  'Jade':               url('1511697020111552562'), // Green/Jade
  'Tokenium Canisters': url('1511697251532144700'), // Toke Juice cans
}

export const ACTION_ICONS: Record<string, string> = {
  chad_infusion:                url('1443273269573849289'),   // Chad
  endurance_synthesizer_potion: url('1511695677393076367'),   // Endurance Potion
}

export const RESOURCE_FLAVOR: Record<string, string> = {
  'Worthless Rocks':    'Common debris that litters every asteroid field.',
  'Jade':               'A rare green mineral prized across known space.',
  'Vespium':            'Raw ore mined straight from rich asteroid veins.',
  'Vespium Ingots':     'Smelted Vespium cast into solid bars.',
  'Vespium Plates':     'Vespium pressed flat into rugged plating.',
  'Vespium Rods':       'Vespium drawn into sturdy structural rods.',
  'Vespium Frames':     'Vespium welded into modular frame units.',
  'Vespium Wire':       'Fine Vespium filament for wiring and circuitry.',
  'Silicate Glass':     'Polished silicate, clear as a mirror.',
  'Silicate Bricks':    'Fired silicate blocks for heavy construction.',
  'Silicate Concrete':  'Silicate slurry poured for foundations.',
  'Industrial Bits':    'Crated components for industrial assembly.',
  'Tokenium Canisters': "Canisters of Chad's secret brew.",
  'Hydracite':          'A volatile crystal harvested from icy moons.',
  'Scorchium':          'Superheated mineral — handle with care.',
  'Low Grade Gel':      'Sticky synthetic gel of dubious origin.',
}
