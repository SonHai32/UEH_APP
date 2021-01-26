"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var stack_1 = require("@react-navigation/stack");
var React = require("react");
var NotFoundScreen_1 = require("../screens/NotFoundScreen");
var BottomTabNavigator_1 = require("./BottomTabNavigator");
var LinkingConfiguration_1 = require("./LinkingConfiguration");
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
function Navigation(_a) {
    var colorScheme = _a.colorScheme;
    return (React.createElement(native_1.NavigationContainer, { linking: LinkingConfiguration_1["default"], theme: colorScheme === 'dark' ? native_1.DarkTheme : native_1.DefaultTheme },
        React.createElement(RootNavigator, null)));
}
exports["default"] = Navigation;
// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
var Stack = stack_1.createStackNavigator();
function RootNavigator() {
    return (React.createElement(Stack.Navigator, { screenOptions: { headerShown: false } },
        React.createElement(Stack.Screen, { name: "Root", component: BottomTabNavigator_1["default"] }),
        React.createElement(Stack.Screen, { name: "NotFound", component: NotFoundScreen_1["default"], options: { title: 'Oops!' } })));
}
