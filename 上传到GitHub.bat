@echo off
chcp 65001 >nul
echo ========================================
echo    🚀 一键上传到 GitHub
echo ========================================
echo.

:: 检查 git 是否安装
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 未检测到 Git，请先安装 Git
    echo 下载地址：https://git-scm.com/download/win
    echo.
    pause
    exit /b
)

:: 检查是否已经初始化 git
if not exist ".git" (
    echo 📦 第一次上传，初始化 Git 仓库...
    git init

    :: 配置 git 用户名和邮箱（如果没配置的话）
    git config user.name >nul 2>nul
    if %errorlevel% neq 0 (
        echo.
        echo ⚙️  请配置你的 Git 信息：
        set /p git_name=请输入你的 GitHub 用户名：
        set /p git_email=请输入你的 GitHub 邮箱：
        git config user.name "%git_name%"
        git config user.email "%git_email%"
    )

    git add .
    git commit -m "初始提交"

    echo.
    echo 请输入你的 GitHub 仓库地址：
    echo （格式类似：https://github.com/用户名/仓库名.git）
    set /p repo_url=
    git remote add origin %repo_url%
    git branch -M main

    echo.
    echo 正在推送到 GitHub...
    git push -u origin main
) else (
    echo 📝 检测到变更，正在提交...
    git add .
    git commit -m "更新代码"

    echo.
    echo 🚀 正在推送到 GitHub...
    git push
)

echo.
if %errorlevel% equ 0 (
    echo ========================================
    echo    ✅ 上传完成！
    echo ========================================
) else (
    echo ========================================
    echo    ❌ 上传失败，请检查错误信息
    echo ========================================
)
echo.
pause
