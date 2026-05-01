function slugify(str) {
    return String(str || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function getDefaultImage() {
    return 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80&w=800';
}

function getDefaultModel() {
    return 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
}

function isSpecies(node) {
    return node?.badge === '种' || node?.species === true || !node?.children?.length;
}

function collectLeaves(nodes, out = []) {
    (nodes || []).forEach(node => {
        if (isSpecies(node)) out.push(node);
        if (node.children && node.children.length) collectLeaves(node.children, out);
    });
    return out;
}

function getNodeSlug(node) {
    return node?.slug || slugify(node?.latin || node?.title);
}

function findNodeBySlug(slug, nodes = window.taxonomy || []) {
    for (const node of nodes) {
        if (getNodeSlug(node) === slug) return node;
        if (node.children && node.children.length) {
            const found = findNodeBySlug(slug, node.children);
            if (found) return found;
        }
    }
    return null;
}

function findPathBySlug(slug, nodes = window.taxonomy || [], path = []) {
    for (const node of nodes) {
        const next = [...path, node];
        if (getNodeSlug(node) === slug) return next;
        if (node.children && node.children.length) {
            const found = findPathBySlug(slug, node.children, next);
            if (found) return found;
        }
    }
    return null;
}

function buildPathText(path) {
    return (path || []).map(n => n.title || '').filter(Boolean).join(' → ');
}

let allSpecies = [];
let entered = false;
let currentPage = 'home';
let previousPage = 'home';
let currentFamilySlug = '';
let lastDetailSlug = '';

function $(id) {
    return document.getElementById(id);
}

function showMain() {
    $('cover-screen')?.classList.add('hidden');
    $('main-app')?.classList.remove('hidden');
    $('family-view')?.classList.add('hidden');
    $('detail-view')?.classList.add('hidden');
    $('direct-overlay')?.classList.add('hidden');
}

function showCover() {
    $('cover-screen')?.classList.remove('hidden');
    $('main-app')?.classList.add('hidden');
    $('family-view')?.classList.add('hidden');
    $('detail-view')?.classList.add('hidden');
    $('direct-overlay')?.classList.add('hidden');
}

function showHome() {
    entered = true;
    previousPage = currentPage;
    currentPage = 'home';
    currentFamilySlug = '';

    showMain();
    renderTree();

    if (location.hash) location.hash = '';
}

function enterSite() {
    if (entered) return;
    entered = true;

    const cover = $('cover-screen');
    if (cover) {
        cover.style.opacity = '0';
        setTimeout(() => {
            showHome();
        }, 800);
    } else {
        showHome();
    }
}

function showDirectOverlay(title = '正在进入物种页面', text = '请稍候，正在定位目标物种…') {
    const overlay = $('direct-overlay');
    const titleEl = $('directTitle');
    const textEl = $('directText');

    if (titleEl) titleEl.textContent = title;
    if (textEl) textEl.textContent = text;

    if (overlay) {
        overlay.classList.remove('hidden');
    }
}

function hideDirectOverlay() {
    $('direct-overlay')?.classList.add('hidden');
}

function renderDetail(node, slug) {
    showMain();
    $('detail-view')?.classList.remove('hidden');
    $('family-view')?.classList.add('hidden');

    const path = findPathBySlug(slug);
    const detailName = $('detailName');
    const detailLatin = $('detailLatin');
    const detailTaxonomy = $('detailTaxonomy');
    const detailDesc = $('detailDesc');
    const detailHabit = $('detailHabit');
    const detailTags = $('detailTags');
    const detailModel = $('detailModel');
    const shareLink = $('shareLink');

    if (detailName) detailName.textContent = node.title || '';
    if (detailLatin) detailLatin.textContent = node.latin || '';
    if (detailTaxonomy) detailTaxonomy.textContent = buildPathText(path) || '';
    if (detailDesc) detailDesc.textContent = node.desc || node.traits || '暂无形态特征说明。';
    if (detailHabit) detailHabit.textContent = node.habit || '暂无生活习性说明。';
    if (detailModel) detailModel.src = node.model || getDefaultModel();

    const tags = [];
    if (node.badge) tags.push(node.badge);
    if (node.phylum) tags.push(node.phylum);
    if (node.subphylum) tags.push(node.subphylum);
    if (node.className) tags.push(node.className);
    if (node.order) tags.push(node.order);
    if (node.family) tags.push(node.family);
    if (node.genus) tags.push(node.genus);

    if (detailTags) {
        detailTags.innerHTML = tags.map(t => `<span class="pill">${t}</span>`).join('');
    }

    if (shareLink) {
        shareLink.value = `${location.origin}${location.pathname}#detail-${slug}`;
    }
}

function showDetail(slug, fromDirectLink = false) {
    const node = findNodeBySlug(slug);
    if (!node) {
        showHome();
        return;
    }

    entered = true;
    previousPage = currentPage;
    currentPage = 'detail';
    lastDetailSlug = slug;

    if (fromDirectLink) {
        showDirectOverlay('正在进入物种页面', '请稍候，正在定位目标物种…');
        setTimeout(() => {
            hideDirectOverlay();
            renderDetail(node, slug);
        }, 900);
    } else {
        renderDetail(node, slug);
    }
}

function showFamily(slug) {
    const node = findNodeBySlug(slug);
    if (!node) {
        showHome();
        return;
    }

    entered = true;
    previousPage = currentPage;
    currentPage = 'family';
    currentFamilySlug = slug;

    showMain();
    $('family-view')?.classList.remove('hidden');
    $('detail-view')?.classList.add('hidden');

    const familyTitle = $('familyTitle');
    const familyDesc = $('familyDesc');
    const familyList = $('familyList');

    if (familyTitle) familyTitle.textContent = node.title || '';
    if (familyDesc) familyDesc.textContent = node.desc || node.traits || '这里展示该分类单元下的物种列表。';

    const leaves = collectLeaves([node]);
    if (familyList) {
        familyList.innerHTML = '';

        if (!leaves.length) {
            familyList.innerHTML = `<div class="species-card">该分类下暂无可展示物种。</div>`;
            return;
        }

        leaves.forEach(item => {
            const itemSlug = getNodeSlug(item);
            const card = document.createElement('div');
            card.className = 'species-card';
            card.onclick = () => window.location.hash = `#detail-${itemSlug}`;

            card.innerHTML = `
                <h4>${item.title || ''}</h4>
                <span class="latin">${item.latin || ''}</span>
                <div style="color:var(--soft);line-height:1.7;">${item.desc || item.traits || '暂无说明。'}</div>
            `;
            familyList.appendChild(card);
        });
    }

    if (location.hash !== `#family-${slug}`) {
        location.hash = `#family-${slug}`;
    }
}

function renderTree() {
    const root = $('treeRoot');
    if (!root) return;

    const keyword = ($('searchInput')?.value || '').trim().toLowerCase();
    root.innerHTML = '';

    (window.taxonomy || []).forEach(node => {
        const el = renderNode(node, keyword);
        if (el) root.appendChild(el);
    });

    if (!root.children.length) {
        root.innerHTML = `<div class="species-card">没有找到匹配的分类或物种。</div>`;
    }
}

function renderNode(node, keyword = '') {
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;
    const text = [
        node.title,
        node.latin,
        node.desc,
        node.traits,
        node.habit,
        node.badge,
        node.phylum,
        node.subphylum,
        node.className,
        node.order,
        node.family,
        node.genus
    ].filter(Boolean).join(' ').toLowerCase();

    let childEls = [];
    if (hasChildren) {
        node.children.forEach(child => {
            const childEl = renderNode(child, keyword);
            if (childEl) childEls.push(childEl);
        });
    }

    if (keyword && !text.includes(keyword) && !childEls.length) return null;

    const wrap = document.createElement('div');
    wrap.className = 'tree-item';

    const badgeText = node.badge || (hasChildren ? '分类' : '物种');

    wrap.innerHTML = `
        <div class="tree-header">
            <div class="tree-title">
                <span>${hasChildren ? '📁' : '🧬'}</span>
                <span>${node.title || ''}</span>
            </div>
            <div class="tree-badge">${badgeText}</div>
        </div>
        <div class="tree-children"></div>
    `;

    const header = wrap.querySelector('.tree-header');
    const childrenBox = wrap.querySelector('.tree-children');

    if (childrenBox && childEls.length) {
        childEls.forEach(el => childrenBox.appendChild(el));
    }

    header.addEventListener('click', (e) => {
        e.stopPropagation();

        if (hasChildren) {
            wrap.classList.toggle('open');
        }

        if (isSpecies(node) && !hasChildren) {
            const slug = getNodeSlug(node);
            window.location.hash = `#detail-${slug}`;
            return;
        }

        if (hasChildren && node.badge === '科') {
            const slug = getNodeSlug(node);
            showFamily(slug);
        }
    });

    return wrap;
}

function randomExplore() {
    const pool = allSpecies.length ? allSpecies : collectLeaves(window.taxonomy || []);
    if (!pool.length) return;

    const pick = pool[Math.floor(Math.random() * pool.length)];
    const slug = getNodeSlug(pick);
    window.location.hash = `#detail-${slug}`;
}

function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return Promise.resolve();
    } catch (err) {
        document.body.removeChild(textarea);
        return Promise.reject(err);
    }
}

function copyLink() {
    const input = $('shareLink');
    const text = input?.value || window.location.href;
    copyText(text)
        .then(() => alert('链接已复制'))
        .catch(() => alert('复制失败'));
}

function backToPrevious() {
    if (currentPage === 'detail') {
        if (previousPage === 'family' && currentFamilySlug) {
            showFamily(currentFamilySlug);
        } else {
            showHome();
        }
        return;
    }

    if (currentPage === 'family') {
        showHome();
        return;
    }

    showHome();
}

function routeByHash() {
    const hash = (location.hash || '').replace('#', '');

    if (!hash) {
        if (entered) showHome();
        return;
    }

    if (hash.startsWith('detail-')) {
        showDetail(hash.replace('detail-', ''), true);
        return;
    }

    if (hash.startsWith('family-')) {
        showFamily(hash.replace('family-', ''));
        return;
    }

    if (hash === 'home') {
        showHome();
        return;
    }

    showHome();
}

function init() {
    allSpecies = collectLeaves(window.taxonomy || []);

    const cover = $('cover-screen');
    if (cover) {
        cover.addEventListener('click', enterSite);
        cover.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                enterSite();
            }
        });
        cover.focus?.();
    }

    window.addEventListener('hashchange', routeByHash);

    document.addEventListener('keydown', (e) => {
        if (!entered && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            enterSite();
        }
    });

    if (location.hash) {
        entered = true;
        showMain();
        routeByHash();
    } else {
        showCover();
    }

    renderTree();
}

window.showHome = showHome;
window.showDetail = showDetail;
window.showFamily = showFamily;
window.renderTree = renderTree;
window.randomExplore = randomExplore;
window.copyLink = copyLink;
window.backToPrevious = backToPrevious;
window.showDirectOverlay = showDirectOverlay;
window.hideDirectOverlay = hideDirectOverlay;

window.addEventListener('DOMContentLoaded', init);
