<script lang="ts">
  import { page } from '$app/state';
  import { m } from '$lib/paraglide/messages.js';
  import { localizeHref } from '$lib/paraglide/runtime';

  const homeHref = localizeHref('/');
</script>

<svelte:head>
  <title>{page.status === 404 ? m.not_found_title() : m.error_generic_title()}</title>
</svelte:head>

<main
  class="relative min-h-screen overflow-hidden bg-[linear-gradient(145deg,#f3fbff_0%,#f7f8ff_45%,#f8fbf4_100%)] px-5 py-12 text-[#164e63] sm:px-8"
>
  <div
    class="pointer-events-none absolute left-[-160px] top-[-160px] h-80 w-80 rounded-full bg-[#22d3ee]/18 blur-3xl"
  ></div>
  <div
    class="pointer-events-none absolute bottom-[-180px] right-[-160px] h-96 w-96 rounded-full bg-[#22c55e]/12 blur-3xl"
  ></div>

  <section class="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-3xl items-center justify-center">
    <article
      class="w-full rounded-3xl border border-white/70 bg-white/82 p-8 shadow-[0_24px_70px_-28px_rgba(8,145,178,0.45)] backdrop-blur-sm sm:p-10"
    >
      <p
        class="inline-flex rounded-full border border-[#0891b2]/25 bg-[#ecfeff] px-4 py-1 text-xs font-semibold tracking-[0.22em] text-[#0f766e]"
      >
        {m.not_found_badge()}
      </p>

      <h1 class="mt-6 text-4xl font-bold leading-tight text-[#0e7490] sm:text-5xl">
        {page.status === 404 ? m.not_found_title() : m.error_generic_title()}
      </h1>

      <p class="mt-4 max-w-2xl text-base leading-7 text-[#155e75] sm:text-lg">
        {page.status === 404 ? m.not_found_description() : m.error_generic_description()}
      </p>

      {#if page.status !== 404 && page.error?.message}
        <p class="mt-3 rounded-xl border border-[#0891b2]/20 bg-[#ecfeff]/70 px-4 py-3 text-sm text-[#0c4a6e]">
          {page.error.message}
        </p>
      {/if}

      <a
        class="mt-8 inline-flex min-h-11 items-center rounded-xl bg-[#0891b2] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0e7490] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e7490]"
        href={homeHref}
      >
        {m.not_found_action()}
      </a>
    </article>
  </section>
</main>
