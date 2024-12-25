import { useState, forwardRef, useImperativeHandle } from "react";
import { View, Text, useColorScheme } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { Button } from "@/components/Button";
import { colors } from "@/assets/palette/colors";

const AlertBox = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  let colorScheme = useColorScheme();
  // Use useImperativeHandle to expose the showModal and hideModal functions
  useImperativeHandle(ref, () => ({
    showModal: () => setVisible(true),
    hideModal: () => setVisible(false),
  }));

  const containerStyle = {
    backgroundColor:
      colorScheme == "dark" ? colors.zinc[800] : colors.zinc[100],
    paddingHorizontal: 20,
    paddingVertical: 14,
    margin: 20,
    borderRadius: 7,
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={containerStyle}
          dismissable={true}
        >
          <Text className="text-zinc-950 dark:text-zinc-50 text-lg">
            Example Modal. Click outside this area to dismiss.
          </Text>
          <View className="flex items-end mt-5">
            <View className="w-1/2 ">
              <Button onPress={() => setVisible(false)} title={"oki"}></Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
});

export { AlertBox };