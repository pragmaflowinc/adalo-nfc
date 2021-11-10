import React from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { nfcProps } from './generated'
import { NfcComponent } from './nfcComponent'
import { Button } from "@protonapp/react-native-material-ui";

const Nfc = (props: nfcProps) => {
	
	return(
		<View>
			{
				props.editor || Platform.OS === 'web' ? (
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
							onPress={() => {}}
						></Button>
					</View>
				) : (
					<NfcComponent {...props} />
				)
			}
		</View>
	)
}

export default Nfc
