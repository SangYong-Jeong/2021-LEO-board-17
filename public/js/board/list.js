if(document.querySelectorAll('.list-wrapper table tr'))
document.querySelectorAll('.list-wrapper table tr').forEach(function(tr) {
	tr.addEventListener('click', goView)
})

function goView (e) {
	location.href = '/' + this.dataset['lang'] + '/board/view/' + this.dataset['id']
}