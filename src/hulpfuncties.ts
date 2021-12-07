export function slaap(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export let alfabet = [];
for (let i = 0; i < 26; i++) alfabet.push(String.fromCharCode(65 + i));