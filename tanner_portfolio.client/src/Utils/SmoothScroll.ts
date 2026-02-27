export function clamp01(n: number) {
    return Math.max(0, Math.min(1, n));
}

export function easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
}

export function smoothScrollToId(
    id: string,
    offset: number,
    setProgress?: (p: number) => void
) {
    const el = document.getElementById(id);
    if (!el) return;

    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;

    const startY = window.scrollY;
    const rawTargetY = el.getBoundingClientRect().top + window.scrollY - offset;
    const targetY = Math.max(0, rawTargetY);

    const distance = targetY - startY;
    const absDist = Math.abs(distance);

    const minDuration = 450;
    const maxDuration = 900;
    const duration = Math.min(maxDuration, Math.max(minDuration, absDist * 0.6));

    let startTime: number | null = null;

    function step(ts: number) {
        if (startTime === null) startTime = ts;

        const elapsed = ts - startTime;
        const t = Math.min(1, elapsed / duration);
        const eased = easeOutCubic(t);

        const nextY = startY + distance * eased;
        window.scrollTo(0, nextY);

        if (setProgress && scrollable > 0) {
            const p = nextY / scrollable;
            setProgress(clamp01(p));
        }

        if (t < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}