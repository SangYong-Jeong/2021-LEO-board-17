if(document.querySelectorAll('.list-wrapper table tbody tr'))
document.querySelectorAll('.list-wrapper table tbody tr').forEach(function(tr) {
	tr.addEventListener('click', goView)
})

function goView (e) {
	location.href = '/' + this.dataset['lang'] + '/board/view/' + this.dataset['id'] + '/1'
}