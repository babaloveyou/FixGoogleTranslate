#!/usr/bin/python
import os, subprocess, sys


def create(name_file, chrome_path, file_path):
    print('Creating .CRX - process...')
    abs_path = os.path.abspath(file_path).replace('\\', '/') + '/'
    appdata = os.getenv('APPDATA').split('\\')
    appdata = appdata[:len(appdata) - 1]
    appdata = '\\'.join(appdata)
    output_path = "/".join(file_path.split('/')[:-2])+'/'
    print('output_path')
    print(output_path)
    print('abs_path')
    print(abs_path)

    try:
        FileNotFoundError
    except NameError:
        FileNotFoundError = IOError

    if chrome_path != 'auto':
        if not os.path.exists(chrome_path):
            raise FileNotFoundError("Folder not found: ", chrome_path)
    else:
        chrome_path = appdata + '/Local/Google/Chrome/Application'
        if not os.path.exists(chrome_path):
            chrome_path = appdata + '/Local/Google/Chrome SxS/Application'
        else:
            raise FileNotFoundError('Folder Chrome-browser not found. Please select your directory and run script again.')
    try:

        print('chrome_path')
        print(chrome_path)
        print('full path')
        print(chrome_path + '/chrome')
        command = '"' + chrome_path + '/chrome" --pack-extension="' + abs_path + '" --no-message-box'
        # uncomment next string, if only created *.pem and run script again (and commenting previous string)
        # command = '"' + chrome_path + '/chrome" --pack-extension="' + abs_path + '" --pack-extension-key="'+"/".join(abs_path.split('/')[:-2])+'/'+'FixGoogleTranslate.pem" --no-message-box'
        retcode = subprocess.call(command, shell=True)
    except OSError as e:
        print(sys.stderr, "\tExecution failed:", e)
    finally:
        old_file_crx = output_path + name_file + '.crx'
        old_file_pem = output_path + name_file + '.pem'
        if os.path.exists(old_file_crx):
            os.remove(old_file_crx)
        if os.path.exists(old_file_pem):
            os.remove(old_file_pem)
        os.rename(output_path + 'extension.pem',
                  output_path + name_file + '.pem')
        os.rename(output_path + 'extension.crx',
                  output_path + name_file + '.crx')
        print('Creating .CRX - success ('+ output_path + name_file + '.crx)')

if __name__ == '__main__':
    create(sys.argv[1], sys.argv[2], sys.argv[3])

    # variant two
    # uncomment next string, if only created *.pem and run script in cmd (and commenting previous string):
    # >> python create_crx.py

    # create('FixGoogleTranslate', 'auto', 'FixGoogleTranslate/v1.1.0/extension/')