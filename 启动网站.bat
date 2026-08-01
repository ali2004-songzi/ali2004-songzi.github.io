@echo off
chcp 65001 >nul
title 内蒙古师范大学自然博物馆数字馆

echo ========================================
echo   内蒙古师范大学自然博物馆数字馆
echo   一键启动脚本
echo ========================================
echo.

echo [1/3] 检查依赖...
if not exist "node_modules" (
    echo 正在安装依赖，请稍候...
    call npm install
    echo 依赖安装完成！
) else (
    echo 依赖已安装 ✓
)

echo.
echo [2/3] 启动开发服务器...
echo 启动后浏览器会自动打开
echo 按 Ctrl+C 可以停止服务器
echo.

echo [3/3] 正在打开浏览器...
start "" "http://localhost:5173"

echo.
echo ========================================
echo   服务器启动中...
echo   访问地址: http://localhost:5173
echo ========================================
echo.

call npm run dev

pause
