try {
  (() => {
    var me = Object.create;
    var J = Object.defineProperty;
    var he = Object.getOwnPropertyDescriptor;
    var fe = Object.getOwnPropertyNames;
    var ge = Object.getPrototypeOf,
      be = Object.prototype.hasOwnProperty;
    var x = ((e) =>
      typeof require < 'u'
        ? require
        : typeof Proxy < 'u'
          ? new Proxy(e, {
              get: (t, a) => (typeof require < 'u' ? require : t)[a],
            })
          : e)(function (e) {
      if (typeof require < 'u') return require.apply(this, arguments);
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
    var U = (e, t) => () => (e && (t = e((e = 0))), t);
    var ye = (e, t) => () => (
      t || e((t = { exports: {} }).exports, t),
      t.exports
    );
    var we = (e, t, a, c) => {
      if ((t && typeof t == 'object') || typeof t == 'function')
        for (let s of fe(t))
          !be.call(e, s) &&
            s !== a &&
            J(e, s, {
              get: () => t[s],
              enumerable: !(c = he(t, s)) || c.enumerable,
            });
      return e;
    };
    var Se = (e, t, a) => (
      (a = e != null ? me(ge(e)) : {}),
      we(
        t || !e || !e.__esModule
          ? J(a, 'default', { value: e, enumerable: !0 })
          : a,
        e,
      )
    );
    var f = U(() => {});
    var g = U(() => {});
    var b = U(() => {});
    var le = ye((se, Z) => {
      f();
      g();
      b();
      (function (e) {
        if (typeof se == 'object' && typeof Z < 'u') Z.exports = e();
        else if (typeof define == 'function' && define.amd) define([], e);
        else {
          var t;
          (typeof window < 'u' || typeof window < 'u'
            ? (t = window)
            : typeof self < 'u'
              ? (t = self)
              : (t = this),
            (t.memoizerific = e()));
        }
      })(function () {
        var e, t, a;
        return (function c(s, y, d) {
          function o(n, I) {
            if (!y[n]) {
              if (!s[n]) {
                var r = typeof x == 'function' && x;
                if (!I && r) return r(n, !0);
                if (i) return i(n, !0);
                var u = new Error("Cannot find module '" + n + "'");
                throw ((u.code = 'MODULE_NOT_FOUND'), u);
              }
              var p = (y[n] = { exports: {} });
              s[n][0].call(
                p.exports,
                function (h) {
                  var w = s[n][1][h];
                  return o(w || h);
                },
                p,
                p.exports,
                c,
                s,
                y,
                d,
              );
            }
            return y[n].exports;
          }
          for (var i = typeof x == 'function' && x, m = 0; m < d.length; m++)
            o(d[m]);
          return o;
        })(
          {
            1: [
              function (c, s, y) {
                s.exports = function (d) {
                  if (typeof Map != 'function' || d) {
                    var o = c('./similar');
                    return new o();
                  } else return new Map();
                };
              },
              { './similar': 2 },
            ],
            2: [
              function (c, s, y) {
                function d() {
                  return (
                    (this.list = []),
                    (this.lastItem = void 0),
                    (this.size = 0),
                    this
                  );
                }
                ((d.prototype.get = function (o) {
                  var i;
                  if (this.lastItem && this.isEqual(this.lastItem.key, o))
                    return this.lastItem.val;
                  if (((i = this.indexOf(o)), i >= 0))
                    return ((this.lastItem = this.list[i]), this.list[i].val);
                }),
                  (d.prototype.set = function (o, i) {
                    var m;
                    return this.lastItem && this.isEqual(this.lastItem.key, o)
                      ? ((this.lastItem.val = i), this)
                      : ((m = this.indexOf(o)),
                        m >= 0
                          ? ((this.lastItem = this.list[m]),
                            (this.list[m].val = i),
                            this)
                          : ((this.lastItem = { key: o, val: i }),
                            this.list.push(this.lastItem),
                            this.size++,
                            this));
                  }),
                  (d.prototype.delete = function (o) {
                    var i;
                    if (
                      (this.lastItem &&
                        this.isEqual(this.lastItem.key, o) &&
                        (this.lastItem = void 0),
                      (i = this.indexOf(o)),
                      i >= 0)
                    )
                      return (this.size--, this.list.splice(i, 1)[0]);
                  }),
                  (d.prototype.has = function (o) {
                    var i;
                    return this.lastItem && this.isEqual(this.lastItem.key, o)
                      ? !0
                      : ((i = this.indexOf(o)),
                        i >= 0 ? ((this.lastItem = this.list[i]), !0) : !1);
                  }),
                  (d.prototype.forEach = function (o, i) {
                    var m;
                    for (m = 0; m < this.size; m++)
                      o.call(
                        i || this,
                        this.list[m].val,
                        this.list[m].key,
                        this,
                      );
                  }),
                  (d.prototype.indexOf = function (o) {
                    var i;
                    for (i = 0; i < this.size; i++)
                      if (this.isEqual(this.list[i].key, o)) return i;
                    return -1;
                  }),
                  (d.prototype.isEqual = function (o, i) {
                    return o === i || (o !== o && i !== i);
                  }),
                  (s.exports = d));
              },
              {},
            ],
            3: [
              function (c, s, y) {
                var d = c('map-or-similar');
                s.exports = function (n) {
                  var I = new d(!1),
                    r = [];
                  return function (u) {
                    var p = function () {
                      var h = I,
                        w,
                        T,
                        S = arguments.length - 1,
                        D = Array(S + 1),
                        R = !0,
                        _;
                      if ((p.numArgs || p.numArgs === 0) && p.numArgs !== S + 1)
                        throw new Error(
                          'Memoizerific functions should always be called with the same number of arguments',
                        );
                      for (_ = 0; _ < S; _++) {
                        if (
                          ((D[_] = { cacheItem: h, arg: arguments[_] }),
                          h.has(arguments[_]))
                        ) {
                          h = h.get(arguments[_]);
                          continue;
                        }
                        ((R = !1),
                          (w = new d(!1)),
                          h.set(arguments[_], w),
                          (h = w));
                      }
                      return (
                        R &&
                          (h.has(arguments[S])
                            ? (T = h.get(arguments[S]))
                            : (R = !1)),
                        R ||
                          ((T = u.apply(null, arguments)),
                          h.set(arguments[S], T)),
                        n > 0 &&
                          ((D[S] = { cacheItem: h, arg: arguments[S] }),
                          R ? o(r, D) : r.push(D),
                          r.length > n && i(r.shift())),
                        (p.wasMemoized = R),
                        (p.numArgs = S + 1),
                        T
                      );
                    };
                    return (
                      (p.limit = n),
                      (p.wasMemoized = !1),
                      (p.cache = I),
                      (p.lru = r),
                      p
                    );
                  };
                };
                function o(n, I) {
                  var r = n.length,
                    u = I.length,
                    p,
                    h,
                    w;
                  for (h = 0; h < r; h++) {
                    for (p = !0, w = 0; w < u; w++)
                      if (!m(n[h][w].arg, I[w].arg)) {
                        p = !1;
                        break;
                      }
                    if (p) break;
                  }
                  n.push(n.splice(h, 1)[0]);
                }
                function i(n) {
                  var I = n.length,
                    r = n[I - 1],
                    u,
                    p;
                  for (
                    r.cacheItem.delete(r.arg), p = I - 2;
                    p >= 0 &&
                    ((r = n[p]), (u = r.cacheItem.get(r.arg)), !u || !u.size);
                    p--
                  )
                    r.cacheItem.delete(r.arg);
                }
                function m(n, I) {
                  return n === I || (n !== n && I !== I);
                }
              },
              { 'map-or-similar': 1 },
            ],
          },
          {},
          [3],
        )(3);
      });
    });
    f();
    g();
    b();
    f();
    g();
    b();
    f();
    g();
    b();
    f();
    g();
    b();
    var l = __REACT__,
      {
        Children: $e,
        Component: Je,
        Fragment: M,
        Profiler: Qe,
        PureComponent: Xe,
        StrictMode: et,
        Suspense: tt,
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ot,
        cloneElement: nt,
        createContext: rt,
        createElement: N,
        createFactory: it,
        createRef: at,
        forwardRef: st,
        isValidElement: lt,
        lazy: ct,
        memo: Q,
        startTransition: ut,
        unstable_act: pt,
        useCallback: X,
        useContext: dt,
        useDebugValue: It,
        useDeferredValue: mt,
        useEffect: O,
        useId: ht,
        useImperativeHandle: ft,
        useInsertionEffect: gt,
        useLayoutEffect: bt,
        useMemo: yt,
        useReducer: wt,
        useRef: ee,
        useState: z,
        useSyncExternalStore: St,
        useTransition: vt,
        version: _t,
      } = __REACT__;
    f();
    g();
    b();
    var Tt = __STORYBOOK_API__,
      {
        ActiveTabs: Rt,
        Consumer: At,
        ManagerContext: xt,
        Provider: Ot,
        RequestResponseError: Lt,
        addons: H,
        combineParameters: Bt,
        controlOrMetaKey: Pt,
        controlOrMetaSymbol: Dt,
        eventMatchesShortcut: Mt,
        eventToShortcut: Vt,
        experimental_MockUniversalStore: Ut,
        experimental_UniversalStore: Nt,
        experimental_requestResponse: zt,
        experimental_useUniversalStore: Ht,
        isMacLike: Gt,
        isShortcutTaken: jt,
        keyToSymbol: Ft,
        merge: qt,
        mockChannel: Wt,
        optionOrAltSymbol: Yt,
        shortcutMatchesShortcut: Kt,
        shortcutToHumanString: Zt,
        types: te,
        useAddonState: $t,
        useArgTypes: Jt,
        useArgs: Qt,
        useChannel: Xt,
        useGlobalTypes: eo,
        useGlobals: G,
        useParameter: j,
        useSharedState: to,
        useStoryPrepared: oo,
        useStorybookApi: oe,
        useStorybookState: no,
      } = __STORYBOOK_API__;
    f();
    g();
    b();
    var lo = __STORYBOOK_COMPONENTS__,
      {
        A: co,
        ActionBar: uo,
        AddonPanel: po,
        Badge: Io,
        Bar: mo,
        Blockquote: ho,
        Button: fo,
        ClipboardCode: go,
        Code: bo,
        DL: yo,
        Div: wo,
        DocumentWrapper: So,
        EmptyTabContent: vo,
        ErrorFormatter: _o,
        FlexBar: Co,
        Form: ko,
        H1: Eo,
        H2: To,
        H3: Ro,
        H4: Ao,
        H5: xo,
        H6: Oo,
        HR: Lo,
        IconButton: L,
        IconButtonSkeleton: Bo,
        Icons: Po,
        Img: Do,
        LI: Mo,
        Link: Vo,
        ListItem: Uo,
        Loader: No,
        Modal: zo,
        OL: Ho,
        P: Go,
        Placeholder: jo,
        Pre: Fo,
        ProgressSpinner: qo,
        ResetWrapper: Wo,
        ScrollArea: Yo,
        Separator: Ko,
        Spaced: Zo,
        Span: $o,
        StorybookIcon: Jo,
        StorybookLogo: Qo,
        Symbols: Xo,
        SyntaxHighlighter: en,
        TT: tn,
        TabBar: on,
        TabButton: nn,
        TabWrapper: rn,
        Table: an,
        Tabs: sn,
        TabsState: ln,
        TooltipLinkList: F,
        TooltipMessage: cn,
        TooltipNote: un,
        UL: pn,
        WithTooltip: q,
        WithTooltipPure: dn,
        Zoom: In,
        codeCommon: mn,
        components: hn,
        createCopyToClipboardFunction: fn,
        getStoryHref: gn,
        icons: bn,
        interleaveSeparators: yn,
        nameSpaceClassNames: wn,
        resetComponents: Sn,
        withReset: vn,
      } = __STORYBOOK_COMPONENTS__;
    f();
    g();
    b();
    var Tn = __STORYBOOK_THEMING__,
      {
        CacheProvider: Rn,
        ClassNames: An,
        Global: W,
        ThemeProvider: xn,
        background: On,
        color: Ln,
        convert: Bn,
        create: Pn,
        createCache: Dn,
        createGlobal: Mn,
        createReset: Vn,
        css: Un,
        darken: Nn,
        ensure: zn,
        ignoreSsrWarning: Hn,
        isPropValid: Gn,
        jsx: jn,
        keyframes: Fn,
        lighten: qn,
        styled: v,
        themes: Wn,
        typography: Yn,
        useTheme: Kn,
        withTheme: Zn,
      } = __STORYBOOK_THEMING__;
    f();
    g();
    b();
    var er = __STORYBOOK_ICONS__,
      {
        AccessibilityAltIcon: tr,
        AccessibilityIcon: or,
        AccessibilityIgnoredIcon: nr,
        AddIcon: rr,
        AdminIcon: ir,
        AlertAltIcon: ar,
        AlertIcon: sr,
        AlignLeftIcon: lr,
        AlignRightIcon: cr,
        AppleIcon: ur,
        ArrowBottomLeftIcon: pr,
        ArrowBottomRightIcon: dr,
        ArrowDownIcon: Ir,
        ArrowLeftIcon: mr,
        ArrowRightIcon: hr,
        ArrowSolidDownIcon: fr,
        ArrowSolidLeftIcon: gr,
        ArrowSolidRightIcon: br,
        ArrowSolidUpIcon: yr,
        ArrowTopLeftIcon: wr,
        ArrowTopRightIcon: Sr,
        ArrowUpIcon: vr,
        AzureDevOpsIcon: _r,
        BackIcon: Cr,
        BasketIcon: kr,
        BatchAcceptIcon: Er,
        BatchDenyIcon: Tr,
        BeakerIcon: Rr,
        BellIcon: Ar,
        BitbucketIcon: xr,
        BoldIcon: Or,
        BookIcon: Lr,
        BookmarkHollowIcon: Br,
        BookmarkIcon: Pr,
        BottomBarIcon: Dr,
        BottomBarToggleIcon: Mr,
        BoxIcon: Vr,
        BranchIcon: Ur,
        BrowserIcon: ne,
        ButtonIcon: Nr,
        CPUIcon: zr,
        CalendarIcon: Hr,
        CameraIcon: Gr,
        CameraStabilizeIcon: jr,
        CategoryIcon: Fr,
        CertificateIcon: qr,
        ChangedIcon: Wr,
        ChatIcon: Yr,
        CheckIcon: Kr,
        ChevronDownIcon: Zr,
        ChevronLeftIcon: $r,
        ChevronRightIcon: Jr,
        ChevronSmallDownIcon: Qr,
        ChevronSmallLeftIcon: Xr,
        ChevronSmallRightIcon: ei,
        ChevronSmallUpIcon: ti,
        ChevronUpIcon: oi,
        ChromaticIcon: ni,
        ChromeIcon: ri,
        CircleHollowIcon: ii,
        CircleIcon: ai,
        ClearIcon: si,
        CloseAltIcon: li,
        CloseIcon: ci,
        CloudHollowIcon: ui,
        CloudIcon: pi,
        CogIcon: di,
        CollapseIcon: Ii,
        CommandIcon: mi,
        CommentAddIcon: hi,
        CommentIcon: fi,
        CommentsIcon: gi,
        CommitIcon: bi,
        CompassIcon: yi,
        ComponentDrivenIcon: wi,
        ComponentIcon: Si,
        ContrastIcon: vi,
        ContrastIgnoredIcon: _i,
        ControlsIcon: Ci,
        CopyIcon: ki,
        CreditIcon: Ei,
        CrossIcon: Ti,
        DashboardIcon: Ri,
        DatabaseIcon: Ai,
        DeleteIcon: xi,
        DiamondIcon: Oi,
        DirectionIcon: Li,
        DiscordIcon: Bi,
        DocChartIcon: Pi,
        DocListIcon: Di,
        DocumentIcon: Mi,
        DownloadIcon: Vi,
        DragIcon: Ui,
        EditIcon: Ni,
        EllipsisIcon: zi,
        EmailIcon: Hi,
        ExpandAltIcon: Gi,
        ExpandIcon: ji,
        EyeCloseIcon: Fi,
        EyeIcon: qi,
        FaceHappyIcon: Wi,
        FaceNeutralIcon: Yi,
        FaceSadIcon: Ki,
        FacebookIcon: Zi,
        FailedIcon: $i,
        FastForwardIcon: Ji,
        FigmaIcon: Qi,
        FilterIcon: Xi,
        FlagIcon: ea,
        FolderIcon: ta,
        FormIcon: oa,
        GDriveIcon: na,
        GithubIcon: ra,
        GitlabIcon: ia,
        GlobeIcon: aa,
        GoogleIcon: sa,
        GraphBarIcon: la,
        GraphLineIcon: ca,
        GraphqlIcon: ua,
        GridAltIcon: pa,
        GridIcon: da,
        GrowIcon: Y,
        HeartHollowIcon: Ia,
        HeartIcon: ma,
        HomeIcon: ha,
        HourglassIcon: fa,
        InfoIcon: ga,
        ItalicIcon: ba,
        JumpToIcon: ya,
        KeyIcon: wa,
        LightningIcon: Sa,
        LightningOffIcon: va,
        LinkBrokenIcon: _a,
        LinkIcon: Ca,
        LinkedinIcon: ka,
        LinuxIcon: Ea,
        ListOrderedIcon: Ta,
        ListUnorderedIcon: Ra,
        LocationIcon: Aa,
        LockIcon: xa,
        MarkdownIcon: Oa,
        MarkupIcon: La,
        MediumIcon: Ba,
        MemoryIcon: Pa,
        MenuIcon: Da,
        MergeIcon: Ma,
        MirrorIcon: Va,
        MobileIcon: re,
        MoonIcon: Ua,
        NutIcon: Na,
        OutboxIcon: za,
        OutlineIcon: Ha,
        PaintBrushIcon: Ga,
        PaperClipIcon: ja,
        ParagraphIcon: Fa,
        PassedIcon: qa,
        PhoneIcon: Wa,
        PhotoDragIcon: Ya,
        PhotoIcon: Ka,
        PhotoStabilizeIcon: Za,
        PinAltIcon: $a,
        PinIcon: Ja,
        PlayAllHollowIcon: Qa,
        PlayBackIcon: Xa,
        PlayHollowIcon: es,
        PlayIcon: ts,
        PlayNextIcon: os,
        PlusIcon: ns,
        PointerDefaultIcon: rs,
        PointerHandIcon: is,
        PowerIcon: as,
        PrintIcon: ss,
        ProceedIcon: ls,
        ProfileIcon: cs,
        PullRequestIcon: us,
        QuestionIcon: ps,
        RSSIcon: ds,
        RedirectIcon: Is,
        ReduxIcon: ms,
        RefreshIcon: ie,
        ReplyIcon: hs,
        RepoIcon: fs,
        RequestChangeIcon: gs,
        RewindIcon: bs,
        RulerIcon: ys,
        SaveIcon: ws,
        SearchIcon: Ss,
        ShareAltIcon: vs,
        ShareIcon: _s,
        ShieldIcon: Cs,
        SideBySideIcon: ks,
        SidebarAltIcon: Es,
        SidebarAltToggleIcon: Ts,
        SidebarIcon: Rs,
        SidebarToggleIcon: As,
        SpeakerIcon: xs,
        StackedIcon: Os,
        StarHollowIcon: Ls,
        StarIcon: Bs,
        StatusFailIcon: Ps,
        StatusIcon: Ds,
        StatusPassIcon: Ms,
        StatusWarnIcon: Vs,
        StickerIcon: Us,
        StopAltHollowIcon: Ns,
        StopAltIcon: zs,
        StopIcon: Hs,
        StorybookIcon: Gs,
        StructureIcon: js,
        SubtractIcon: Fs,
        SunIcon: qs,
        SupportIcon: Ws,
        SweepIcon: Ys,
        SwitchAltIcon: Ks,
        SyncIcon: Zs,
        TabletIcon: ae,
        ThumbsUpIcon: $s,
        TimeIcon: Js,
        TimerIcon: Qs,
        TransferIcon: K,
        TrashIcon: Xs,
        TwitterIcon: el,
        TypeIcon: tl,
        UbuntuIcon: ol,
        UndoIcon: nl,
        UnfoldIcon: rl,
        UnlockIcon: il,
        UnpinIcon: al,
        UploadIcon: sl,
        UserAddIcon: ll,
        UserAltIcon: cl,
        UserIcon: ul,
        UsersIcon: pl,
        VSCodeIcon: dl,
        VerifiedIcon: Il,
        VideoIcon: ml,
        WandIcon: hl,
        WatchIcon: fl,
        WindowsIcon: gl,
        WrenchIcon: bl,
        XIcon: yl,
        YoutubeIcon: wl,
        ZoomIcon: Sl,
        ZoomOutIcon: vl,
        ZoomResetIcon: _l,
        iconList: Cl,
      } = __STORYBOOK_ICONS__;
    var $ = Se(le()),
      B = 'storybook/viewport',
      A = 'viewport',
      pe = {
        mobile1: {
          name: 'Small mobile',
          styles: { height: '568px', width: '320px' },
          type: 'mobile',
        },
        mobile2: {
          name: 'Large mobile',
          styles: { height: '896px', width: '414px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { height: '1112px', width: '834px' },
          type: 'tablet',
        },
      },
      P = {
        name: 'Reset viewport',
        styles: { height: '100%', width: '100%' },
        type: 'desktop',
      },
      _e = { [A]: { value: void 0, isRotated: !1 } },
      Ce = { viewport: 'reset', viewportRotated: !1 },
      ke = globalThis.FEATURES?.viewportStoryGlobals ? _e : Ce,
      de = (e, t) => e.indexOf(t),
      Ee = (e, t) => {
        let a = de(e, t);
        return a === e.length - 1 ? e[0] : e[a + 1];
      },
      Te = (e, t) => {
        let a = de(e, t);
        return a < 1 ? e[e.length - 1] : e[a - 1];
      },
      Ie = async (e, t, a, c) => {
        (await e.setAddonShortcut(B, {
          label: 'Previous viewport',
          defaultShortcut: ['alt', 'shift', 'V'],
          actionName: 'previous',
          action: () => {
            a({ viewport: Te(c, t) });
          },
        }),
          await e.setAddonShortcut(B, {
            label: 'Next viewport',
            defaultShortcut: ['alt', 'V'],
            actionName: 'next',
            action: () => {
              a({ viewport: Ee(c, t) });
            },
          }),
          await e.setAddonShortcut(B, {
            label: 'Reset viewport',
            defaultShortcut: ['alt', 'control', 'V'],
            actionName: 'reset',
            action: () => {
              a(ke);
            },
          }));
      },
      Re = v.div({ display: 'inline-flex', alignItems: 'center' }),
      ce = v.div(({ theme: e }) => ({
        display: 'inline-block',
        textDecoration: 'none',
        padding: 10,
        fontWeight: e.typography.weight.bold,
        fontSize: e.typography.size.s2 - 1,
        lineHeight: '1',
        height: 40,
        border: 'none',
        borderTop: '3px solid transparent',
        borderBottom: '3px solid transparent',
        background: 'transparent',
      })),
      Ae = v(L)(() => ({ display: 'inline-flex', alignItems: 'center' })),
      xe = v.div(({ theme: e }) => ({
        fontSize: e.typography.size.s2 - 1,
        marginLeft: 10,
      })),
      Oe = {
        desktop: l.createElement(ne, null),
        mobile: l.createElement(re, null),
        tablet: l.createElement(ae, null),
        other: l.createElement(M, null),
      },
      Le = ({ api: e }) => {
        let t = j(A),
          [a, c, s] = G(),
          [y, d] = z(!1),
          { options: o = pe, disable: i } = t || {},
          m = a?.[A] || {},
          n = m.value,
          I = m.isRotated,
          r = o[n] || P,
          u = y || r !== P,
          p = A in s,
          h = Object.keys(o).length;
        if (
          (O(() => {
            Ie(e, n, c, Object.keys(o));
          }, [o, n, c, e]),
          r.styles === null || !o || h < 1)
        )
          return null;
        if (typeof r.styles == 'function')
          return (
            console.warn(
              'Addon Viewport no longer supports dynamic styles using a function, use css calc() instead',
            ),
            null
          );
        let w = I ? r.styles.height : r.styles.width,
          T = I ? r.styles.width : r.styles.height;
        return i
          ? null
          : l.createElement(Be, {
              item: r,
              updateGlobals: c,
              viewportMap: o,
              viewportName: n,
              isRotated: I,
              setIsTooltipVisible: d,
              isLocked: p,
              isActive: u,
              width: w,
              height: T,
            });
      },
      Be = l.memo(function (e) {
        let {
            item: t,
            viewportMap: a,
            viewportName: c,
            isRotated: s,
            updateGlobals: y,
            setIsTooltipVisible: d,
            isLocked: o,
            isActive: i,
            width: m,
            height: n,
          } = e,
          I = X((r) => y({ [A]: r }), [y]);
        return l.createElement(
          M,
          null,
          l.createElement(
            q,
            {
              placement: 'bottom',
              tooltip: ({ onHide: r }) =>
                l.createElement(F, {
                  links: [
                    ...(length > 0 && t !== P
                      ? [
                          {
                            id: 'reset',
                            title: 'Reset viewport',
                            icon: l.createElement(ie, null),
                            onClick: () => {
                              (I({ value: void 0, isRotated: !1 }), r());
                            },
                          },
                        ]
                      : []),
                    ...Object.entries(a).map(([u, p]) => ({
                      id: u,
                      title: p.name,
                      icon: Oe[p.type],
                      active: u === c,
                      onClick: () => {
                        (I({ value: u, isRotated: !1 }), r());
                      },
                    })),
                  ].flat(),
                }),
              closeOnOutsideClick: !0,
              onVisibleChange: d,
            },
            l.createElement(
              Ae,
              {
                disabled: o,
                key: 'viewport',
                title: 'Change the size of the preview',
                active: i,
                onDoubleClick: () => {
                  I({ value: void 0, isRotated: !1 });
                },
              },
              l.createElement(Y, null),
              t !== P
                ? l.createElement(xe, null, t.name, ' ', s ? '(L)' : '(P)')
                : null,
            ),
          ),
          l.createElement(W, {
            styles: {
              'iframe[data-is-storybook="true"]': { width: m, height: n },
            },
          }),
          t !== P
            ? l.createElement(
                Re,
                null,
                l.createElement(
                  ce,
                  { title: 'Viewport width' },
                  m.replace('px', ''),
                ),
                o
                  ? '/'
                  : l.createElement(
                      L,
                      {
                        key: 'viewport-rotate',
                        title: 'Rotate viewport',
                        onClick: () => {
                          I({ value: c, isRotated: !s });
                        },
                      },
                      l.createElement(K, null),
                    ),
                l.createElement(
                  ce,
                  { title: 'Viewport height' },
                  n.replace('px', ''),
                ),
              )
            : null,
        );
      }),
      Pe = (0, $.default)(50)((e) => [
        ...De,
        ...Object.entries(e).map(([t, { name: a, ...c }]) => ({
          ...c,
          id: t,
          title: a,
        })),
      ]),
      V = { id: 'reset', title: 'Reset viewport', styles: null, type: 'other' },
      De = [V],
      Me = (0, $.default)(50)((e, t, a, c) =>
        e
          .filter((s) => s.id !== V.id || t.id !== s.id)
          .map((s) => ({
            ...s,
            onClick: () => {
              (a({ viewport: s.id }), c());
            },
          })),
      ),
      Ve = ({ width: e, height: t, ...a }) => ({ ...a, height: e, width: t }),
      Ue = v.div({ display: 'inline-flex', alignItems: 'center' }),
      ue = v.div(({ theme: e }) => ({
        display: 'inline-block',
        textDecoration: 'none',
        padding: 10,
        fontWeight: e.typography.weight.bold,
        fontSize: e.typography.size.s2 - 1,
        lineHeight: '1',
        height: 40,
        border: 'none',
        borderTop: '3px solid transparent',
        borderBottom: '3px solid transparent',
        background: 'transparent',
      })),
      Ne = v(L)(() => ({ display: 'inline-flex', alignItems: 'center' })),
      ze = v.div(({ theme: e }) => ({
        fontSize: e.typography.size.s2 - 1,
        marginLeft: 10,
      })),
      He = (e, t, a) => {
        if (t === null) return;
        let c = typeof t == 'function' ? t(e) : t;
        return a ? Ve(c) : c;
      },
      Ge = Q(function () {
        let [e, t] = G(),
          {
            viewports: a = pe,
            defaultOrientation: c,
            defaultViewport: s,
            disable: y,
          } = j(A, {}),
          d = Pe(a),
          o = oe(),
          [i, m] = z(!1);
        (s &&
          !d.find((u) => u.id === s) &&
          console.warn(
            `Cannot find "defaultViewport" of "${s}" in addon-viewport configs, please check the "viewports" setting in the configuration.`,
          ),
          O(() => {
            Ie(o, e, t, Object.keys(a));
          }, [a, e, e.viewport, t, o]),
          O(() => {
            let u = c === 'landscape';
            ((s && e.viewport !== s) || (c && e.viewportRotated !== u)) &&
              t({ viewport: s, viewportRotated: u });
          }, [c, s, t]));
        let n =
            d.find((u) => u.id === e.viewport) ||
            d.find((u) => u.id === s) ||
            d.find((u) => u.default) ||
            V,
          I = ee(),
          r = He(I.current, n.styles, e.viewportRotated);
        return (
          O(() => {
            I.current = r;
          }, [n]),
          y || Object.entries(a).length === 0
            ? null
            : l.createElement(
                M,
                null,
                l.createElement(
                  q,
                  {
                    placement: 'top',
                    tooltip: ({ onHide: u }) =>
                      l.createElement(F, { links: Me(d, n, t, u) }),
                    closeOnOutsideClick: !0,
                    onVisibleChange: m,
                  },
                  l.createElement(
                    Ne,
                    {
                      key: 'viewport',
                      title: 'Change the size of the preview',
                      active: i || !!r,
                      onDoubleClick: () => {
                        t({ viewport: V.id });
                      },
                    },
                    l.createElement(Y, null),
                    r
                      ? l.createElement(
                          ze,
                          null,
                          e.viewportRotated
                            ? `${n.title} (L)`
                            : `${n.title} (P)`,
                        )
                      : null,
                  ),
                ),
                r
                  ? l.createElement(
                      Ue,
                      null,
                      l.createElement(W, {
                        styles: {
                          'iframe[data-is-storybook="true"]': {
                            ...(r || { width: '100%', height: '100%' }),
                          },
                        },
                      }),
                      l.createElement(
                        ue,
                        { title: 'Viewport width' },
                        r.width.replace('px', ''),
                      ),
                      l.createElement(
                        L,
                        {
                          key: 'viewport-rotate',
                          title: 'Rotate viewport',
                          onClick: () => {
                            t({ viewportRotated: !e.viewportRotated });
                          },
                        },
                        l.createElement(K, null),
                      ),
                      l.createElement(
                        ue,
                        { title: 'Viewport height' },
                        r.height.replace('px', ''),
                      ),
                    )
                  : null,
              )
        );
      });
    H.register(B, (e) => {
      H.add(B, {
        title: 'viewport / media-queries',
        type: te.TOOL,
        match: ({ viewMode: t, tabId: a }) => t === 'story' && !a,
        render: () =>
          FEATURES?.viewportStoryGlobals ? N(Le, { api: e }) : N(Ge, null),
      });
    });
  })();
} catch (e) {
  console.error(
    '[Storybook] One of your manager-entries failed: ' + import.meta.url,
    e,
  );
}
