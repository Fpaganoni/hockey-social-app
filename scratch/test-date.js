console.log("parseInt('2026-05-11T08:13:55.000Z'):", parseInt('2026-05-11T08:13:55.000Z', 10));
console.log("new Date('2026-05-11T08:13:55.000Z').getTime():", new Date('2026-05-11T08:13:55.000Z').getTime());
const now = Date.now();
const then = parseInt('2026-05-11T08:13:55.000Z', 10);
const diff = now - then;
console.log("diff:", diff);
console.log("diff/1000/60/60/24/365:", diff/1000/60/60/24/365);
