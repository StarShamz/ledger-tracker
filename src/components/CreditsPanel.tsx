interface Contributor {
  name: string
  discord?: string
}

const CONTRIBUTORS: Contributor[] = [
  { name: 'Tikaï' },
  { name: 'RoboSkolar' },
  { name: 'lewtheroux' },
  { name: 'Jack', discord: 'jack_s05' },
  { name: 'Goopy', discord: 'anelmeria' },
  { name: 'tetsuke', discord: 'tetsukebasibuyuk' },
  { name: 'T~Hill', discord: 't.hill' },
  { name: 'Deceet' },
  { name: 'mars' },
  { name: 'Kirill', discord: 'kirill9393' },
  { name: 'DumGuy', discord: 'ayan_352' },
  { name: 'nothing2it' },
  { name: 'conradkurze' },
  { name: 'anna', discord: 'webloveandmonster' },
  { name: 'Djokito', discord: '.djokito' },
  { name: 'Archetype', discord: 'archetype1245' },
  { name: 'Kartonis' },
  { name: 'donhue', discord: 'don.hue' },
]

export default function CreditsPanel() {
  return (
    <div className="bg-black/88 backdrop-blur-md border-b border-fuchsia-600/25 px-4 py-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div>
          <p className="font-orbitron text-[9px] font-semibold text-fuchsia-400/80 uppercase tracking-[0.2em] mb-2">
            ✦ Contributors
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            This tool would not have been possible without the help of some awesome contributors in our community!
          </p>
          <p className="text-xs text-slate-400 leading-relaxed mt-2">
            The following individuals helped me (StarShamz) gather the data and assets required to turn this tool
            into something truly useful for everyone playing Chad&apos;s Galactic Mining Empire.
          </p>
        </div>

        <div className="border-l-[2px] border-l-amber-500/50 border border-l-0 border-amber-800/30 bg-amber-500/[0.04] px-3 py-2.5">
          <p className="text-xs text-slate-400 leading-relaxed">
            Firstly, thank you to <span className="text-amber-300">Chrysto of Octocube Games</span> for providing us
            with every ledger order&apos;s unlock requirements, allowing us to use Chad&apos;s game assets, and for
            providing high quality portraits of all NPCs in the game.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {CONTRIBUTORS.map(c => (
            <div
              key={c.name}
              className="px-2.5 py-1.5 rounded-sm border border-fuchsia-700/25 bg-fuchsia-500/[0.05]"
            >
              <span className="text-xs text-slate-200 font-semibold">{c.name}</span>
              {c.discord && (
                <span className="text-[10px] text-slate-500 font-spacemono ml-1.5">@{c.discord}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
