import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  TouchableHighlight,
  DeviceEventEmitter,
} from 'react-native';
import {material} from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';

const colors = {
  background: '#FFFFFF',
  backgroundOverlay: 'rgba(0, 0, 0, 0.6)',

  androidColorPrimaryDark: '#5AD185',
  androidColorAccent: '#51BC78',
  androidPressedUnderlay: '#F0F0F0',
  androidBorderColor: '#DCDCDC',
  androidPrimaryTextColor: 'rgba(0, 0, 0, 0.87)',
};
const {height} = Dimensions.get('window');

const ActionButton = ({testID, onPress, colorAccent, label, style = {}}) => (
  <TouchableHighlight
    testID={testID}
    style={[styles.actionContainer, style]}
    underlayColor={colors.androidPressedUnderlay}
    onPress={onPress}>
    <Text style={[material.button, {color: colorAccent}]}>{label}</Text>
  </TouchableHighlight>
);

export default class SinglePickerDialog extends Component {
  constructor(props) {
    super(props);

    const {items, selectedItem} = props;

    let selectedIndex;
    if (selectedItem != null) {
      selectedIndex = items.findIndex(
        item => item.value === selectedItem.value,
      );
    }
    this.state = {selectedIndex, tabIndex: selectedIndex};
  }

  onPressItem(value) {
    const {items} = this.props;
    this.setState(() => {
      const selectedIndex = items.findIndex(item => item.value === value);
      return {selectedIndex};
    });
  }
  onOk = () => {
    if (this.state.selectedIndex === -1) {
      this.onCancel();
    } else {
      this.props.onOk({
        selectedItem: this.props.items[this.state.selectedIndex],
      });
    }
  };
  onCancel = () => {
    this.props.onCancel();
  };

  keyExtractor = item => String(item.value);

  renderItem = ({item, index}) => (
    <TouchableOpacity onPress={() => this.onPressItem(item.value)}>
      <View style={[styles.rowContainer]}>
        <View style={styles.iconContainer}>
          <Icon
            name={
              index === this.state.selectedIndex
                ? 'radio-button-checked'
                : 'radio-button-unchecked'
            }
            color={this.props.colorAccent}
            size={24}
          />
        </View>
        <Text style={material.subheading}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const title = this.props.title;
    const titleColor = this.props.titleColor
      ? this.props.titleColor
      : colors.androidPrimaryTextColor;
    const colorAccent = this.props.colorAccent
      ? this.props.colorAccent
      : colors.androidColorAccent;
    const visible = this.props.visible;
    const okLabel = this.props.okLabel ? this.props.okLabel : 'OK';
    const scrolled = this.props.scrolled ? this.props.scrolled : false;
    const backgroundColor = colors.background;
    const addPadding = true;
    const cancelLabel = this.props.cancelLabel
      ? this.props.cancelLabel
      : 'CANCEL';
    return (
      <View
        style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
        <View
          style={styles.backgroundOverlay}
          focusable={false}
          accessible={false}>
          <View
            style={[
              styles.modalContainer,
              (title != null || (addPadding && title == null)) &&
                styles.modalContainerPadding,
              {backgroundColor},
            ]}>
            {/* <TouchableWithoutFeedback> */}
            {title != null ? (
              <View
                style={
                  scrolled
                    ? styles.titleContainerScrolled
                    : styles.titleContainer
                }>
                <Text style={[material.title, {color: titleColor}]}>
                  {title}
                </Text>
              </View>
            ) : null}
            <View
              style={
                scrolled
                  ? [
                      styles.contentContainerScrolled,
                      addPadding && styles.contentContainerScrolledPadding,
                    ]
                  : [
                      styles.contentContainer,
                      addPadding && styles.contentContainerPadding,
                    ]
              }>
              <FlatList
                data={this.props.items}
                extraData={this.state}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
              />
            </View>
            <View
              style={
                scrolled
                  ? styles.actionsContainerScrolled
                  : styles.actionsContainer
              }>
              <ActionButton
                testID="dialog-cancel-button"
                colorAccent={colorAccent}
                onPress={this.onCancel}
                label={cancelLabel}
                style={
                  this.state.tabIndex === this.props.items.length
                    ? styles.border
                    : {}
                }
              />
              <ActionButton
                testID="dialog-ok-button"
                colorAccent={colorAccent}
                onPress={this.onOk}
                label={okLabel}
                style={
                  this.state.tabIndex === this.props.items.length + 1
                    ? styles.border
                    : {}
                }
              />
            </View>
            {/* </TouchableWithoutFeedback> */}
          </View>
        </View>
      </View>
      //   <MaterialDialog
      //     title={this.props.title}
      //     titleColor={this.props.titleColor}
      //     colorAccent={this.props.colorAccent}
      //     visible={this.props.visible}
      //     okLabel={this.props.okLabel}
      //     scrolled={this.props.scrolled}
      //     onOk={() =>
      //       this.props.onOk({
      //         selectedItem: this.props.items[this.state.selectedIndex],
      //       })
      //     }
      //     cancelLabel={this.props.cancelLabel}
      //     onCancel={() => {
      //       this.props.onCancel();
      //     }}>
      //     <FlatList
      //       data={this.props.items}
      //       extraData={this.state}
      //       renderItem={this.renderItem}
      //       keyExtractor={this.keyExtractor}
      //     />
      //   </MaterialDialog>
    );
  }
}

const styles = StyleSheet.create({
  backgroundOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundOverlay,
  },
  modalContainer: {
    marginHorizontal: 16,
    marginVertical: 106,
    minWidth: 280,
    borderRadius: 2,
    elevation: 24,
    overflow: 'hidden',
  },
  modalContainerPadding: {
    paddingTop: 24,
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainerScrolled: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.androidBorderColor,
  },
  contentContainer: {
    flex: -1,
  },
  contentContainerPadding: {
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
  contentContainerScrolled: {
    flex: -1,
    maxHeight: height - 264, // (106px vertical margin * 2) + 52px
  },
  contentContainerScrolledPadding: {
    paddingHorizontal: 10,
  },
  actionsContainer: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 8,
  },
  actionsContainerScrolled: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.androidBorderColor,
  },
  actionContainer: {
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    minWidth: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowContainer: {
    height: 56,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  border: {
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 10,
  },
  iconContainer: {
    marginRight: 16,
  },
});

SinglePickerDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedItem: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  }),
  title: PropTypes.string,
  titleColor: PropTypes.string,
  colorAccent: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  cancelLabel: PropTypes.string,
  okLabel: PropTypes.string,
  scrolled: PropTypes.bool,
};

SinglePickerDialog.defaultProps = {
  selectedItem: undefined,
  title: undefined,
  titleColor: undefined,
  colorAccent: colors.androidColorAccent,
  cancelLabel: undefined,
  okLabel: undefined,
  scrolled: false,
};
