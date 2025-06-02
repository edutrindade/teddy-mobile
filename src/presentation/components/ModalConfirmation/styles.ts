import { StyleSheet } from 'react-native';
import { colors } from '@/presentation/styles/colors';
import { layout } from '@/presentation/styles/layout';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black100,
  },
  modalView: {
    backgroundColor: colors.background,
    borderRadius: layout.spacing.normal,
    paddingTop: layout.spacing.large,
    elevation: 5,
    minHeight: layout.screenWidth * 0.6,
    minWidth: layout.screenWidth * 0.9,
    maxWidth: layout.screenWidth * 0.9,
    gap: layout.spacing.small,
  },
  modalTitle: {
    fontFamily: layout.fontFamily.bold,
    fontSize: layout.fontSize.large,
    marginBottom: layout.spacing.small,
    color: colors.white,
    textAlign: 'center',
  },
  modalDescription: {
    fontFamily: layout.fontFamily.regular,
    fontSize: layout.fontSize.normal,
    color: colors.white,
    textAlign: 'center',
  },
  modalFooter: {
    alignItems: 'center',
    paddingVertical: layout.spacing.regular,
  },
  modalActionButton: {
    width: '100%',
    paddingVertical: layout.spacing.regular,
    paddingHorizontal: layout.spacing.large,
    marginBottom: layout.spacing.small,
    borderTopWidth: 1,
    borderTopColor: colors.light300,
  },
  modalActionText: {
    fontSize: layout.fontSize.large,
    color: colors.blue,
    textAlign: 'center',
  },
});
