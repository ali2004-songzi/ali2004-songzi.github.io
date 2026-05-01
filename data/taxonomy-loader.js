function slugify(str) {
    return String(str || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function normalizeNode(node) {
    if (!node || typeof node !== 'object') return node;

    const next = { ...node };

    if (!next.slug) {
        next.slug = slugify(next.latin || next.title);
    }

    if (Array.isArray(next.children) && next.children.length) {
        next.children = next.children.map(child => normalizeNode(child));
    }

    return next;
}

function mergeTaxonomySources() {
    const sources = [];

    // 如果你的 data/*.js 里是直接挂到 window.xxx 上，这里按需收集
    const candidates = [
        window.porifera,
        window.cnidaria,
        window.platyhelminthes,
        window.nematoda,
        window.annelida,
        window.mollusca,
        window.arthropoda,
        window.echinodermata,
        window.chordata
    ];

    candidates.forEach(item => {
        if (Array.isArray(item)) {
            sources.push(...item);
        } else if (item && Array.isArray(item.children)) {
            sources.push(item);
        }
    });

    // 如果上面没取到，尝试兼容某些脚本直接定义 window.taxonomyPart
    if (!sources.length && Array.isArray(window.taxonomy)) {
        sources.push(...window.taxonomy);
    }

    return sources.map(node => normalizeNode(node));
}

window.taxonomy = mergeTaxonomySources();

document.dispatchEvent(new CustomEvent('taxonomy:ready', {
    detail: window.taxonomy
}));
