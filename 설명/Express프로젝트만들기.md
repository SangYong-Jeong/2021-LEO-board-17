# Express 프로젝트 생성
```bash
# Git 연동
git init
git remote add origin https://github.com/SangYong-Jeong/2021-LEO-board-17.git

# .gitignore 생성
	# 아래내용 추가
	# /storages
	# /storages-remove

# npm init -y
npm init -y

# Dependancy module 설치 
npm i cors dotenv ejs express fs-extra http-errors lodash method-override moment multer mysql2 numeral uuid

# 폴더구조 생성
mkdir middlewares
mkdir modules
mkdir routes
mkdir views

# app.js 생성

# package.json 추가
"scripts": {
    "start": "nodemon app",
  }
```