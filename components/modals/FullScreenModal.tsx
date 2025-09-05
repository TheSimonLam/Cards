import { Button } from "@/elements/Button";
import { IconButton } from "@/elements/IconButton";
import { Modal, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

type FullScreenModalProps = {
  isModalVisible: boolean;
  onClosePress: () => void;
  children: React.ReactNode;
  backgroundColor?: string;
  title?: string;
  topSafeAreaInset?: number;
};

type StyleProps = Partial<FullScreenModalProps>;

export const FullScreenModal = ({
  isModalVisible,
  onClosePress,
  children,
  backgroundColor,
}: FullScreenModalProps) => {
  const { styles } = useStyles(stylesheet);
  const { top: topSafeAreaInset } = useSafeAreaInsets();

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isModalVisible}
      onRequestClose={onClosePress}
    >
      <GestureHandlerRootView>
        <View
          style={styles.modalContainer({ backgroundColor, topSafeAreaInset })}
        >
          <View style={styles.closeButtonContainer}>
            <IconButton
              onPress={onClosePress}
              variant="ghost"
              iconName="close"
            />
          </View>

          {children}
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  modalContainer: (props: StyleProps) => ({
    flex: 1,
    backgroundColor: props.backgroundColor,
    marginTop: props.topSafeAreaInset,
  }),
  closeButtonContainer: {
    alignItems: "flex-end",
    paddingRight: theme.margins.md,
    marginBottom: theme.margins.md
  },
}));
