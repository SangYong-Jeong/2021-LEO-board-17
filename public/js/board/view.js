document.querySelector('#btList').addEventListener('click', goList)
document.querySelector('#btUpdate').addEventListener('click', goUpdate)
document.querySelector('#btRemove').addEventListener('click', onRemove)
document.commentForm.addEventListener('submit', onValidation)


if(document.querySelectorAll('#btCommentRemove').length > 0) {
	document.querySelectorAll('#btCommentRemove').forEach(function(comment) {
		comment.addEventListener('click', commentDelete)
	})
}

function commentDelete (e) {
	var id = this.dataset['commentid']
	var parent = $(this).parents('.comment-tr') // 지울려는 댓글의 tr
	if(confirm(this.dataset['msg'])) {
		axios.delete('/board/api/comment/'+id).then(onSuccess).catch(onError)
	}
	function onSuccess(r) {
		if(r.status === 200) parent.remove()
	}

	function onError(err) {
		console.log(err.response)
	}
}


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

function onValidation (e) {
	e.preventDefault()
	var validationMessage = this.dataset['validation']
	if(this.writer.value.trim() && this.comment.value.trim()) {
		this.submit()
	}
	else {
		alert(validationMessage)
	}
}