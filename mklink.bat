SET FrontBoxPath=D:\Repo\Frontbox-CSS
SET ProjectPath=D:\Repo\luxmed\wp-content\themes\luxmed

:: # Catalogs

:: ## LESS Frontbox
IF EXIST %ProjectPath%\src\less\frontbox (
    rmdir %ProjectPath%\src\less\frontbox /s /q
)
mklink /J %ProjectPath%\src\less\frontbox %FrontBoxPath%\src\less\frontbox

:: ## LESS Utilities
IF EXIST %ProjectPath%\src\less\utilities (
    rmdir %ProjectPath%\src\less\utilities /s /q
)
mklink /J %ProjectPath%\src\less\utilities %FrontBoxPath%\src\less\utilities

:: ## JavaScript
IF EXIST %ProjectPath%\src\js\frontbox (
    rmdir %ProjectPath%\src\js\frontbox /s /q
)
mklink /J %ProjectPath%\src\js\frontbox %FrontBoxPath%\src\js\frontbox

:: Files
IF EXIST %ProjectPath%\src\less\utilities.less (
    del /f %ProjectPath%\src\less\utilities.less
)
mklink %ProjectPath%\src\less\utilities.less %FrontBoxPath%\src\less\utilities.less

IF EXIST %ProjectPath%\src\less\style.less (
    del /f %ProjectPath%\src\less\style.less
)
mklink %ProjectPath%\src\less\style.less %FrontBoxPath%\src\less\style.less

IF EXIST %ProjectPath%\src\less\grid.less (
    del /f %ProjectPath%\src\less\grid.less
)
mklink %ProjectPath%\src\less\grid.less %FrontBoxPath%\src\less\grid.less

IF EXIST %ProjectPath%\src\less\base.less (
    del /f %ProjectPath%\src\less\base.less
)
mklink %ProjectPath%\src\less\base.less %FrontBoxPath%\src\less\base.less

:: Grunt catalogs
IF EXIST %ProjectPath%\grunt-settings\tasks (
    rmdir /Q /S %ProjectPath%\grunt-settings\tasks
)
mklink /J %ProjectPath%\grunt-settings\tasks %FrontBoxPath%\grunt-settings\tasks

IF EXIST %ProjectPath%\grunt-settings\template (
    rmdir /Q /S %ProjectPath%\grunt-settings\template
)
mklink /J %ProjectPath%\grunt-settings\template %FrontBoxPath%\grunt-settings\template