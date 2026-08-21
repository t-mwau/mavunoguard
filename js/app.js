const defaultFarm = { name: 'Mavuno Fields', location: 'Nakuru County, Kenya', crop: 'Maize', area: '24.5', season: 'Long rains 2026' };
let storedFarm = null;
try {
	storedFarm = JSON.parse(localStorage.getItem('mavunoFarm') || 'null');
} catch {
	localStorage.removeItem('mavunoFarm');
}
window.mavunoFarm = storedFarm && typeof storedFarm === 'object' ? { ...defaultFarm, ...storedFarm } : defaultFarm;
window.saveFarm = (farm) => { window.mavunoFarm = { ...window.mavunoFarm, ...farm }; localStorage.setItem('mavunoFarm', JSON.stringify(window.mavunoFarm)); };
document.querySelectorAll('[data-farm-name]').forEach((element) => { element.textContent = window.mavunoFarm.name; });
const dateFormatter = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const monthFormatter = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });
const today = new Date();
document.querySelectorAll('[data-current-date]').forEach((element) => { element.textContent = dateFormatter.format(today); });
document.querySelectorAll('[data-current-month]').forEach((element) => { element.textContent = monthFormatter.format(today); });
document.querySelectorAll('[data-relative-day]').forEach((element) => {
	const offset = Number(element.dataset.relativeDay || 0);
	const date = new Date(today);
	date.setDate(today.getDate() + offset);
	element.textContent = offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : dateFormatter.format(date);
});