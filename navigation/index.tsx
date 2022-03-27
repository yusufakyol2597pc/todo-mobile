/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Image } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import Timer from '../screens/timer/Timer';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import TodosSwiper from '../screens/todo/TodosSwiper';
import { SvgXml } from 'react-native-svg';
import ProfileScreen from '../screens/profile/ProfileScreen';
import i18n from 'i18n-js';

const todoXml = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3161 5.00297e-08H10.35H11.15H11.1839H11.184C12.8354 -3.70508e-06 14.1208 -6.62785e-06 15.1519 0.0842361C16.1988 0.169771 17.0494 0.345875 17.8144 0.735706C19.0845 1.38285 20.1171 2.41547 20.7643 3.68556C21.1541 4.45065 21.3302 5.30124 21.4158 6.34814C21.5 7.37918 21.5 8.66451 21.5 10.3158V10.3159V10.3159V10.316V10.316V10.35V13.9216V13.9452V13.9452V13.9453V13.9453V13.9453C21.5 14.2601 21.5 14.4476 21.4901 14.6305C21.4067 16.1661 20.8015 17.6272 19.7746 18.772C19.6523 18.9084 19.5196 19.041 19.297 19.2637L19.2803 19.2803L19.2637 19.297C19.041 19.5196 18.9084 19.6523 18.772 19.7746C17.6272 20.8015 16.1661 21.4067 14.6305 21.4901C14.4476 21.5 14.2601 21.5 13.9453 21.5H13.9453H13.9453H13.9452H13.9452H13.9216H10.35H10.316H10.316H10.3159H10.3159H10.3158C8.66451 21.5 7.37918 21.5 6.34814 21.4158C5.30124 21.3302 4.45065 21.1541 3.68556 20.7643C2.41547 20.1171 1.38285 19.0845 0.735706 17.8144C0.345875 17.0494 0.169771 16.1988 0.0842361 15.1519C-6.62569e-06 14.1208 -3.70508e-06 12.8354 5.00297e-08 11.184V11.1839V11.15V10.35V10.3161V10.316C-3.70508e-06 8.66462 -6.62785e-06 7.37922 0.0842361 6.34814C0.169771 5.30124 0.345875 4.45065 0.735706 3.68556C1.38285 2.41547 2.41547 1.38285 3.68556 0.735706C4.45065 0.345875 5.30124 0.169771 6.34814 0.0842361C7.37922 -6.62569e-06 8.66462 -3.70508e-06 10.316 5.00297e-08H10.3161ZM6.47029 1.57925C5.51615 1.65721 4.88493 1.80809 4.36655 2.07222C3.3787 2.57555 2.57555 3.3787 2.07222 4.36655C1.80809 4.88493 1.65721 5.51615 1.57925 6.47029C1.50058 7.43317 1.5 8.65747 1.5 10.35V11.15C1.5 12.8425 1.50058 14.0668 1.57925 15.0297C1.65721 15.9838 1.80809 16.6151 2.07222 17.1334C2.57555 18.1213 3.3787 18.9244 4.36655 19.4278C4.88493 19.6919 5.51615 19.8428 6.47029 19.9207C7.43317 19.9994 8.65747 20 10.35 20H13.9216L14 20V17.95V17.9195C14 17.3854 14 16.9395 14.0297 16.5753C14.0608 16.1954 14.1279 15.8388 14.2997 15.5015C14.5634 14.9841 14.9841 14.5634 15.5015 14.2997C15.8388 14.1279 16.1954 14.0607 16.5753 14.0297C16.9396 14 17.3854 14 17.9195 14H17.9196H17.95H20L20 13.9216V10.35C20 8.65747 19.9994 7.43317 19.9207 6.47029C19.8428 5.51615 19.6919 4.88493 19.4278 4.36655C18.9244 3.3787 18.1213 2.57555 17.1334 2.07222C16.6151 1.80809 15.9838 1.65721 15.0297 1.57925C14.0668 1.50058 12.8425 1.5 11.15 1.5H10.35C8.65747 1.5 7.43317 1.50058 6.47029 1.57925ZM17.7704 18.658C17.1203 19.2412 16.3391 19.6495 15.5 19.8526V17.95C15.5 17.3775 15.5006 16.9933 15.5248 16.6974C15.5482 16.4103 15.5901 16.273 15.6362 16.1825C15.7561 15.9473 15.9473 15.7561 16.1825 15.6362C16.2731 15.5901 16.4104 15.5482 16.6975 15.5247C16.9934 15.5006 17.3776 15.5 17.95 15.5H19.8526C19.6495 16.3391 19.2412 17.1203 18.658 17.7704C18.5661 17.8728 18.4639 17.9755 18.2197 18.2197C17.9755 18.4639 17.8728 18.5661 17.7704 18.658ZM5.75 5C5.33579 5 5 5.33579 5 5.75C5 6.16421 5.33579 6.5 5.75 6.5H13.75C14.1642 6.5 14.5 6.16421 14.5 5.75C14.5 5.33579 14.1642 5 13.75 5H5.75ZM5 9.75C5 9.33579 5.33579 9 5.75 9H11.75C12.1642 9 12.5 9.33579 12.5 9.75C12.5 10.1642 12.1642 10.5 11.75 10.5H5.75C5.33579 10.5 5 10.1642 5 9.75ZM5.75 13C5.33579 13 5 13.3358 5 13.75C5 14.1642 5.33579 14.5 5.75 14.5H7.75C8.16421 14.5 8.5 14.1642 8.5 13.75C8.5 13.3358 8.16421 13 7.75 13H5.75Z" fill="white"/>
</svg>
`;

const timerXml = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.7123 0.385768L12.6279 0.372045C12.2475 0.309765 11.8238 0.240409 11.3834 0.406207C11.0223 0.542171 10.6717 0.841048 10.4803 1.17614C10.3447 1.4136 10.2928 1.65253 10.2701 1.88102C10.2499 2.08432 10.25 2.32221 10.25 2.5709L10.25 2.60002V7.80002V7.83046C10.25 8.36461 10.25 8.81046 10.2797 9.17469C10.3108 9.55458 10.3779 9.91123 10.5497 10.2485C10.8134 10.7659 11.2341 11.1866 11.7515 11.4503C12.0888 11.6221 12.4454 11.6892 12.8253 11.7203C13.1895 11.75 13.6354 11.75 14.1695 11.75H14.1695H14.2H19.4L19.4291 11.75C19.6778 11.7501 19.9157 11.7501 20.119 11.7299C20.3475 11.7072 20.5864 11.6553 20.8239 11.5197C21.159 11.3283 21.4579 10.9778 21.5938 10.6166C21.7596 10.1762 21.6903 9.75257 21.628 9.37213V9.37211L21.6143 9.28768C20.8829 4.72143 17.2786 1.11709 12.7123 0.385768ZM11.9122 1.8099L11.9132 1.80952C11.9204 1.80668 11.9367 1.80021 12.0042 1.80339C12.1001 1.8079 12.2271 1.82717 12.4751 1.86689C16.4016 2.49575 19.5043 5.59842 20.1331 9.52489C20.1729 9.77293 20.1921 9.89993 20.1966 9.99585C20.1998 10.0634 20.1933 10.0797 20.1905 10.0868L20.1901 10.0878L20.1901 10.088C20.1895 10.0891 20.1863 10.0964 20.1786 10.1089C20.1696 10.1236 20.1572 10.1409 20.1421 10.1586C20.127 10.1764 20.1118 10.1913 20.0987 10.2026C20.0877 10.2121 20.081 10.2165 20.0799 10.2172C20.0798 10.2172 20.0797 10.2173 20.0797 10.2173L20.0777 10.2183C20.0765 10.2187 20.0732 10.22 20.0666 10.2219C20.0528 10.2257 20.0244 10.2319 19.9708 10.2372C19.8506 10.2492 19.6884 10.25 19.4 10.25H14.2C13.6276 10.25 13.2434 10.2494 12.9475 10.2253C12.6604 10.2018 12.5231 10.1599 12.4325 10.1138C12.1973 9.99394 12.0061 9.80271 11.8862 9.56751C11.8401 9.47695 11.7982 9.33967 11.7748 9.05255C11.7506 8.75667 11.75 8.37245 11.75 7.80002V2.60002C11.75 2.31161 11.7508 2.14943 11.7628 2.02921C11.7681 1.97564 11.7743 1.94727 11.7782 1.93339C11.78 1.92685 11.7813 1.92352 11.7818 1.92237L11.7828 1.92017C11.7835 1.91917 11.7878 1.91248 11.7974 1.90132C11.8087 1.88819 11.8237 1.87307 11.8414 1.85795C11.8591 1.84283 11.8764 1.83044 11.8912 1.82137C11.9036 1.81374 11.9109 1.81051 11.9121 1.80998L11.9122 1.8099ZM8.22474 2.17357C8.61992 2.04945 8.83966 1.62847 8.71554 1.23329C8.59142 0.838114 8.17044 0.618375 7.77526 0.742494C3.41455 2.11211 0.25 6.18563 0.25 11.0002C0.25 16.9373 5.06294 21.7502 11 21.7502C15.8146 21.7502 19.8881 18.5857 21.2577 14.225C21.3819 13.8298 21.1621 13.4088 20.7669 13.2847C20.3718 13.1606 19.9508 13.3803 19.8267 13.7755C18.6478 17.529 15.1407 20.2502 11 20.2502C5.89137 20.2502 1.75 16.1089 1.75 11.0002C1.75 6.85954 4.47123 3.35248 8.22474 2.17357Z" fill="white"/>
</svg>
`;

const profileXml = `
<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.75 5C5.75 3.20507 7.20507 1.75 9 1.75C10.7949 1.75 12.25 3.20507 12.25 5C12.25 6.79493 10.7949 8.25 9 8.25C7.20507 8.25 5.75 6.79493 5.75 5ZM9 0.25C6.37665 0.25 4.25 2.37665 4.25 5C4.25 7.62335 6.37665 9.75 9 9.75C11.6234 9.75 13.75 7.62335 13.75 5C13.75 2.37665 11.6234 0.25 9 0.25ZM5.8 12.25C2.73482 12.25 0.25 14.7348 0.25 17.8C0.25 19.9815 2.01848 21.75 4.2 21.75H13.8C15.9815 21.75 17.75 19.9815 17.75 17.8C17.75 14.7348 15.2652 12.25 12.2 12.25H5.8ZM1.75 17.8C1.75 15.5632 3.56325 13.75 5.8 13.75H12.2C14.4368 13.75 16.25 15.5632 16.25 17.8C16.25 19.1531 15.1531 20.25 13.8 20.25H4.2C2.8469 20.25 1.75 19.1531 1.75 17.8Z" fill="white"/>
</svg>
`;

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#38383A",
          height: "12%"
        },
        tabBarLabelStyle: {
          color: "#FFFFFF",
          fontFamily: 'pressura-mono'
        },
        tabBarItemStyle: {
          padding: 14
        }
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TodosSwiper}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: i18n.t('todo'),
          tabBarIcon: ({ color }) => <SvgXml xml={todoXml}/>,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Ionicons
                name="add-circle-outline"
                size={32}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={Timer}
        options={{
          title: i18n.t('timer'),
          headerShown: false,
          tabBarItemStyle: {
            padding: 14,
            borderRightWidth: 0.3,
            borderLeftWidth: 0.3,
            borderColor: "#505050"
          },
          tabBarIcon: ({ color }) => <SvgXml xml={timerXml}/>,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={ProfileScreen}
        options={{
          title: i18n.t('profile'),
          tabBarIcon: ({ color }) => <SvgXml xml={profileXml}/>,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
