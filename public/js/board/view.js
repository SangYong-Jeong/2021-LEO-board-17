document.querySelector('#btList').addEventListener('click', goList)
document.querySelector('#btUpdate').addEventListener('click', goUpdate)
document.querySelector('#btRemove').addEventListener('click', onRemove)
document.commentForm.addEventListener('submit', onValidation)


if(document.querySelectorAll('#btCommentRemove').length > 0) {
	document.querySelectorAll('#btCommentRemove').forEach(function(comment) {
		comment.addEventListener('click', commentUpdateDelete)
	})
}

if(document.querySelectorAll('#btCommentUpdate').length > 0) {
	document.querySelectorAll('#btCommentUpdate').forEach(function(comment) {
		comment.addEventListener('click', commentUpdateDelete)
	})
}

function commentUpdateDelete (e) {
	var id = this.dataset['commentid']
	var update = this.dataset['update'] || false
	var commentUpdateWrap = $('.comment-update-wrap')
	var commentUpdateWrapPrev = $('.comment-update-wrap').prevAll()
	var parent = $(this).parents('.comment-tr') // 지울려는 댓글의 tr
	if(confirm(this.dataset['msg'])) {
		axios.delete('/board/api/comment/'+id + (update ? `/${update}` : '') ).then(onSuccess).catch(onError)
	}
	function onSuccess(r) {
		if(r.data.update === 'NO') {
			parent.remove()
		}
		else {
			commentUpdateWrapPrev.remove()
			commentUpdateWrap.css('display', 'block')
			$(document.commentForm).prepend('<input type="hidden" name="_method" value="PUT">')
		}
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
	var writer = this.writer || this.updateWriter
	var comment = this.comment || this.updateComment
	if(writer.value.trim() && comment.value.trim()) {
		this.submit()
	}
	else {
		alert(validationMessage)
	}
}
