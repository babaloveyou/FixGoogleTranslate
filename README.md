[1]: Preview/google_api.min.png
[2]: Preview/translate_page_core.min.png
[3]: Preview/icon.png
[4]: Preview/param_page.png

![Icon][3]
# FixGoogleTranslate [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/vyach-vasiliev/FixGoogleTranslate/master/LICENSE)
[![Chromium-like](https://img.shields.io/badge/Chrome_like-20+-40A977.svg)](https://en.wikipedia.org/wiki/Chromium_(web_browser))
[![Localized](https://img.shields.io/badge/Localized-English,_Russian-e67e22.svg)](https://en.wikipedia.org/wiki/Chromium_(web_browser))

Extension fixing keys API in Google-Translate. <br>It allows you to translate text on the pages without errors API.
## Problem
##### Notice of limited opportunities
![Mozilla FireFox][1]
##### Translate page witch core browser
![Google Chrome][2]


## After a patch
[✔] All pages are translated

## Settings
![Page settings][4]

## Install
Run file **FixGoogleTranslate.crx** (also works Drag-in-Drop file to browser)<br>
or <br>
Browser App  ➡ Extension page  ➡ Develop mode **[On]** ➡ Click button **Load unpacked extension** ➡ Select folder **/extension** in dialog

## Create extension *.crx
Arguments:

name_file - Name result file

chrome_path - path to chrome folder

file_path - path to extension folder

##### Python (any version)
    python create_crx.py "FixGoogleTranslate" "auto" "FixGoogleTranslate/v1.1.0/extension/"

##### Windows (requires Python)
run file **create_crx.bat** (auto-search chrome path)
##### Linux (requires Python)
run file **create_crx.sh** (auto-search chrome path)

if not run, mark it executable using and try again

    $ chmod +x create.py


## More
If does not work one way, then you can try to enter your **dummytoken** in **background.js** file

    2: {
           tmp: ['key=dummytoken', 'key=<YOUR TOKEN>'],
           state: false
       }

## Compatibility
Methods are **fully backward compatible** with all **chromium-like browsers** with **working Google API Keys**

## License
**[MIT License](https://opensource.org/licenses/MIT "Text license")**
