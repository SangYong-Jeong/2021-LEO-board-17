const createError = require('http-errors')
const path = require('path')
const fs = require('fs-extra')


const location = src => path.join(__dirname, '../', src)

const cutTail = (str, len = 12) => str.length > len ? str.substr(0, len) + ' ...' : str

const chgStatus = status => {
	switch(status) {
		case '1':
			return '판매중'
		case '2':
			return '발행예정'
		case '3':
			return '절판'
		default:
			return '기타'
	}
}
const imgExt = ['jpg', 'jpeg', 'gif', 'png']
const mediaExt = ['mp3', 'mp4']
const docExt = ['ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx', 'hwp', 'pdf']
const zipExt = ['zip', 'alz']
const exts = {imgExt, mediaExt, docExt, zipExt}

const relPath = file => `/uploads/${file.split('_')[0]}/${file}`
const relPath2 = file => `/uploads2/${file.split('_')[0]}/${file}`
const absPath = file => path.join(__dirname, `../storages-files1/${file.split('_')[0]}/${file}`)
const absPath2 = file => path.join(__dirname, `../storages-files2/${file.split('_')[0]}/${file}`)
const moveFile = async file => {
	try{
		let savePath = path.join(__dirname, '../storages-remove1', file.split('_')[0])
		const oldPath = absPath(file)
		await fs.ensureDir(savePath) // D:\ ~ /210909
		savePath = path.join(savePath, file) // D:\ ~ /210909/210909_SADHFSAJKHF-SFJSHDFJ.jpg
		await fs.move(oldPath, savePath)
		return true
	}
	catch (err) {
		return err
	}
}
const moveFile2 = async file => {
	try{
		let savePath = path.join(__dirname, '../storages-remove2', file.split('_')[0])
		const oldPath = absPath2(file)
		await fs.ensureDir(savePath) // D:\ ~ /210909
		savePath = path.join(savePath, file) // D:\ ~ /210909/210909_SADHFSAJKHF-SFJSHDFJ.jpg
		await fs.move(oldPath, savePath)
		return true
	}
	catch (err) {
		return err
	}
}

const getIcon = file => {
	const ext = path.extname(file).substr(1)
	if(imgExt.includes(ext)) return '/img/icons/img.png'
	if(mediaExt.includes(ext)) return '/img/icons/video.png'
	if(docExt.includes(ext)) return '/img/icons/doc.png'
	if(zipExt.includes(ext)) return '/img/icons/zip.png'
	return ''
}

const alert = (msg,location) => {
	return `
	<script>	
	alert('${msg}');
	location.href = '${location}';
	</script>
	`
}


const isImg = file => imgExt.includes(path.extname(file).substr(1)) ? true : false

module.exports = {  location, cutTail, chgStatus, exts, relPath, relPath2, absPath, absPath2, getIcon, isImg, moveFile, moveFile2, alert }

