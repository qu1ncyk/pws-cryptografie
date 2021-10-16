export function slaap(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}