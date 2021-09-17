document.saveForm.addEventListener('submit', onValidation)



function onValidation (e) {
	e.preventDefault()
	var validationMessage = this.dataset['validation']
	if(this.title.value.trim() && this.writer.value.trim()) {
		this.submit()
	}
	else {
		alert(validationMessage)
	}
}