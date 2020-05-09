/* Assessment 1: Meme Generator
Requirements:
-User should be able to submit a form on the page to generate a new meme on the page, and should be able to add multiple memes to the page by submitting the form multiple times.
-Users should be able to click on a button to remove a meme from the page.
-When the meme form is submitted, values in the form inputs should be cleared.

#TODO
-Add drag and drop img submission
-Bottom bar for submitted memes allows hover to show larger image, click gives options to save, edit, or delete.
-Have text add in to image as typed
-Allow some movement of text on working image
-Export saved memes as image files
-Save saved memes to localStorage - remove if deleted
-Add clear all to saved memes
-Clean up text input styling
-Figure out image scaling and saving image to preserve text location before putting in savedMemeContainer

*/

//Select DOM Elements
const imgInput = document.querySelector('#img-url-input');
const topTextInput = document.querySelector('#top-text-input');
const botTextInput = document.querySelector('#bottom-text-input');
const submitBtn = document.querySelector('#submit-btn');
const workingMeme = document.querySelector('#meme');
const memeImg = document.querySelector('#meme-img');
const memeTopText = document.querySelector('#meme-top-text');
const memeBotText = document.querySelector('#meme-bottom-text');
const saveMemeBtn = document.querySelector('#save-meme-btn');
const saveMemeBtnCont = document.querySelector('#save-btn-container');
const memeContainer = document.querySelector('#working-meme-container');
const saveBtn = document.querySelector('#save-btn-container');
const createBtn = document.querySelector('#create-btn');
const submitForm = document.querySelector('#submit-form');
const savedMemeContainer = document.querySelector('#saved-meme-container');
const fontColor = document.querySelector('#color-input');
const topTextBg = document.querySelector('#top-bg-input');
const botTextBg = document.querySelector('#bottom-bg-input');
const imgUpload = document.querySelector('#upload-file');

//Add Event listeners
//Create meme button gathers necessary values for displaying meme in working container
createBtn.addEventListener('click', (e) => {
	e.preventDefault();
	memeBuilder(
		imgInput.value,
		topTextInput.value,
		botTextInput.value,
		fontColor.value,
		topTextBg.checked,
		botTextBg.checked
	);
	submitForm.reset();
	saveMemeBtnCont.scrollIntoView({ block: 'end', behavior: 'smooth' });
});

//Listener on Save Meme button
saveBtn.addEventListener('click', () => {
	saveMeme();
});

//Uses submitted arguments to create new meme in the working meme container. Will use new info, or retain old values if there is nothing in the input fields
function memeBuilder(img, topText, botText, fontColor, topBg, botBg) {
	//Handles if there is a image file upload, else uses image address or existing image if nothing else is present on create
	if (imgUpload.value) {
		convertImgUpload();
	}
	else memeImg.src = img || memeImg.src;
	workingMeme.style.setProperty('--font-color', fontColor);
	memeTopText.innerText = topText || memeTopText.innerText;
	if (topBg) memeTopText.classList.add('bar');
	else memeTopText.classList.remove('bar');
	memeBotText.innerText = botText || memeBotText.innerText;
	if (botBg) memeBotText.classList.add('bar');
	else memeBotText.classList.remove('bar');
}

//"saves" meme by making a clone of all the elements in working Meme container. Also adds remove button
function saveMeme() {
	let memeCopy = workingMeme.cloneNode(true);
	const rmvBtn = document.createElement('button');
	rmvBtn.classList.add('rmv-btn');
	rmvBtn.innerHTML = '&#x2716';
	rmvBtn.addEventListener('click', (e) => {
		e.target.parentNode.remove();
	});
	memeCopy.append(rmvBtn);
	memeCopy.classList.add('saved');
	savedMemeContainer.prepend(memeCopy);
	savedMemeContainer.scrollIntoView({ block: 'end', behavior: 'smooth' });
}

//Handles file uploads - sourced the basic idea from Nephelococcygia on stackoverflow
//file upload had priority over link address inputs
function convertImgUpload() {
	let file = imgUpload.files[0];
	const reader = new FileReader();
	reader.onload = function(e) {
		memeImg.src = e.target.result;
	};
	reader.readAsDataURL(file);
}
