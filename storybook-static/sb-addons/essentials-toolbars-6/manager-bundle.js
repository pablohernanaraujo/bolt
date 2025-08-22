try {
  (() => {
    var a = __REACT__,
      {
        Children: le,
        Component: ie,
        Fragment: ue,
        Profiler: ce,
        PureComponent: pe,
        StrictMode: de,
        Suspense: me,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: be,
        cloneElement: _e,
        createContext: ye,
        createElement: Se,
        createFactory: Te,
        createRef: Oe,
        forwardRef: ve,
        isValidElement: Ce,
        lazy: fe,
        memo: ge,
        startTransition: ke,
        unstable_act: Ie,
        useCallback: v,
        useContext: Ee,
        useDebugValue: xe,
        useDeferredValue: Ae,
        useEffect: E,
        useId: Re,
        useImperativeHandle: he,
        useInsertionEffect: De,
        useLayoutEffect: Le,
        useMemo: Be,
        useReducer: Pe,
        useRef: D,
        useState: L,
        useSyncExternalStore: je,
        useTransition: Me,
        version: Ne,
      } = __REACT__;
    var We = __STORYBOOK_API__,
      {
        ActiveTabs: Fe,
        Consumer: Ge,
        ManagerContext: Ke,
        Provider: Ye,
        RequestResponseError: $e,
        addons: x,
        combineParameters: qe,
        controlOrMetaKey: ze,
        controlOrMetaSymbol: Ze,
        eventMatchesShortcut: Je,
        eventToShortcut: Qe,
        experimental_MockUniversalStore: Xe,
        experimental_UniversalStore: et,
        experimental_requestResponse: tt,
        experimental_useUniversalStore: ot,
        isMacLike: rt,
        isShortcutTaken: nt,
        keyToSymbol: at,
        merge: st,
        mockChannel: lt,
        optionOrAltSymbol: it,
        shortcutMatchesShortcut: ut,
        shortcutToHumanString: ct,
        types: B,
        useAddonState: pt,
        useArgTypes: dt,
        useArgs: mt,
        useChannel: bt,
        useGlobalTypes: P,
        useGlobals: A,
        useParameter: _t,
        useSharedState: yt,
        useStoryPrepared: St,
        useStorybookApi: j,
        useStorybookState: Tt,
      } = __STORYBOOK_API__;
    var gt = __STORYBOOK_COMPONENTS__,
      {
        A: kt,
        ActionBar: It,
        AddonPanel: Et,
        Badge: xt,
        Bar: At,
        Blockquote: Rt,
        Button: ht,
        ClipboardCode: Dt,
        Code: Lt,
        DL: Bt,
        Div: Pt,
        DocumentWrapper: jt,
        EmptyTabContent: Mt,
        ErrorFormatter: Nt,
        FlexBar: Ut,
        Form: Vt,
        H1: wt,
        H2: Ht,
        H3: Wt,
        H4: Ft,
        H5: Gt,
        H6: Kt,
        HR: Yt,
        IconButton: M,
        IconButtonSkeleton: $t,
        Icons: R,
        Img: qt,
        LI: zt,
        Link: Zt,
        ListItem: Jt,
        Loader: Qt,
        Modal: Xt,
        OL: eo,
        P: to,
        Placeholder: oo,
        Pre: ro,
        ProgressSpinner: no,
        ResetWrapper: ao,
        ScrollArea: so,
        Separator: N,
        Spaced: lo,
        Span: io,
        StorybookIcon: uo,
        StorybookLogo: co,
        Symbols: po,
        SyntaxHighlighter: mo,
        TT: bo,
        TabBar: _o,
        TabButton: yo,
        TabWrapper: So,
        Table: To,
        Tabs: Oo,
        TabsState: vo,
        TooltipLinkList: U,
        TooltipMessage: Co,
        TooltipNote: fo,
        UL: go,
        WithTooltip: V,
        WithTooltipPure: ko,
        Zoom: Io,
        codeCommon: Eo,
        components: xo,
        createCopyToClipboardFunction: Ao,
        getStoryHref: Ro,
        icons: ho,
        interleaveSeparators: Do,
        nameSpaceClassNames: Lo,
        resetComponents: Bo,
        withReset: Po,
      } = __STORYBOOK_COMPONENTS__;
    var F = { type: 'item', value: '' },
      G = (o, t) => ({
        ...t,
        name: t.name || o,
        description: t.description || o,
        toolbar: {
          ...t.toolbar,
          items: t.toolbar.items.map((e) => {
            let r = typeof e == 'string' ? { value: e, title: e } : e;
            return (
              r.type === 'reset' &&
                t.toolbar.icon &&
                ((r.icon = t.toolbar.icon), (r.hideIcon = !0)),
              { ...F, ...r }
            );
          }),
        },
      }),
      K = ['reset'],
      Y = (o) => o.filter((t) => !K.includes(t.type)).map((t) => t.value),
      _ = 'addon-toolbars',
      $ = async (o, t, e) => {
        (e &&
          e.next &&
          (await o.setAddonShortcut(_, {
            label: e.next.label,
            defaultShortcut: e.next.keys,
            actionName: `${t}:next`,
            action: e.next.action,
          })),
          e &&
            e.previous &&
            (await o.setAddonShortcut(_, {
              label: e.previous.label,
              defaultShortcut: e.previous.keys,
              actionName: `${t}:previous`,
              action: e.previous.action,
            })),
          e &&
            e.reset &&
            (await o.setAddonShortcut(_, {
              label: e.reset.label,
              defaultShortcut: e.reset.keys,
              actionName: `${t}:reset`,
              action: e.reset.action,
            })));
      },
      q = (o) => (t) => {
        let {
            id: e,
            toolbar: { items: r, shortcuts: n },
          } = t,
          c = j(),
          [y, i] = A(),
          s = D([]),
          u = y[e],
          C = v(() => {
            i({ [e]: '' });
          }, [i]),
          f = v(() => {
            let l = s.current,
              d = l.indexOf(u),
              m = d === l.length - 1 ? 0 : d + 1,
              p = s.current[m];
            i({ [e]: p });
          }, [s, u, i]),
          g = v(() => {
            let l = s.current,
              d = l.indexOf(u),
              m = d > -1 ? d : 0,
              p = m === 0 ? l.length - 1 : m - 1,
              b = s.current[p];
            i({ [e]: b });
          }, [s, u, i]);
        return (
          E(() => {
            n &&
              $(c, e, {
                next: { ...n.next, action: f },
                previous: { ...n.previous, action: g },
                reset: { ...n.reset, action: C },
              });
          }, [c, e, n, f, g, C]),
          E(() => {
            s.current = Y(r);
          }, []),
          a.createElement(o, { cycleValues: s.current, ...t })
        );
      },
      w = ({ currentValue: o, items: t }) =>
        o != null && t.find((e) => e.value === o && e.type !== 'reset'),
      z = ({ currentValue: o, items: t }) => {
        let e = w({ currentValue: o, items: t });
        if (e) return e.icon;
      },
      Z = ({ currentValue: o, items: t }) => {
        let e = w({ currentValue: o, items: t });
        if (e) return e.title;
      },
      J = ({
        active: o,
        disabled: t,
        title: e,
        icon: r,
        description: n,
        onClick: c,
      }) =>
        a.createElement(
          M,
          { active: o, title: n, disabled: t, onClick: t ? () => {} : c },
          r &&
            a.createElement(R, { icon: r, __suppressDeprecationWarning: !0 }),
          e ? `\xA0${e}` : null,
        ),
      Q = ({
        right: o,
        title: t,
        value: e,
        icon: r,
        hideIcon: n,
        onClick: c,
        disabled: y,
        currentValue: i,
      }) => {
        let s =
            r &&
            a.createElement(R, {
              style: { opacity: 1 },
              icon: r,
              __suppressDeprecationWarning: !0,
            }),
          u = {
            id: e ?? '_reset',
            active: i === e,
            right: o,
            title: t,
            disabled: y,
            onClick: c,
          };
        return (r && !n && (u.icon = s), u);
      },
      X = q(
        ({
          id: o,
          name: t,
          description: e,
          toolbar: {
            icon: r,
            items: n,
            title: c,
            preventDynamicIcon: y,
            dynamicTitle: i,
          },
        }) => {
          let [s, u, C] = A(),
            [f, g] = L(!1),
            l = s[o],
            d = !!l,
            m = o in C,
            p = r,
            b = c;
          (y || (p = z({ currentValue: l, items: n }) || p),
            i && (b = Z({ currentValue: l, items: n }) || b),
            !b && !p && console.warn(`Toolbar '${t}' has no title or icon`));
          let H = v(
            (I) => {
              u({ [o]: I });
            },
            [o, u],
          );
          return a.createElement(
            V,
            {
              placement: 'top',
              tooltip: ({ onHide: I }) => {
                let W = n
                  .filter(({ type: k }) => {
                    let h = !0;
                    return (k === 'reset' && !l && (h = !1), h);
                  })
                  .map((k) =>
                    Q({
                      ...k,
                      currentValue: l,
                      disabled: m,
                      onClick: () => {
                        (H(k.value), I());
                      },
                    }),
                  );
                return a.createElement(U, { links: W });
              },
              closeOnOutsideClick: !0,
              onVisibleChange: g,
            },
            a.createElement(J, {
              active: f || d,
              disabled: m,
              description: e || '',
              icon: p,
              title: b || '',
            }),
          );
        },
      ),
      ee = () => {
        let o = P(),
          t = Object.keys(o).filter((e) => !!o[e].toolbar);
        return t.length
          ? a.createElement(
              a.Fragment,
              null,
              a.createElement(N, null),
              t.map((e) => {
                let r = G(e, o[e]);
                return a.createElement(X, { key: e, id: e, ...r });
              }),
            )
          : null;
      };
    x.register(_, () =>
      x.add(_, {
        title: _,
        type: B.TOOL,
        match: ({ tabId: o }) => !o,
        render: () => a.createElement(ee, null),
      }),
    );
  })();
} catch (e) {
  console.error(
    '[Storybook] One of your manager-entries failed: ' + import.meta.url,
    e,
  );
}
