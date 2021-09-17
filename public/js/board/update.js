if(document.querySelector('#btRemoveUpfile'))
	document.querySelector('#btRemoveUpfile').addEventListener('click', onDelete)
if(document.querySelector('#btRemoveUpfile2'))
	document.querySelector('#btRemoveUpfile2').addEventListener('click', onDelete)

function onDelete(e) {
	var id = this.dataset['id']
	var two = this.dataset['two']
	var parent = this.parentNode
	if(confirm(this.dataset['msg'])) {
			axios.delete('/board/api/file/' + id + (two ? '/' + two : '')).then(onSuccess).catch(onError)
	}
	function onSuccess(r) {
		if(r.status === 200)  parent.remove()
	}
	
	function onError(err) {
		console.log(err)
	}
}

document.updateForm.addEventListener('submit', onValidation)

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