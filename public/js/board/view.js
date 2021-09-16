document.querySelector('#btList').addEventListener('click', goList)
document.querySelector('#btUpdate').addEventListener('click', goUpdate)
document.querySelector('#btRemove').addEventListener('click', onRemove)

function goList (e) {
	location.href = '/' + this.dataset['lang'] + '/board/list'
}

function goUpdate (e) {
	location.href = '/' + this.dataset['lang'] + '/board/form/' + this.dataset['id'] 
}

function onRemove (e) {
	if(confirm(this.dataset['msg'])) {
		document.deleteForm.submit()
	}
}