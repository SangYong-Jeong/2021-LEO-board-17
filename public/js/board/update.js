if(document.querySelector('#btRemoveUpfile'))
	document.querySelector('#btRemoveUpfile').addEventListener('click', onDelete)

function onDelete(e) {
	var id = this.dataset['id']
	var parent = this.parentNode
	if(confirm(this.dataset['msg'])) {
		axios.delete('/board/api/file/' + id).then(onSuccess).catch(onError)
	}
	function onSuccess(r) {
		if(r.status === 200)  parent.remove()
	}
	
	function onError(err) {
		console.log(err.response)
	}
}