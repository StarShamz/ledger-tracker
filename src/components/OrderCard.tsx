import { useState } from 'react'
import { createPortal } from 'react-dom'
import type { ActionRequirement, Order, OrderStatus, PlayerStats, ResourceRequirement } from '@/types'
import { meetsRequirement, parseQuantity, formatQuantity } from '@/utils/parseQuantity'
import { orders as allOrders } from '@/data/orders'
import { RESOURCE_ICONS, ACTION_ICONS } from '@/data/icons'
import { getOrderNpc, NPC_IMAGES } from '@/data/npcs'

interface OrderCardProps {
  order: Order
  status: OrderStatus
  completedCount: number
  completedIds: Set<number>
  stats: PlayerStats
  unlockCount?: number
  inProgress?: boolean
  onToggle: (id: number) => void
  onScrollToOrder: (id: number) => void
  onToggleInProgress?: (id: number) => void
}

const statusStyles: Record<OrderStatus, {
  bar: string
  topGrad: string
  border: string
  glow: string
  badgeText: string
  badgeBg: string
}> = {
  completed: {
    bar: 'bg-emerald-400/90',
    topGrad: 'from-emerald-400/75',
    border: 'border-emerald-600/45',
    glow: 'card-glow-complete',
    badgeText: 'text-emerald-300',
    badgeBg: 'bg-emerald-400/[0.18] border border-emerald-500/50',
  },
  available: {
    bar: 'bg-cyan-300',
    topGrad: 'from-cyan-300/85',
    border: 'border-cyan-600/50',
    glow: 'card-glow-ready',
    badgeText: 'text-cyan-200',
    badgeBg: 'bg-cyan-400/[0.22] border border-cyan-500/60 shadow-[0_0_12px_rgba(0,212,255,0.22)]',
  },
  needs_resources: {
    bar: 'bg-orange-400/90',
    topGrad: 'from-orange-400/72',
    border: 'border-orange-600/40',
    glow: 'card-glow-mining',
    badgeText: 'text-orange-300',
    badgeBg: 'bg-orange-400/[0.18] border border-orange-500/45',
  },
  locked: {
    bar: 'bg-slate-500/55',
    topGrad: 'from-slate-400/35',
    border: 'border-slate-600/40',
    glow: 'card-glow-locked',
    badgeText: 'text-slate-400',
    badgeBg: 'bg-slate-600/[0.25] border border-slate-500/45',
  },
}

const statusLabel: Record<OrderStatus, string> = {
  completed: 'Complete',
  available: 'Ready',
  needs_resources: 'Mining',
  locked: 'Locked',
}


function fmtQty(display: string | null): string {
  if (display === null) return 'any'
  const n = parseQuantity(display)
  return n !== null ? formatQuantity(n) : display
}

function isImmediatelyAvailable(order: Order): boolean {
  return (
    order.minOrders === 0 &&
    order.requiredOrderIds.length === 0 &&
    order.resources.length === 0 &&
    order.actions.length === 0
  )
}

type TooltipState = { orderId: number; x: number; y: number }

export default function OrderCard({
  order,
  status,
  completedCount,
  completedIds,
  stats,
  unlockCount,
  inProgress = false,
  onToggle,
  onScrollToOrder,
  onToggleInProgress,
}: OrderCardProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  const styles = statusStyles[status]
  const immediate = isImmediatelyAvailable(order)
  const countMet = completedCount >= order.minOrders
  const npc = getOrderNpc(order)
  const npcImage = npc ? NPC_IMAGES[npc] : undefined
  const unlocksIds = allOrders.filter(o => o.requiredOrderIds.includes(order.id)).map(o => o.id)

  function showTooltip(e: React.SyntheticEvent<HTMLButtonElement>, orderId: number) {
    const rect = e.currentTarget.getBoundingClientRect()
    const tooltipW = 288
    const margin = 8
    const rawX = rect.right + 10 + tooltipW > window.innerWidth
      ? rect.left - tooltipW - 10
      : rect.right + 10
    const x = Math.max(margin, Math.min(rawX, window.innerWidth - tooltipW - margin))
    const y = Math.max(margin, Math.min(rect.top, window.innerHeight - 320))
    setTooltip({ orderId, x, y })
  }

  return (
    <div
      id={`order-${order.id}`}
      className={`relative transition-all duration-200 ${inProgress ? 'card-glow-inprogress' : styles.glow}`}
    >
      {/* Top gradient border */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${inProgress ? 'from-amber-400/55' : styles.topGrad} to-transparent`} />
      {/* Left accent bar */}
      <div className={`absolute top-0 left-0 bottom-0 w-[2px] ${inProgress ? 'bg-amber-400/80' : styles.bar}`} />
      {/* Card body */}
      <div className={`border ${styles.border} bg-[#0D1F3C]/92 flex`}>
        {npcImage && (
          <div className="relative flex-shrink-0 overflow-hidden">
            <img
              src={npcImage}
              alt=""
              aria-hidden="true"
              className="h-full w-auto object-contain object-center"
            />
            <div className="absolute inset-y-0 left-0 w-5 bg-gradient-to-l from-transparent to-[#0D1F3C]" />
          </div>
        )}
        <div className={`flex-1 min-w-0 ${npcImage ? 'pl-3' : 'pl-5'} pr-4 pt-3 pb-3`}>

        <div className="flex items-center justify-between gap-3 border-b border-slate-700/25 pb-2">
          <div className="min-w-0">
            {npc && (
              <p className="font-spacemono text-[9px] tracking-[0.2em] text-fuchsia-400/70 uppercase mb-1">
                {npc}
              </p>
            )}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-orbitron text-xs font-semibold tracking-[0.15em] text-white uppercase">
                Order {order.id}
              </span>
              <span className={`font-orbitron text-[9px] tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-sm ${styles.badgeText} ${styles.badgeBg}`}>
                {statusLabel[status]}
              </span>
              {unlockCount != null && unlockCount > 0 && (
                <span className="font-spacemono text-[9px] px-1.5 py-0.5 rounded-sm border border-cyan-600/40 bg-cyan-400/[0.12] text-cyan-300">
                  +{unlockCount}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-0.5 flex-shrink-0">
            {status !== 'completed' && onToggleInProgress && (
              <div className="relative group/pin">
                <button
                  onClick={() => onToggleInProgress(order.id)}
                  aria-label={inProgress ? 'Remove from in progress' : 'Track progress'}
                  className={`w-8 h-11 flex items-center justify-center rounded-sm cursor-pointer [touch-action:manipulation] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500/40 focus-visible:ring-offset-1 focus-visible:ring-offset-black transition-colors ${
                    inProgress ? 'text-amber-400' : 'text-slate-500 hover:text-amber-400/70'
                  }`}
                >
                  <svg className="w-4 h-5" viewBox="0 0 10 13" fill={inProgress ? 'currentColor' : 'none'} aria-hidden="true">
                    <path d="M2 1h6v8L5 7 2 9V1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="absolute bottom-full right-0 mb-1 px-1.5 py-0.5 bg-[#0a0b14] border border-slate-700/60 text-[9px] font-spacemono text-slate-300 whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity duration-150 pointer-events-none z-20">
                  {inProgress ? 'Remove from in progress' : 'Track progress'}
                </div>
              </div>
            )}
          <div className="relative group/check">
            <button
              onClick={() => onToggle(order.id)}
              aria-label={status === 'completed' ? 'Mark incomplete' : 'Mark complete'}
              className="group flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-sm cursor-pointer [touch-action:manipulation] transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-black"
            >
              <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-all duration-150 ${
                status === 'completed'
                  ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-400 shadow-[0_0_8px_rgba(0,255,136,0.4)] group-hover:from-emerald-500 group-hover:to-emerald-700'
                  : 'bg-transparent border-slate-500 group-hover:border-cyan-400/65'
              }`}>
                {status === 'completed' && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
            <div className="absolute bottom-full right-0 mb-1 px-1.5 py-0.5 bg-[#0a0b14] border border-slate-700/60 text-[9px] font-spacemono text-slate-300 whitespace-nowrap opacity-0 group-hover/check:opacity-100 transition-opacity duration-150 pointer-events-none z-20">
              {status === 'completed' ? 'Mark incomplete' : 'Mark complete'}
            </div>
          </div>
          </div>
        </div>

        {tooltip && (
          <OrderPreview
            orderId={tooltip.orderId}
            x={tooltip.x}
            y={tooltip.y}
            completedIds={completedIds}
            stats={stats}
          />
        )}

        <div className="mt-2 space-y-1.5 pl-0">
          {immediate ? (
            <p className="text-xs text-emerald-400 font-spacemono">Available immediately</p>
          ) : (
            <>
              {order.minOrders > 0 && (
                <RequirementRow state={countMet ? 'met' : 'unmet'}>
                  Complete {order.minOrders}+ orders
                  {!countMet && (
                    <span className="ml-1 text-slate-400 font-spacemono">
                      ({completedCount}/{order.minOrders})
                    </span>
                  )}
                </RequirementRow>
              )}

              {order.requiredOrderIds.map(prereqId => (
                <RequirementRow
                  key={prereqId}
                  state={completedIds.has(prereqId) ? 'met' : 'unmet'}
                >
                  Complete{' '}
                  <button
                    onClick={e => { e.stopPropagation(); onScrollToOrder(prereqId) }}
                    onMouseEnter={e => showTooltip(e, prereqId)}
                    onMouseLeave={() => setTooltip(null)}
                    onFocus={e => showTooltip(e, prereqId)}
                    onBlur={() => setTooltip(null)}
                    className="text-cyan-400 hover:text-cyan-200 underline underline-offset-2 cursor-pointer [touch-action:manipulation] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/50 rounded-sm"
                  >
                    Order {prereqId}
                  </button>
                </RequirementRow>
              ))}

              {order.resources.map(r => (
                <ResourceRequirementRow key={r.item} r={r} stats={stats} verb="Acquire" />
              ))}

              {order.actions.map(a => (
                <ActionRequirementRow key={a.type} a={a} stats={stats} />
              ))}
            </>
          )}
        </div>

        {order.completion && (order.completion.resources.length > 0 || order.completion.actions.length > 0) && (
          <div className="mt-1.5 pt-1.5 border-t border-slate-700/20 space-y-1.5">
            <p className="font-spacemono text-[9px] tracking-[0.2em] text-amber-400/70 uppercase">
              To Complete
            </p>
            {order.completion.resources.map(r => (
              <ResourceRequirementRow key={r.item} r={r} stats={stats} verb="Exchange" raw />
            ))}
            {order.completion.actions.map(a => (
              <ActionRequirementRow key={a.type} a={a} stats={stats} />
            ))}
          </div>
        )}

        {order.rewards && order.rewards.length > 0 && (
          <div className="mt-1.5 pt-1.5 border-t border-amber-700/25 space-y-1">
            <p className="font-spacemono text-[9px] tracking-[0.2em] text-amber-400/70 uppercase">
              Rewards
            </p>
            {order.rewards.map(reward => (
              <div key={reward} className="flex items-baseline gap-1.5 text-xs text-amber-200/85">
                <span aria-hidden="true" className="flex-shrink-0 font-bold font-spacemono text-amber-400">✦</span>
                <span>{reward}</span>
              </div>
            ))}
          </div>
        )}

        {unlocksIds.length > 0 && (
          <div className="mt-1.5 pt-1.5 border-t border-slate-700/20 space-y-1.5">
            {unlocksIds.map(unlockId => (
              <UnlockRow
                key={unlockId}
                unlockId={unlockId}
                onScrollToOrder={onScrollToOrder}
                onShowTooltip={showTooltip}
                onHideTooltip={() => setTooltip(null)}
              />
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

type ReqKind = 'order' | 'resource' | 'action'
type ReqState = 'met' | 'unmet' | 'unknown'

function RequirementRow({
  state,
  kind = 'order',
  children,
}: {
  state: ReqState
  kind?: ReqKind
  children: React.ReactNode
}) {
  const iconColor =
    state === 'met' ? 'text-emerald-500' :
    state === 'unmet' ? 'text-red-400' :
    'text-slate-600'

  const textColor =
    state === 'met' ? 'text-slate-400' :
    state === 'unmet'
      ? kind === 'order' ? 'text-red-300' : kind === 'resource' ? 'text-amber-300' : 'text-violet-300'
      : kind === 'resource' ? 'text-amber-500/60' : kind === 'action' ? 'text-violet-400/60' : 'text-slate-500'

  const icon = state === 'met' ? '✓' : state === 'unmet' ? '✗' : '·'
  const iconLabel = state === 'met' ? 'met' : state === 'unmet' ? 'not met' : 'unknown'

  return (
    <div className={`flex items-baseline gap-1.5 text-xs ${textColor}`}>
      <span aria-hidden="true" className={`flex-shrink-0 font-bold font-spacemono ${iconColor}`}>{icon}</span>
      <div className="min-w-0">
        <span className="sr-only">{iconLabel}: </span>
        {children}
      </div>
    </div>
  )
}

function ResourceRequirementRow({
  r,
  stats,
  verb,
  raw = false,
}: {
  r: ResourceRequirement
  stats: PlayerStats
  verb: string
  // Display quantityDisplay exactly as given, skipping the fmtQty round-trip
  // (which would normalize e.g. "500.00m" down to "500m").
  raw?: boolean
}) {
  const reqState = meetsRequirement(stats.resources[r.item], r.quantityDisplay)
  const icon = RESOURCE_ICONS[r.item]
  const qty = raw ? r.quantityDisplay : r.quantityDisplay !== null ? fmtQty(r.quantityDisplay) : null
  return (
    <RequirementRow state={reqState} kind="resource">
      {verb} {qty !== null ? `${qty}+ ` : 'any '}
      {icon && <img src={icon} alt="" aria-hidden="true" className="inline-block w-3.5 h-3.5 object-contain align-middle mx-0.5" />}
      {r.item}
    </RequirementRow>
  )
}

function ActionRequirementRow({ a, stats }: { a: ActionRequirement; stats: PlayerStats }) {
  const isCI = a.type === 'chad_infusion'
  const playerStr = isCI ? stats.tiLevel : stats.potionsCrafted
  const actionState: ReqState = playerStr?.trim()
    ? (parseQuantity(playerStr) ?? 0n) >= BigInt(a.quantity) ? 'met' : 'unmet'
    : 'unknown'
  const icon = ACTION_ICONS[a.type]
  return (
    <RequirementRow state={actionState} kind="action">
      {icon && <img src={icon} alt="" aria-hidden="true" className="inline-block w-3.5 h-3.5 object-contain align-middle mr-1" />}
      {isCI
        ? `TI Level ${a.quantity}+ (${a.quantity}+ Chad Infusions)`
        : `Craft ${a.quantity}+ Endurance Synthesizer Potion${a.quantity > 1 ? 's' : ''}`}
    </RequirementRow>
  )
}

function UnlockRow({
  unlockId,
  onScrollToOrder,
  onShowTooltip,
  onHideTooltip,
}: {
  unlockId: number
  onScrollToOrder: (id: number) => void
  onShowTooltip: (e: React.SyntheticEvent<HTMLButtonElement>, orderId: number) => void
  onHideTooltip: () => void
}) {
  return (
    <div className="flex items-baseline gap-1.5 text-xs text-slate-500">
      <span aria-hidden="true" className="flex-shrink-0 font-bold font-spacemono text-cyan-500/60">→</span>
      <div className="min-w-0">
        <span className="sr-only">Pre-requisite for: </span>
        Pre-requisite for{' '}
        <button
          onClick={e => { e.stopPropagation(); onScrollToOrder(unlockId) }}
          onMouseEnter={e => onShowTooltip(e, unlockId)}
          onMouseLeave={onHideTooltip}
          onFocus={e => onShowTooltip(e, unlockId)}
          onBlur={onHideTooltip}
          className="text-cyan-400 hover:text-cyan-200 underline underline-offset-2 cursor-pointer [touch-action:manipulation] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/50 rounded-sm"
        >
          Order {unlockId}
        </button>
      </div>
    </div>
  )
}

function OrderPreview({
  orderId,
  x,
  y,
  completedIds,
  stats,
}: {
  orderId: number
  x: number
  y: number
  completedIds: Set<number>
  stats: PlayerStats
}) {
  const order = allOrders.find(o => o.id === orderId)
  if (!order) return null

  const isCompleted = completedIds.has(orderId)
  const countMet = completedIds.size >= order.minOrders
  const prereqsMet = order.requiredOrderIds.every(id => completedIds.has(id))
  const immediate = order.minOrders === 0 && order.requiredOrderIds.length === 0 && order.resources.length === 0 && order.actions.length === 0

  const isReady = prereqsMet && countMet && !isCompleted
  const barColor = isCompleted ? 'bg-emerald-500/60' : isReady ? 'bg-cyan-400' : 'bg-slate-700/40'
  const topGrad = isCompleted ? 'from-emerald-500/50' : isReady ? 'from-cyan-400/60' : 'from-slate-600/20'
  const statusColor = isCompleted ? 'text-emerald-300' : isReady ? 'text-cyan-300' : 'text-slate-400'
  const statusText = isCompleted ? 'Done' : isReady ? 'Ready' : 'Locked'

  return createPortal(
    <div
      style={{ position: 'fixed', left: x, top: y, width: 288, maxWidth: 'calc(100vw - 16px)', zIndex: 9999 }}
      className="relative overflow-hidden rounded-sm shadow-2xl shadow-black/70 pointer-events-none"
    >
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${topGrad} to-transparent`} />
      <div className={`absolute top-0 left-0 bottom-0 w-[2px] ${barColor}`} />
      <div className="border border-cyan-700/35 bg-[#091B30]/97 backdrop-blur-xl pl-4 pr-3 py-2.5 space-y-1.5">
        <div className="flex items-center gap-2 border-b border-slate-700/35 pb-1.5 mb-1">
          <span className="font-orbitron text-[10px] font-semibold tracking-[0.15em] text-white uppercase">
            Order {orderId}
          </span>
          <span className={`font-orbitron text-[8px] tracking-[0.1em] uppercase ml-auto font-semibold ${statusColor}`}>
            {statusText}
          </span>
        </div>

        {immediate ? (
          <p className="text-xs text-emerald-400 font-spacemono">Available immediately</p>
        ) : (
          <div className="space-y-1">
            {order.minOrders > 0 && (
              <RequirementRow state={countMet ? 'met' : 'unmet'}>
                Complete {order.minOrders}+ orders
              </RequirementRow>
            )}
            {order.requiredOrderIds.map(id => (
              <RequirementRow key={id} state={completedIds.has(id) ? 'met' : 'unmet'}>
                Complete Order {id}
              </RequirementRow>
            ))}
            {order.resources.map(r => {
              const icon = RESOURCE_ICONS[r.item]
              return (
                <RequirementRow key={r.item} state={meetsRequirement(stats.resources[r.item], r.quantityDisplay)} kind="resource">
                  Acquire {r.quantityDisplay !== null ? `${fmtQty(r.quantityDisplay)}+ ` : 'any '}
                  {icon && <img src={icon} alt="" aria-hidden="true" className="inline-block w-3.5 h-3.5 object-contain align-middle mx-0.5" />}
                  {r.item}
                </RequirementRow>
              )
            })}
            {order.actions.map(a => {
              const isCI = a.type === 'chad_infusion'
              const playerStr = isCI ? stats.tiLevel : stats.potionsCrafted
              const actionState: ReqState = playerStr?.trim()
                ? (parseQuantity(playerStr) ?? 0n) >= BigInt(a.quantity) ? 'met' : 'unmet'
                : 'unknown'
              const icon = ACTION_ICONS[a.type]
              return (
                <RequirementRow key={a.type} state={actionState} kind="action">
                  {icon && <img src={icon} alt="" aria-hidden="true" className="inline-block w-3.5 h-3.5 object-contain align-middle mr-1" />}
                  {isCI
                    ? `TI Level ${a.quantity}+`
                    : `Craft ${a.quantity}+ Endurance Potion${a.quantity > 1 ? 's' : ''}`}
                </RequirementRow>
              )
            })}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
