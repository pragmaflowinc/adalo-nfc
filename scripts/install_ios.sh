#!/bin/bash
set -e
set -x

name=$PROJECT_NAME

if grep -q "<key>NFCReaderUsageDescription" ios/$name/Info.plist; then
  echo "NFC already supported, nothing to do here."
else
  plutil -insert NFCReaderUsageDescription -string 'NFC permission when in use' ios/$name/Info.plist
fi

echo "configured iOS settings"