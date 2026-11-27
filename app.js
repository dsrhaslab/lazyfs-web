// LazyFS website — small, dependency-free.

/* ---------- Demo: an auto-playing "pull the plug" story ---------- */
(function demo() {
  const root = document.getElementById('demo');
  if (!root) return;
  const cacheEl = document.getElementById('cache');
  const diskEl = document.getElementById('disk');
  const term = document.getElementById('term');
  const playBtn = document.getElementById('play');

  let blocks = []; // { l, s: 'cached' | 'synced' | 'lost' }
  let added = null;
  const esc = (t) => t.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const ln = (cls, t) => `<span class="${cls}">${esc(t)}</span>`;
  const names = (list) => list.map((b) => b.l).join(', ');
  const of = (st) => blocks.filter((b) => b.s === st);

  function render() {
    cacheEl.innerHTML = blocks.length
      ? blocks.map((b) => `<span class="blk ${b.s}${b.l === added ? ' pop' : ''}">${b.l}</span>`).join('')
      : '<span class="empty">empty</span>';
    const disk = of('synced');
    diskEl.innerHTML = disk.length
      ? disk.map((b) => `<span class="blk synced">${b.l}</span>`).join('')
      : '<span class="empty">nothing persisted yet</span>';
  }
  const write = (l) => () => {
    blocks = blocks.filter((b) => b.s !== 'lost');
    blocks.push({ l, s: 'cached' }); added = l;
    const c = of('cached');
    return [ln('p', `$ write(fd, "${l}")`), ln('c', `# ${l} is in the LazyFS cache: the app can read it, but it is not on disk${c.length > 1 ? ` (unsynced: ${names(c)})` : ''}.`)];
  };

  const flash = () => { root.classList.remove('flash'); void root.offsetWidth; root.classList.add('flash'); };
  const restart = (msg) => () => {
    blocks = blocks.filter((b) => b.s !== 'lost');
    return [ln('p', '$ restart database'), ln('o', `On disk: ${names(of('synced'))}.`), ln('c', msg)];
  };

  // Each scenario: phases (shown as numbered chips) and steps [phase, action returning terminal lines].
  const SCEN = {
    lost: {
      phases: ['write', 'fsync', 'write more', 'power loss', 'restart'],
      steps: [
        ['write', () => { blocks = []; return [ln('c', '# Your database runs on top of LazyFS.')]; }],
        ['write', write('A')],
        ['write', write('B')],
        ['fsync', () => { const c = of('cached'); c.forEach((b) => { b.s = 'synced'; }); return [ln('p', '$ fsync(fd)'), ln('o', `✓ ${names(c)} are now durable on disk.`)]; }],
        ['write more', write('C')],
        ['write more', write('D')],
        ['power loss', () => {
          const c = of('cached'); c.forEach((b) => { b.s = 'lost'; }); flash();
          return [ln('p', '$ echo "lazyfs::clear-cache" > /tmp/faults.fifo'), ln('e', `⚡ Power loss! ${names(c)} never reached the disk.`)];
        }],
        ['restart', restart('# C and D are gone. If the database had acknowledged them to a client, that is a data-loss bug.')],
      ],
    },
    torn: {
      phases: ['write', 'torn-seq fault', 'restart'],
      steps: [
        ['write', () => { blocks = []; return [ln('c', '# The database appends three records to its log, then will fsync.')]; }],
        ['write', write('A')],
        ['write', write('B')],
        ['write', write('C')],
        ['torn-seq fault', () => {
          const c = of('cached'); const last = c[c.length - 1]; const lost = c.slice(0, -1);
          last.s = 'synced'; lost.forEach((b) => { b.s = 'lost'; }); flash();
          return [ln('p', '$ echo "lazyfs::torn-seq::op=write::file=…/log::persist=3::occurrence=1" > /tmp/faults.fifo'), ln('e', `✂ Crash mid-flush: ${last.l} reached the disk, but ${names(lost)} did not.`)];
        }],
        ['restart', restart('# The newest record survived without the older ones: checksums fail and recovery gets confused.')],
      ],
    },
  };
  const order = ['lost', 'torn'];
  const scenBtns = [...root.querySelectorAll('.scen [data-scen]')];
  const timeline = document.getElementById('timeline');

  let scen = 'lost';
  let i = 0;
  let timer = null;
  let playing = true;
  let visible = false;

  function select(name) {
    scen = name; i = 0; blocks = [];
    scenBtns.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.scen === name)));
    timeline.innerHTML = SCEN[name].phases.map((p) => `<li data-phase="${p}">${p}</li>`).join('');
  }

  function step() {
    const { steps } = SCEN[scen];
    const [phase, act] = steps[i];
    added = null;
    term.innerHTML = act().join('\n');
    timeline.querySelectorAll('li').forEach((li) => {
      li.classList.toggle('on', li.dataset.phase === phase);
      li.classList.toggle('bad', li.dataset.phase === phase && /loss|fault/.test(phase));
    });
    render();
    const last = i === steps.length - 1;
    const pause = last ? 4200 : /loss|fault/.test(phase) ? 2600 : 1600;
    i += 1;
    timer = setTimeout(() => {
      timer = null;
      if (last) select(order[(order.indexOf(scen) + 1) % order.length]);
      if (playing && visible) step();
    }, pause);
  }
  function setPlaying(p) {
    playing = p;
    playBtn.textContent = p ? '❚❚' : '▶';
    playBtn.setAttribute('aria-label', p ? 'Pause animation' : 'Play animation');
    if (p && !timer && visible) step();
  }
  playBtn.addEventListener('click', () => setPlaying(!playing));
  scenBtns.forEach((b) => b.addEventListener('click', () => {
    clearTimeout(timer); timer = null;
    select(b.dataset.scen);
    step();
  }));

  select('lost');
  render();
  step(); // show the first frame even before it is visible
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && playing && !timer) step();
    }, { threshold: 0.35 }).observe(root);
  } else {
    visible = true;
  }
})();

/* ---------- Faults: FIFO / config toggle ---------- */
(function faultModes() {
  const tabs = document.querySelectorAll('.modes [data-mode]');
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    const mode = tab.dataset.mode;
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
    document.querySelectorAll('#faults [data-show]').forEach((el) => { el.hidden = el.dataset.show !== mode; });
  }));
})();

/* ---------- Bugs ---------- */
// Source: Ramos et al., PVLDB 17(11) 2024, Table 3, and lazyfs/reproduced-bugs.
const BUGS = [
  ['etcd', [
    ['#9', 'walpb: crc mismatch', 'https://github.com/etcd-io/etcd/issues/6191'],
    ['#10', 'walpb: crc mismatch', 'https://github.com/etcd-io/etcd/issues/11488'],
    ['#16', 'invalid database', 'https://github.com/etcd-io/etcd/issues/16596', 'new', true],
    ['#17', 'bus error', 'https://github.com/etcd-io/etcd/issues/16596', 'new', true],
    ['#18', 'file size too small', 'https://github.com/etcd-io/bbolt/issues/567#issuecomment-1792646307', 'new', true],
    ['#19', 'wal: snapshot not found', null, 'new'],
    ['#20', 'split-brain (with Jepsen)', 'https://github.com/etcd-io/etcd/issues/14143', 'new', true],
  ]],
  ['LevelDB', [
    ['#3', 'corrupted MANIFEST', 'https://github.com/google/leveldb/issues/189'],
    ['#4', 'CURRENT file corrupted', 'https://github.com/google/leveldb/issues/75'],
    ['#5', 'CURRENT file corrupted', 'https://github.com/google/leveldb/issues/193'],
    ['#6', 'checksum mismatch', 'https://github.com/google/leveldb/issues/251'],
  ]],
  ['ZooKeeper', [
    ['#2', 'invalid magic number', 'https://lists.apache.org/thread/dlhrd5t2xyjr425l78xofqs7r3v4s486'],
    ['#7', 'unable to load database', 'https://issues.apache.org/jira/browse/ZOOKEEPER-2332'],
    ['#8', 'CRC check failed', 'https://issues.apache.org/jira/browse/ZOOKEEPER-2560'],
  ]],
  ['PebblesDB', [
    ['#13', 'metadata corruption', null, 'new'],
    ['#14', 'silent data loss', null, 'new'],
    ['#15', 'checksum mismatch', 'https://github.com/utsaslab/pebblesdb/issues/28', 'new'],
  ]],
  ['PostgreSQL', [['#1', 'corrupted statistics file', 'https://www.postgresql.org/message-id/flat/17700.1340394540%40sss.pgh.pa.us']]],
  ['Redis', [['#11', 'users silently lost (ACL)', 'https://github.com/redis/redis/pull/10924']]],
  ['Lightning Network', [['#12', 'wallet unreadable', 'https://github.com/lightningnetwork/lnd/issues/6720']]],
];

(function renderBugs() {
  const el = document.getElementById('systems');
  if (!el) return;
  el.innerHTML = BUGS.map(([sys, list]) => {
    const n = list.reduce((acc, b) => acc + b[0].split(' ').length, 0);
    const items = list.map(([id, err, url, tag, ok]) => {
      const txt = url ? `<a href="${url}">${err}</a>` : `<span class="err">${err}</span>`;
      const tags = (tag ? '<span class="tag new">new</span>' : '') + (ok ? ' <span class="tag ok" title="confirmed by the developers">✓</span>' : '');
      return `<li><span class="id">${id}</span>${txt}${tags}</li>`;
    }).join('');
    return `<div class="sys"><div class="sys-head"><h3>${sys}</h3><span>${n}</span></div><ul>${items}</ul></div>`;
  }).join('');
})();

/* ---------- Who uses / writes about LazyFS ---------- */
// The content lives in data/community.json: edit that file to add or remove logos and references.
(async function renderCommunity() {
  const adoptersEl = document.getElementById('adopters');
  const refsEl = document.getElementById('refs');
  if (!adoptersEl || !refsEl) return;
  const esc = (t) => String(t ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const when = (d) => (/^\d{4}-\d{2}$/.test(d) ? `${MONTHS[+d.slice(5, 7) - 1]} ${d.slice(0, 4)}` : esc(d));
  try {
    const res = await fetch('data/community.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    const { adopters = [], references = [] } = await res.json();
    adoptersEl.innerHTML = adopters.map((a) =>
      `<a href="${esc(a.url)}"><img src="${esc(a.logo)}" alt="" width="40" height="40" loading="lazy"><span><b>${esc(a.name)}</b>${esc(a.note)}</span></a>`,
    ).join('');
    refsEl.innerHTML = [...references]
      .sort((x, y) => String(y.date).localeCompare(String(x.date)))
      .map((r) => `<a class="ref" href="${esc(r.url)}"><span class="kind">${esc(r.kind)}${r.date ? ' · ' + when(r.date) : ''}</span><b>${esc(r.title)}</b><p>${esc(r.text)}</p></a>`)
      .join('');
  } catch (err) {
    refsEl.innerHTML = '<p class="more">Could not load data/community.json. Serve the site over HTTP (e.g. <code>python3 -m http.server</code>) instead of opening the file directly.</p>';
  }
})();

/* ---------- Contributors, live from GitHub ---------- */
(async function renderContributors() {
  const el = document.getElementById('contributors');
  if (!el) return;
  const esc = (t) => String(t ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  try {
    const res = await fetch('https://api.github.com/repos/dsrhaslab/lazyfs/contributors?per_page=100');
    if (!res.ok) throw new Error(res.status);
    const list = (await res.json()).filter((c) => c.type === 'User');
    el.innerHTML = list.map((c) => {
      const tip = `${c.login} · ${c.contributions} commit${c.contributions === 1 ? '' : 's'}`;
      return `<li><a href="${esc(c.html_url)}" title="${esc(tip)}"><img src="${esc(c.avatar_url)}&s=72" alt="${esc(c.login)}" width="36" height="36" loading="lazy"></a></li>`;
    }).join('');
  } catch (err) {
    el.outerHTML = '<p class="more" style="margin:0">See them <a href="https://github.com/dsrhaslab/lazyfs/graphs/contributors">on GitHub</a>.</p>';
  }
})();

/* ---------- Copy buttons ---------- */
document.querySelectorAll('.copy').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const code = btn.closest('.code').querySelector('code').innerText;
    try {
      await navigator.clipboard.writeText(code);
      btn.textContent = 'Copied ✓';
    } catch {
      btn.textContent = 'Select & copy';
    }
    setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
  });
});

/* ---------- Motion: reveal on scroll ---------- */
(function motion() {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  const els = document.querySelectorAll('main section:not(.hero):not(.demo-section) .wrap > *');
  els.forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });
  // Safety net: never leave content hidden if the observer is slow to fire.
  setTimeout(() => els.forEach((el) => el.classList.add('in')), 2000);
})();
