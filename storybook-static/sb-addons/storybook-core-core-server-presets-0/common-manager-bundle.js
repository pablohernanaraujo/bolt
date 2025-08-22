try {
  (() => {
    var j = __STORYBOOK_API__,
      {
        ActiveTabs: k,
        Consumer: O,
        ManagerContext: T,
        Provider: h,
        RequestResponseError: U,
        addons: l,
        combineParameters: f,
        controlOrMetaKey: v,
        controlOrMetaSymbol: A,
        eventMatchesShortcut: D,
        eventToShortcut: x,
        experimental_MockUniversalStore: P,
        experimental_UniversalStore: M,
        experimental_requestResponse: R,
        experimental_useUniversalStore: C,
        isMacLike: w,
        isShortcutTaken: B,
        keyToSymbol: E,
        merge: I,
        mockChannel: K,
        optionOrAltSymbol: N,
        shortcutMatchesShortcut: G,
        shortcutToHumanString: L,
        types: Y,
        useAddonState: q,
        useArgTypes: F,
        useArgs: H,
        useChannel: V,
        useGlobalTypes: z,
        useGlobals: J,
        useParameter: Q,
        useSharedState: W,
        useStoryPrepared: X,
        useStorybookApi: Z,
        useStorybookState: $,
      } = __STORYBOOK_API__;
    var m = (() => {
        let e;
        return (
          typeof window < 'u'
            ? (e = window)
            : typeof globalThis < 'u'
              ? (e = globalThis)
              : typeof window < 'u'
                ? (e = window)
                : typeof self < 'u'
                  ? (e = self)
                  : (e = {}),
          e
        );
      })(),
      p = 'tag-filters',
      i = 'static-filter';
    l.register(p, (e) => {
      let u = Object.entries(m.TAGS_OPTIONS ?? {}).reduce((o, s) => {
        let [t, d] = s;
        return (d.excludeFromSidebar && (o[t] = !0), o);
      }, {});
      e.experimental_setFilter(i, (o) => {
        let s = o.tags ?? [];
        return (
          (s.includes('dev') || o.type === 'docs') &&
          s.filter((t) => u[t]).length === 0
        );
      });
    });
  })();
} catch (e) {
  console.error(
    '[Storybook] One of your manager-entries failed: ' + import.meta.url,
    e,
  );
}
