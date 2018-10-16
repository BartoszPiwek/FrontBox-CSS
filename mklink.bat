@echo off

:: Paths
set FrontBoxPath=D:\Repo\Frontbox-CSS
set ProjectPath=D:\Repo\luxmed\wp-content\themes\luxmed

:: Arrays
set Catalogs[0]="\src\less\frontbox\" 
set Catalogs[1]="\src\less\utilities\"
set Catalogs[2]="\src\js\frontbox\"
set Catalogs[3]="\grunt-settings\tasks\"
set Catalogs[4]="\grunt-settings\template\"
set "CatalogsCount=0"
set Files[0]="\src\less\utilities.less"
set Files[1]="\src\less\style.less"
set Files[2]="\src\less\grid.less"
set Files[3]="\src\less\base.less"
set "FilesCount=0"

echo Creating Symbolic Links for repository %ProjectPath%


:CatalogsLoop 
if defined Catalogs[%CatalogsCount%] ( 

    call set path=%%Catalogs[%CatalogsCount%]%%

    if exist "%ProjectPath%%path%" (
        rmdir %ProjectPath%%path% /s
    )
    
    mklink /J "%ProjectPath%%path%" "%FrontBoxPath%%path%"

    set /a "CatalogsCount+=1"
    GOTO :CatalogsLoop 
)

:FilesLoop 
if defined Files[%FilesCount%] ( 

    call set path=%%Files[%FilesCount%]%%

    if exist "%ProjectPath%%path%" (
        del /f "%ProjectPath%%path%"
    )
    
    mklink "%ProjectPath%%path%" "%FrontBoxPath%%path%"

    set /a "FilesCount+=1"
    GOTO :FilesLoop 
)