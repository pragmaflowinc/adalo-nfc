#!/bin/bash
set -e
set -x

cd android/app

# AndroidManifest
cd src/main

cat <<EOF > /tmp/adalo-sed
/android.permission.INTERNET/a\\
    <uses-permission android:name="android.permission.NFC" />\
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>\\
EOF

sed -i.bak "$(cat /tmp/adalo-sed)" AndroidManifest.xml

echo "configured Android settings"