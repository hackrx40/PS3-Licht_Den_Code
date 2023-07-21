import React from 'react'

export default function Stats() {
  return (
    <div class="py-10 sm:py-12">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div class="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt class="text-base leading-7 text-white">Stock Recommendation</dt>
            <dd class="order-first text-3xl font-semibold tracking-tight text-slate-200 sm:text-5xl">Watchlist</dd>
            </div>
            <div class="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt class="text-base leading-7 text-white">Article Sentiment Analytics</dt>
            <dd class="order-first text-3xl font-semibold tracking-tight text-slate-200 sm:text-5xl">FinBERT</dd>
            </div>
            <div class="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt class="text-base leading-7 text-white">New users annually</dt>
            <dd class="order-first text-3xl font-semibold tracking-tight text-slate-200 sm:text-5xl">63,000</dd>
            </div>
        </dl>
        </div>
    </div>
  )
}
