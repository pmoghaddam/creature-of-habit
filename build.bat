@echo off
CMD /C sencha build -p build.jsb3 -d .build

echo Move build files into application folder
move ".build\background-all.js" "extjs\background.js"
move ".build\options-all.js" "extjs\options.js"
move ".build\script-all.js" "extjs\script.js"

echo Delete unnecessary folders
rd .idea /s /q
rd .git /s /q
rd .build /s /q
rd chrome /s /q
rd "extjs\app" /s /q
rd "assets\.sass-cache" /s /q