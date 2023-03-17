import React, { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

export default function App() {
  const [state, setState] = useState();
  const fileUri = FileSystem.cacheDirectory + "test.vcf";
  const vcard = `BEGIN:VCARD
VERSION:2.1
N:Gump;Forrest;;Mr.
FN:Forrest Gump
ORG:Bubba Gump Shrimp Co.
TITLE:Shrimp Man
PHOTO;GIF:http://www.example.com/dir_photos/my_photo.gif
TEL;WORK;VOICE:(111) 555-1212
TEL;HOME;VOICE:(404) 555-1212
ADR;WORK;PREF:;;100 Waters Edge;Baytown;LA;30314;United States of America
LABEL;WORK;PREF;ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:100 Waters Edge=0D=
 =0ABaytown\, LA 30314=0D=0AUnited States of America
ADR;HOME:;;42 Plantation St.;Baytown;LA;30314;United States of America
LABEL;HOME;ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:42 Plantation St.=0D=0A=
 Baytown, LA 30314=0D=0AUnited States of America
EMAIL:forrestgump@example.com
REV:20080424T195243Z
END:VCARD`;

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{state}</Text>
      <Text style={styles.paragraph}>{fileUri}</Text>
      <Button
        title="Available?"
        onPress={() => {
          Sharing.isAvailableAsync().then((available) => {
            if (available) {
              setState("Sharing is available");
            } else {
              setState("Sharing is NOT available");
            }
          });
        }}
      />
      <Button
        title="Share"
        onPress={() => {
          const options = {
            mimeType: "text/x-vcard",
            dialogTitle: "Share vcard",
            UTI: "text/vcard",
          };

          FileSystem.writeAsStringAsync(fileUri, vcard)
            .then((data) => {
              setState("Wrote vcard file");
            })
            .catch((err) => {
              setState("Error writing vcard file");
              console.log(JSON.stringify(err));
            });

          Sharing.shareAsync(fileUri, options)
            .then((data) => {
              setState("Shared");
            })
            .catch((err) => {
              setState("Error sharing vcard");
              console.log(JSON.stringify(err));
            });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
