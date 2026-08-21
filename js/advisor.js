const advisorForm = document.querySelector('#advisor-form');
const chatLog = document.querySelector('#chat-log');
function addMessage(className, text, detail) {
	const message = document.createElement('div');
	message.className = `alert ${className}`;
	const content = document.createElement('div');
	const title = document.createElement('b');
	title.textContent = text;
	content.append(title);
	if (detail) { const small = document.createElement('small'); small.textContent = detail; content.append(small); }
	message.append(content);
	chatLog.append(message);
}
advisorForm?.addEventListener('submit', (event) => { event.preventDefault(); const question = document.querySelector('#question').value.trim(); if (!question) return; addMessage('user-message', question); addMessage('', 'Keep irrigation light this week.', 'With 18 mm of expected rainfall and moderate wind, check soil moisture in the north field first. This demo answer will be replaced by your server-side advisor API.'); advisorForm.reset(); });
document.querySelector('.mobile-menu')?.addEventListener('click', () => document.querySelector('.sidebar').classList.toggle('is-open'));