@echo off
chcp 65001 >nul
title Notion 数据同步

echo ========================================
echo   Notion 数据同步工具
echo ========================================
echo.

echo [1/2] 检查依赖...
if not exist "node_modules" (
    echo 正在安装依赖，请稍候...
    call npm install
    echo 依赖安装完成！
) else (
    echo 依赖已安装 ✓
)

echo.
echo [2/2] 开始同步数据...
echo.

call npm run sync:notion

echo.
echo ========================================
echo   同步完成！
echo   网站会自动热更新
echo ========================================
echo.

pause
