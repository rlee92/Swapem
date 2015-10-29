'use strict';

var React = require('react-native');
var TableView = require('react-native-tableview')
var Section = TableView.Section;
var Item = TableView.Item;
var MyProfilesViewController3 = require('./MyProfilesViewController3')

var {
  StyleSheet,
  Component,
} = React;

var MyProfileItems = [
{item: 'Name'},
{item: 'Phone'},
{item: 'Email'},
{item: 'Facebook'},
];

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class MyProfilesViewController2 extends Component {
	render() {
		var profileItem = MyProfileItems[3];
		return (
			<TableView
			style = {styles.container}
			onPress = {(event) => this.showProfileDetails(profileItem)}>
			<Section>
			<Item>{profileItem.item}</Item>
			</Section>
			</TableView>
		);
	}
	showProfileDetails(profileItem) {
		this.props.navigator.push({
			component: MyProfilesViewController3,
		})
	}
}

module.exports = MyProfilesViewController2;
