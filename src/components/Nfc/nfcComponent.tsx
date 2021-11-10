import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import NfcManager, {
  NdefStatus,
  NfcEvents,
  NfcTech,
  TagEvent,
} from "react-native-nfc-manager";
import { nfcProps } from "./generated";
import { Button } from "@protonapp/react-native-material-ui";

export const NfcComponent = (props: nfcProps) => {
  const checkEnabled = async () => {
    const enabled = await NfcManager.isEnabled();
    if (props.onEnabledCheck) {
      props.onEnabledCheck(enabled);
    }
  };

  useEffect(() => {
    NfcManager.start();
    checkEnabled();
    return () => {
      NfcManager.cancelTechnologyRequest().catch(() => 0);
    };
  }, []);

  async function readNfc() {
    if (props.onReadRequest) {
      props.onReadRequest();
    }
    function _cleanup() {
      NfcManager.cancelTechnologyRequest().catch(() => 0);
    }
    try {
      let reqMifare = await NfcManager.requestTechnology([
        NfcTech.NfcA,
        NfcTech.NfcB,
        NfcTech.NfcF,
        NfcTech.NfcV,
      ]);

      const nfcTag = await NfcManager.getTag();
      if (props.onTagRead) {
        if (nfcTag && nfcTag.id) {
          props.onTagRead(`${nfcTag.id}`);
        } else {
          props.onTagRead("");
        }
      }

      _cleanup();
    } catch (ex) {
      console.warn("[NFC Read] [ERR] Failed Reading Mifare: ", ex);
      _cleanup();
    }
  }

  return (
    <View>
      <Button
        icon={props.icon}
        text={props.title}
        style={{
          container: {
            backgroundColor: props.backgroundColor,
          },
          text: {
            color: props.styles.title.color,
            fontFamily: props.styles.title.fontFamily,
            fontSize: props.styles.title.fontSize,
            fontWeight: props.styles.title.fontWeight,
          },
        }}
        onPress={() => readNfc()}
      ></Button>
    </View>
  );
};
